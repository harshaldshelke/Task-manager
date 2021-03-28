const jwt=require('jsonwebtoken')
const User=require('../model/user')
const Auth= async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decodedTkn= jwt.verify(token,'HarshalShelkeSignature')
        const user= await User.findOne({_id:decodedTkn._id,'tokens.token': token})
        if(!user) {throw new Error()}

        req.token=token
        req.user=user
        next();
    }catch(e){
        res.send(e)
    }
}

module.exports=Auth