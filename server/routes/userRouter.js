const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/user');
const auth = require('../authenticate');
const router = express.Router();

router.route('/')
  .post((req, res, next) => {
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
    .put((req, res, next) => {
        update(req.body.user).then(() => res.json({}))
            .catch(err => next(err));
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

async function update(userParam) {
  const user = await Users.findOne({username: userParam.username});

  if(typeof userParam.username !== 'undefined'){
    user.username = userParam.username;
  }
  if(typeof userParam.email !== 'undefined'){
    user.email = userParam.email;
  }
  if(typeof userParam.image !== 'undefined'){
    user.image = userParam.image;
  }
  if(typeof userParam.password !== 'undefined'){
    user.setPassword(userParam.password);
  }
  if(typeof userParam.doneTasks !== 'undefined'){
    user.doneTasks = userParam.doneTasks.slice();
  }
  await user.save();
}

module.exports = router;
