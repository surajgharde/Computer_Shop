const express =require("express");
const passport = require("passport");
const Localstratergy = require("passport-local");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const session = require("express-session");
const flash = require('connect-flash');
const app = express();
let port = 3000;

app.listen(port,()=>{
    console.log("app is listen on port of 3000");
})
const expresssession = {
    secret:"sajan",
    resave:false,
    saveUninitialized: true,
    cookie:{
         expires:Date.now()+7*24*60*60*1000,
         maxAge:7*24*60*60*1000,
         httpOnly:true,
    }
}
app.use(flash());
app.use(session(expresssession));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/",(req,res)=>{
  res.render("index.ejs");
})

async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/suraj");
}
main().then((res)=>{
  console.log("successfully connect with Mongodb");
}).catch((err)=>{
   console.log(err);
})

app.get("/signup",(req,res)=>{
   res.render("signup.ejs");
})
app.post("/signup",async(req,res)=>{
    let {username ,email, password} = req.body;
    let newUser = new User({username:username,email:email})
    const result= await User.register(newUser,password);
    console.log(result);
    console.log( "username=  ",username)
     console.log("email = " ,email)
      console.log("Password = ",password);
      res.redirect("/login");
})
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})
app.post("/login",passport.authenticate("local",{failureRedirect:"/login"}),(req,res)=>{
  console.log("sajan")
   res.redirect("/");
})
app.use((req,res)=>{
  res.send("hello");
})




