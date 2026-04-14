const mongoose = require("mongoose");

// schemas and models:

const userSchema = mongoose.Schema({
    username : String,
    password : String  
})

const organizationSchema = mongoose.Schema({
    title: String,
    description : String,
    admin : mongoose.Types.ObjectId, // ObjectID("123123234442")
    members: [mongoose.Types.ObjectId]
})

const organizationModel = mongoose.model("organization", organizationSchema);
const userModel = mongoose.model("users", userSchema);

module.exports = {
    organizationModel,
    userModel
}