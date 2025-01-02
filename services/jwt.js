const jwt = require('jsonwebtoken');

const SECRET_KEY = 'asdk314l13as1234asdKJSdoAKapdjQW89';

// Create a new token
function createToken(user, expiresIn) {
    const {id, email} = user;
    const payload = {id, email};

    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Decode the token
function decodeToken(token) {
    return jwt.decode(token, SECRET_KEY);
}

module.exports = {
    createToken,
    decodeToken,
};