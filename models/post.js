const mongoose  = require("mongoose")

var postSchema = new mongoose.Schema({
    question : String,
    answer     : [
                    {
                             
                        type : mongoose.Schema.Types.ObjectId ,
                        ref : "answer"
                               
                    }
                ],
                    
    creater : {
                username : String,
                id : {
                        type : mongoose.Schema.Types.ObjectId ,
                        ref : "User"
                     }        
              },
    date : {type : Date , default : Date.now}
})              

module.exports=mongoose.model("post",postSchema);