//require
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config');
app.use(cookieParser(config.secretKey));
const passport = require('passport');
const passportConfig = require('./passport');
app.use(passport.initialize());
app.use(passport.session());
const db = require('./database');

const isProduction = process.env.NODE_ENV === 'production';

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(), (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//ROUTERS
const tasksRouter = require('./routes/tasksRouter');
const userRouter = require('./routes/userRouter');
const uploadRouter = require('./routes/uploadRouter');

app.use('/tasks', tasksRouter);
app.use('/users', userRouter);
app.use('/upload', uploadRouter);

//Angular output folder
app.use(express.static(path.join(__dirname + '/../dist')));

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
        message: err.message,
        error: err
      }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({'errors': {
      message: err.message,
      error: {}
    }});
});

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log("Running on localhost:"+port)
});
