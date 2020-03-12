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
              },
    comment : [
                {
                    type : mongoose.Schema.Types.ObjectId ,
                    ref : "comment"
                }
              ],
    like : {
        count : { type : Number , default : 0},
        user  : [   
                    {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : "User"
                    }  
               ]
    }

    

})

module.exports=mongoose.model("answer",answerSchema);
