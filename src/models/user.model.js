const mongoose = require("mongoose")
const User = require('../schemas/user.schema')

const UserModel = mongoose.model("user", User)

module.exports = UserModel