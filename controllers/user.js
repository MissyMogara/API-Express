const fs = require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const jwt = require('../services/jwt');

// Register users
async function register(req, res) {
    const params = req.body; 
    const user = new User(params);
    
    try {
        if(!user.email) throw { message: "El email es obligatorio"};
        if(!user.password) throw { message: "La contraseña es obligatoria"};

        // Check if email already registered
        const foundEmail = await User.findOne({ email: user.email});
        if(foundEmail) throw { message: "El email ya existe"};

        // Hash password
        const salt = bcryptjs.genSaltSync(10);
        user.password = await bcryptjs.hash(user.password, salt);
        user.save();

        res.status(200).send({ message: "Usuario creado correctamente"});
    } catch (error) {
        res.status(500).send(error);
    }
}

// Login users
async function login(req, res) {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if(!user) throw { message: "Error en el email o la contraseña"};

        const passwordSuccess = await bcryptjs.compare(password, user.password);
        if(!passwordSuccess) throw { message: "Error en el email o la contraseña"};
        
        res.status(200).send({ token: jwt.createToken(user, "12h") });

    } catch (error) {
        res.status(500).send(error);
    }
}

// Upload avatars
async function uploadAvatar(req, res) {
    const { id } = req.params;

    try {
        const userData = await User.findById(id);
        
        if (!userData) {
            return res.status(404).send({ message: "No se encontró el usuario" });
        }

        if (!req.files || !req.files.avatar) {
            return res.status(400).send({ message: "No se ha enviado un archivo" });
        }

        const filePath = req.files.avatar.path;
        const fileSplit = filePath.split('\\');
        const fileName = fileSplit[fileSplit.length - 1]; // File name

        // Validate extension
        const extSplit = fileName.split('.');
        const fileExt = extSplit[extSplit.length - 1].toLowerCase();

        if (fileExt !== "png" && fileExt !== "jpg") {
            return res.status(400).send({ message: "Extensión del archivo no válida" });
        }

        // Update avatar
        userData.avatar = fileName;
        const userResult = await User.findByIdAndUpdate(id, userData, { new: true });

        if (!userResult) {
            return res.status(404).send({ message: "No se encontró el usuario para actualizar" });
        }

        return res.status(200).send({
            message: "Avatar actualizado",
            avatar: userResult.avatar,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error interno del servidor" });
    }
}

function getAvatar(req, res) {
    const { avatarName } = req.params;
    const filePath = `./uploads/avatars/${avatarName}`;

    fs.stat(filePath, (err, stat) =>{
        if(err){
            res.status(404).send({ message: "El avatar no existe"});
        } else {
            res.sendFile(path.resolve(filePath));
        }
    });
}

module.exports = {
    register,
    login,
    uploadAvatar,
    getAvatar,
};