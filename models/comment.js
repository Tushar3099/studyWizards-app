const mongoose              = require("mongoose")

var commentSchema = new mongoose.Schema({
    creater : {
        username : String,
        id : {
                type : mongoose.Schema.Types.ObjectId ,
                ref : "User"
             }        
      },
      date : {type : Date , default : Date.now},
      text: String  

})

module.exports=mongoose.model("comment",commentSchema);