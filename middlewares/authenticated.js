const moment = require('moment');
const jwt = require('../services/jwt');

const SECRET_KEY = 'asdk314l13as1234asdKJSdoAKapdjQW89';

function ensureAuth(req, res, next) {
  if(!req.headers.authorization){
    return res.status(403).send({ message: 'La cabecera no tiene el token de autenticación' });
  }  

  const token = req.headers.authorization.replace(/['"]+/g, "");
  const payload = jwt.decodeToken(token, SECRET_KEY);
  
  try {
    

    if(payload.exp <= moment().unix()) {
        return res.status(400).send({ message: "El token ha expirado" });
    }
  } catch (error) {
    return res.status(400).send({ message: "Token invalido" });
  }

  req.user = payload.user;
  next();
 
}

module.exports = {
    ensureAuth,
};