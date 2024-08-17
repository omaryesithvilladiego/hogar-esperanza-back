const UserSchema = require('../schemas/user.schema')
const {create} = require('../services/user.service')

async function createUser(req, res) {
    const user = req.body;
    
    await create(user)
        .then((savedUser) => {
            // Respuesta exitosa
            res.status(200).send('The user was created successfully');
        })
        .catch((error) => {
            // Manejo del error
            res.status(500).send(`Error creating user: ${error.message}`);
        });
}

module.exports = {
    create: createUser
}