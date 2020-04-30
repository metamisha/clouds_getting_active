const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/user');
const auth = require('../authenticate');
const router = express.Router();

router.route('/')
  .post((req, res, next) => {
    console.log('New User');
    const user = new Users();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save().then(() => {
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });


router.route('/user')
    .get(auth.required, (req, res, next) => {
        Users.findById(req.payload.id).then((user) => {
            if(!user) {return res.sendStatus(401); }
            return res.json({user: user.toAuthJSON()});
        }).catch(next);
    })
    .put(auth.required, (req, res, next) => {
        Users.findById(req.payload.id).then((user) => {
            if(!user) {return res.statusCode(401);}

            if(typeof req.body.user.username !== 'undefined'){
                user.username = req.body.user.username;
            }
            if(typeof req.body.user.email !== 'undefined'){
                user.email = req.body.user.email;
            }
            if(typeof req.body.user.image !== 'undefined'){
                user.image = req.body.user.image;
            }
            if(typeof req.body.user.password !== 'undefined'){
                user.setPassword(req.body.user.password);
            }

            return user.save().then(() => {
                return res.json({user: user.toAuthJSON()});
            });
        }).catch(next);
    });

router.route('/login')
    .post((req, res, next) => {
        console.log('NEW LOGIN');
        if(!req.body.email){
            return res.status(422).json({errors: {email: "can't be blank"}});
        }

        if(!req.body.password){
            return res.status(422).json({errors: {password: "can't be blank"}});
        }

        passport.authenticate('local', {session: false}, (err, user, info) => {
            if(err){ return next(err); }

            if(user){
                user.token = user.generateJWT();
                return res.json({user: user.toAuthJSON()});
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next);
      console.log("Bad credentials");
});


module.exports = router;
