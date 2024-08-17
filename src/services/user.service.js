const UserModel = require('../models/user.model')



const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const userCreate = new UserModel(user);
        
        userCreate.save()
            .then((savedUser) => {
                resolve(savedUser); // Resuelve la promesa con el usuario guardado
            })
            .catch((error) => {
                reject(new Error(error)); // Rechaza la promesa con el error
            });
    });
};


module.exports = {
    create: createUser
}