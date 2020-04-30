const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: undefined
    }
}, {versionKey: false}, {timestamps: true});

const tasks = mongoose.model('task', TasksSchema, 'tasks');
module.exports = tasks;
