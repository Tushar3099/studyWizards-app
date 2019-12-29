const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const passport=require("passport");
const localStrategy=require("passport-local");
const passportLocalMongoose=require("passport-local-mongoose");

var User = require("./models/users.js"),
    post = require("./models/post"),
    answer = require("./models/answer")

mongoose.connect("mongodb://localhost/bot_kill",{useNewUrlParser:true,useUnifiedTopology: true});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(require("express-session")({
    secret:"its secret",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
});

//Database

// const bottleSchema = new  mongoose.Schema({
//     Brand : String,
//     capacity : Number
// }) 

// const Bottle = mongoose.model("Bottle" , bottleSchema)

// Bottle.create(({
//     brand : "Usha",
//     capacity : 6
// }),(err,bottle)=>{
//     if(err)
//     console.log(err)
//     else
//     console.log(bottle)
// })

// var postSchema = new mongoose.Schema({
//     question : String,
//     date : {type : Date , default : Date.now}
// })  

// post = mongoose.model("post",postSchema);

// post.create({
//     question : "adlifadk;lakdlajclkjad"
// },(err,post)=>{
//     if(err)
//         console.log(err)
//     else
//         console.log(post);
// })

// ROUTES------------
app.get("/",(req,res)=>{
    res.render("home.ejs")
})

// Discuss Routes
app.get("/discuss",(req,res)=>{

    post.find().populate("answer").exec((err,allPost)=>{

        if(err)
        console.log(err)
        else{
          res.render("discuss",{allPost : allPost});  
        }
    console.log(allPost)})
    })



app.get("/discuss/question/new",isLoggedIn,(req,res)=>{
    res.render("new.ejs")
})

app.post("/discuss/question",isLoggedIn,(req,res)=>{
   post.create({
       question : req.body.question
   },(err,post)=>{
       if(err){
           console.log(err)
        //    return res.redirect("back")
       }
       else{
           post.creater.username = req.user.username;
           post.creater.id = req.user.id;
           post.save();
           console.log(post);
           res.redirect("/discuss");
       }
   })
})

app.get("/discuss/question/:id",(req,res)=>{
    post.findById(req.params.id).populate("answer").exec((err,post)=>{
        if(err)
        console.log(err) 
        else{
            console.log(post)
            res.render("show.ejs",{post : post});
        }       
    })
})   

//Answer Routes

app.get("/discuss/answer",isLoggedIn,(req,res)=>{
    post.find({},(err,allPost)=>{
        if(err)
        console.log(err)
        else{
          res.render("question",{allPost : allPost});  
        }  
    })
})

app.get("/discuss/answer/:id",isLoggedIn,(req,res)=>{
    post.findById(req.params.id,(err,post)=>{
        if(err)
        console.log(err)
        else
        res.render("newAns.ejs",{post : post});
    })
       
})

app.post("/discuss/answer/:id",isLoggedIn,(req,res)=>{
    post.findById(req.params.id,(err,post)=>{
        if(err)
        console.log(err)
        else{
            answer.create({},(err,answer)=>{
            answer.creater.username = req.user.username;
            answer.creater.id = req.user.id;
            answer.content.text = req.body.answer;
            answer.save() 
            post.answer.push(answer);
            post.save()
            console.log(post)
            res.redirect("/discuss")
        })
      }
    })
})

// Auth Routes

app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",(req,res)=>{
    var newUser=new User({username:req.body.username,email:req.body.email});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/discuss");
            })
        }
        
    })
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/discuss",
    failureredirect:"/login"
}),(req,res)=>{
});

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/discuss");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } res.redirect("/login");
}


app.listen("3000",()=>{
    console.log("server is listening!");
});
