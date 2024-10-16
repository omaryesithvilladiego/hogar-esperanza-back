const transporter = require('../config/mail');
const UserModel = require('../models/user.model');
const UserSchema = require('../schemas/user.schema');
const userService = require('../services/user.service');
const {create} = require('../services/user.service')

async function createUser(req, res) {

  const user = req.body
  try {
    if(!user) res.status(404).json('El ususario es requerido')
    const userSaved = userService.create(user)
    if(!userSaved) res.status(404).json('Hubo un error al guardar el usuario')
    res.status(200).json(userSaved)
  } catch (error) {
    res.json(error.message)
  }

}


// G7t&fR8@kPz3!nQ9



async function userLogin(req,res) {
    
    const user = req.body
    try {
        const userLoginFound = await userService.userLogin(user)
        if(!userLoginFound) throw new Error('Hubo un error al hacer login')

        res.status(200).json(userLoginFound)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = {
    create: createUser,
    login: userLogin
}