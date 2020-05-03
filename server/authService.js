const axios = require('axios');
const {auth} = require('./firebaseService');

export const createUserAccount = (data) => {
    return axios.post('http://localhost:3000/auth/signup', data)
        .then(res => res.data)
}

export const loginUser = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
}

