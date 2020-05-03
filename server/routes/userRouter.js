const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const {createUser} = require('../models/user');
const {checkIfAdmin} = require('../authenticate');
const router = express.Router();

//Sign up
router.route('/')
  .post(createUser);


router.route('/user')
    .get(checkIfAdmin, (req, res, next) => {

    })
    .put((req, res, next) => {

    });

router.route('/login')
    .post((req, res, next) => {
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
});

module.exports = router;
