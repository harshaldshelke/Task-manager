const express=require('express')
const Router= new express.Router();
const User=require('../model/user')
const Auth=require('../middleware/Auth')
const multer=require('multer')
const sendMail=require('../Email/account')


Router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendMail(user.email,user.name)
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

//login
Router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).send({user , token})
    }catch(e){
        res.status(404).send(e)
    }
})

//logout
Router.post('/users/logout',Auth,async(req,res)=>{
    try{
        
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

Router.post('/users/logoutAll',Auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

Router.get('/users/me',Auth,(req,res)=>{
    res.send(req.user)
})

//old ===without middleware
// Router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


//old without miidleware as no nned to get other users
// Router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


//old update user by id
// Router.patch('/users/:id',async(req,res)=>{
//     try{
//     const updates=Object.keys(req.body);
//     const updatesAllowed=['name','age','password','email']
//     const isValidOperation=updates.every((update)=>updatesAllowed.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({'error':'Invalid Updates'})
//     }
//     const user= await User.findById(req.params.id)
    
//     updates.forEach(update => user[update] == req.body[update])

//     user.save()
//     //const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new :true , runValidators:true}) //old without middleware
//     if(!user){
//         return res.status(404).send()
//     }

//     res.status(200).send(user)
//     } catch (e) {
//         res.status(500).send()
//     }

// })

Router.patch('/users/me',Auth, async (req,res)=>{
    try{
        const updates=Object.keys(req.body);
        const updatesAllowed=['name','age','password','email']
        const isValidOperation=updates.every((update)=>updatesAllowed.includes(update))
    
        if(!isValidOperation){
            return res.status(400).send({'error':'Invalid Updates'})
        }
        
        updates.forEach(update => req.user[update] == req.body[update])
    
        req.user.save()
       
        res.status(200).send(req.user)
        } catch (e) {
            res.status(500).send()
        }
    
})
//old delete by id without middleware
// Router.delete('/users/:id',async(req,res)=>{
//     try{
//     const user= await User.findByIdAndDelete(req.params.id)
//     if(!user){
//         return res.status(404).send()
//     }

//     res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

Router.delete('/users/me',Auth,async (req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

//upload img
const upload=multer({
    //dest:images---to store at this directory
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|pdf)$/)){
            return cb(new Error('image should be inproper format'))
        }
        cb(undefined,true)
    }
})

Router.post('/users/me/avatar',Auth,upload.single('upload'),async(req,res)=>{
    req.user.avatar=req.file.buffer//to set value of file to our variable
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(500).send({error:error.message})
})

Router.delete('/users/me/avatar',Auth,async (req,res)=>{
    req.user.avatar=undefined
    req.user.save()
    res.send()
})

Router.get('/users/me/avatar',Auth,async(req,res)=>{
    if(req.user|| req.user.avatar){
        res.set('Content-Type','image/jpg')
        res.send(req.user.avatar)
    }
    else{
        res.status(500).send('no avatar')
    }
})


module.exports=Router