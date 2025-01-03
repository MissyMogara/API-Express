const express = require('express');
const multiparty = require('connect-multiparty');
const UserController = require('../controllers/user');

const md_auth = require('../middlewares/authenticated');
const md_upload_avatar = multiparty({ uploadDir: "./uploads/avatars"});

const api = express.Router();

api.post("/register", UserController.register);
api.post("/login", UserController.login);

api.put("/upload-avatar/:id", [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
api.get("/get-avatar/:avatarName", [md_auth.ensureAuth], UserController.getAvatar);

module.exports = api;