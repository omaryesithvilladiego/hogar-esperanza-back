const mongoose = require("mongoose")
const User = require('../schemas/user.schema')

const UserModer = mongoose.model("user", User)

module.exports = UserModer