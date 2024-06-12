require('./db/connection')
const model_cons = require('./schema/schema')
//const ejs=require("ejs")

const bc=require('bcrypt')

const E = require('express')
const app = E();
const bp = require('body-parser')
app.use(bp.urlencoded({extended:true}));
app.use(bp.json())


const ejs=require('ejs')
app.set('view engine','ejs');
const path=require('path')
app.set('views',path.join(__dirname,'views'))

//console.log("hi this is path ",__dirname)

//const exactpath=path.join(__dirname,'views')
//console.log("hi this is exactpath",exactpath)

app.get('/home', (req, res) => {
   res.render('home')
  // res.send("hi this is home page")
})
app.get('/signup', (req, res) => {
   res.render('signup')
  // res.send("hi this is home page")
})

app.get('/signin', (req, res) => {
   res.render('signin')
  // res.send("hi this is home page")
})

app.get('/forgot',(req,res)=>{
   res.render('forgot')
})

app.put('/re',async(req,res)=>{
   const emailexist= await model_cons.findOne({email:req.body.email})
   if(!emailexist)
      {
         return res.send("user not exist")
      }
      else{
         emailexist.password=req.body.password
         emailexist.save()
         
      }
})
//Register Route
app.post('/signup',async(req, res) => {

   //if(!req.body.name||! req.body.email|| !req.body.job|| !req.body.password ||!req.body.cpassword)

   const emailexist = await model_cons.findOne({ email: req.body.email})

   if(emailexist)
      {
         return res.send("email id is exist ,kindly register with different email id")
      }
   else if(req.body.password != req.body.cpassword )
      {
         return res.send("password not matching with confirm password")
      }
      else
      {


         const name = req.body.name
         const email = req.body.email
         const job = req.body.job
         const password = req.body.password
         const cpassword = req.body.cpassword

        // const hashedpassword=  await bc.hash(password,10)

         const template = model_cons({
            name,
            email,
            job,
            password:password,
            cpassword:password
         })
         template.save()
         return res.send("registration sucess")
      }
})

//Login Route
app.post('/signin', async(req,res) => {
   const emailexist=  await model_cons.findOne({email:req.body.email})
   if(!emailexist)
      {
         return res.send("user not exist ,kindly register first")
      }
   else if (req.body.password!=emailexist.password)
      {
         return res.send("password incorrect")
      }
      else
      {
         return res.send("signed in ")
      } 
})

app.listen(3000, () => {
   console.log("my server is running on 3000 port")
})



