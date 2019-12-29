const mongoose              = require("mongoose")

var answerSchema = new mongoose.Schema({
    creater : {
        username : String,
        id : {
                type : mongoose.Schema.Types.ObjectId ,
                ref : "User"
             }        
      },
    content : {
        text : String
        // ,image : [
        //     {
        //         url : String
        //     }
        // ]
    }
    

})

module.exports=mongoose.model("answer",answerSchema);