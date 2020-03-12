const mongoose = require("mongoose");
const faker = require("faker")
const post = require("./models/post");
const user = require("./models/users");
const comment = require("./models/comment");
const answer = require("./models/answer");

async function createPosts(){
    await user.find({},async (err,user)=>{
        user.forEach(async (user)=>{
            await post.create({
                question : faker.lorem.sentence(10,5) + "?",
            },(err,post)=>{
                post.creater.username = user.username;
                post.creater.id = user.id;
                post.save();
            })
        })
        console.log("Posts created");
    })
}

async function deleteDB(){
    await post.remove({},async (err)=>{
        if(err)
        console.log(err)
        else{
            console.log("all posts deleted");
            await answer.remove({},async (err)=>{
               if(err)
               console.log(err);
               else{
                   console.log("all answers deleted");
                   await comment.remove({},async (err)=>{
                       if(err)
                       console.log(err)
                       else{
                            console.log("all comments deleted");
                        }
                    })
                }
            })
        }
    })
}

async function createAnswers(){
    await post.find({},(err,post)=>{
        post.forEach(async(post)=>{
            await answer.create({},async(err,answer)=>{
                await user.find({},(err,user)=>{
                    const j=Math.floor(Math.random()*3+1);
                    
                        const k=Math.floor(Math.random()*(user.length-1)+1);
                        answer.creater.username = user[k].username;
                        answer.creater.id = user[k].id;
                        answer.content.text = faker.lorem.paragraphs(5) ;
                        answer.save(); 
                        post.answer.push(answer);
                        post.save();
                        // console.log(answer);
                })
            })
        })
        console.log("Answers Created")
    })
}

async function createComments(){
    await answer.find({},(err,answer)=>{
        //  answer.forEach((answer)=>{
        //     // comment.create({
        //     //     text : faker.lorem.sentence(6,2),
        //     // },(err,comment)=>{
        //     //     user.find({},(err,user)=>{
        //     //         // const j=Math.floor(Math.random()*3+1);
                    
        //     //         const k=Math.floor(Math.random()*(user.length-1)+1);
        //     //         comment.creater.username = user[k].username;
        //     //         comment.creater.id = user[k].id;
        //     //         comment.save(); 
        //     //         answer.comment.push(comment);
        //     //         answer.save();
        //     //         console.log(comment);
        //     //     })
        //     // })
        // })
            console.log(answer);
    })
}

async function seeder(){
    await deleteDB();
    await createPosts();
    await createAnswers();
    await createComments();
}

    module.exports = seeder;