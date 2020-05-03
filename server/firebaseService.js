const firebase = require('firebase/app');
require( 'firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyD5dMOc5Lf1kKHRgjabWyhVG9wy5iOxDs4",
    authDomain: "gettingactiveapp.firebaseapp.com",
    databaseURL: "https://gettingactiveapp.firebaseio.com",
    projectId: "gettingactiveapp",
    storageBucket: "gettingactiveapp.appspot.com",
    messagingSenderId: "402936531127",
    appId: "1:402936531127:web:47b15a3639d03a40162532",
    measurementId: "G-PJJD6V9NRG"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;

module.exports = {
    firebase,
    auth
}
