const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=3019


const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/town')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection sucessful")
})

const userSchema= new mongoose.Schema({
    mob:String,
    name:String,
    email:String,
    branch:String
})

const Users=mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})


app.post('/post',async(req,res)=>{
    const{mob,name,email,branch}=req.body
    const user=new Users({
        mob,
        name,
        email,
        branch
    })
    await user.save()
    console.log(user)
    res.send("form submission sucessful")

})


app.listen(port,()=>{
    console.log("server started")
})
