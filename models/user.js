/*const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const userschema = new mongoose.Schema({

     email:{
        type:String,
        require:true
     }
})
userschema.plugin(passportLocalMongoose);
const User =  mongoose.model("user",userschema)
module.exports =  User;*/
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String }
});

// Adds username, hash, salt fields and helper methods like authenticate, register
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
