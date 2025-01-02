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


function protected(req, res) {
    res.status(200).send({ message: "Contenido protegido"});
}


module.exports = {
    register,
    login,
    protected,
};