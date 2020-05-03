const {db} = require('../database');

const tasksRef = db.collection('tasks');
const tasksFirstBundleRef = tasksRef.doc("firstBundle").collection("tasks");
const tasksSecondBundleRef = tasksRef.doc("secondBundle").collection("tasks");
const tasksThirdBundleRef = tasksRef.doc("thirdBundle").collection("tasks");

module.exports = {
    tasksRef,
    tasksFirstBundleRef,
    tasksSecondBundleRef,
    tasksThirdBundleRef
};
