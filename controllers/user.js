const bcryptjs = require('bcryptjs');
const User = require('../models/user');

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

module.exports = {
    register,
};