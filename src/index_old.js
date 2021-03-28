const express=require('express')
const app=express();
// const mongoose=require('mongoose')
// const validator=require('validator')
const port=process.env.PORT || 3000

require('./database/mongoose')
const User=require('./model/user')
const Task=require('./model/task')

app.use(express.json())

app.post('/users',(req,res)=>{
    const user=new User(req.body);
    user.save().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.send(err)
    })
    
})

app.get('/users',(req,res)=>{
    User.find({}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.send(err)       
    })
})

app.get('/users/:id',(req,res)=>{
    const id=req.params.id
    User.findById({_id:id}).then((data)=>{
        if(!data){
            return res.status(404).send()
        }
        res.status(200).send(data)
    }).catch((err)=>{
       res.send(err) 
    })
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

app.get('/tasks/:id',(req,res)=>{
    const _id=req.params.id;
    Task.findById(_id).then((data)=>{
        if(!data){
            return res.status(404).send()
        }
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

app.post('/tasks',(req,res)=>{
    const task=new Task(req.body)
    task.save().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

app.listen(port,()=>{
    console.log('Server listing at '+ port)
})

