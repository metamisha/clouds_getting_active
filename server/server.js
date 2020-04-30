//require
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config');
app.use(cookieParser(config.secretKey));
const passport = require('passport');
const passportConfig = require('./passport');
app.use(passport.initialize());
app.use(passport.session());

const isProduction = process.env.NODE_ENV === 'production';

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Acess-Control-Allow-Methods', 'GER, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const url = config.mongoUrl;
//ROUTERS
const tasksRouter = require('./routes/tasksRouter');
const userRouter = require('./routes/userRouter');
const uploadRouter = require('./routes/uploadRouter');

app.use('/api/tasks', tasksRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


//connect mongodb
mongoose.connect(url,
   {useNewUrlParser: true}, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

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

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log("Running on localhost:"+port)
});
