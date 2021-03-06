const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { auth } = require('../firebaseService');
const { checkIfAdmin } = require('../authenticate');
const tasks = require('../models/tasks');

router.use(bodyParser.json());

router.route('/')
    .get(checkIfAdmin, (req, res, next) => {
    })
    .post((req, res, next) => {
        Tasks.create(req.body)
            .then((task) => {
                console.log('Task Created ', task);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(task);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('/:taskId')
    .get((req, res, next) => {
        Tasks.findById(mongoose.Types.ObjectId(req.params.taskId)).then((task) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(task);
        }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /tasks/'+ req.params.taskId);
    })
    .put((req, res, next) => {
        Tasks.findByIdAndUpdate(req.params.taskId, {
            $set: req.body
        }, { new: true })
            .then((task) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(task);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Tasks.findByIdAndRemove(req.params.taskId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports = router;

