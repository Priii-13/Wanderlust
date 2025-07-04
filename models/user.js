const mongoose = require("mongoose");
const { Schema } = mongoose;
const passPort = require("passport-local-mongoose");
const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
})
userSchema.plugin(passPort);
module.exports = mongoose.model("User",userSchema);