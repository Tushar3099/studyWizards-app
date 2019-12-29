
const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    date: {
        type: Date,
        default: Date.now
      }
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);
