let admin = require("firebase-admin");

let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gettingactiveapp.firebaseio.com/"
});

let db = admin.firestore();

module.exports = {
    admin,
    db
};
