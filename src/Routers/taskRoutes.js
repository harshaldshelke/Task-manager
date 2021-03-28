const express =require('express')
const Router=new express.Router()
const Auth=require('../middleware/Auth')
const Task=require('../model/task')

Router.post('/tasks',Auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
//filter /tasks?completed=true
//pagenation /tasks?limit=1&skip=2
//filter /tasks?sortBy=createdAt:desc
Router.get('/tasks', Auth, async (req, res) => {
    try {
        match={}
        sort={}
        if(req.query.completed){
            match.completed= req.query.completed==='true'
        }
        if(req.query.sortBy){
            const part=req.query.sortBy.split(':')
            sort[part[0]]=part[1]==='desc'?-1:1
        }
        // const tasks = await Task.find({owner:req.user._id})
       await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
       }).execPopulate();
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

Router.get('/tasks/:id',Auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)//old
        const task=await Task.findOne({_id:_id,owner:req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

Router.patch('/tasks/:id',Auth,async(req,res)=>{
    try{
    const updates=Object.keys(req.body)
    const Allowedupdates=['description','completed']

    const isValidUpdate = updates.every((update)=>Allowedupdates.includes(update))

    if(!isValidUpdate){
        return res.status(404).send({'error':'Invalid update'})
    }

    // const task= await Task.findById(req.body.id)
    const task= await Task.findOne({_id:req.params.id,owner:req.user._id})
    if(!task){
        return res.status(400).send()
    }
   
    updates.forEach(update=>task[update]=req.body[update])
    task.save()

    //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) //old without middleware
    

    res.status(200).send(task) 
    } catch (e) {
        res.status(500).send()
    }
})

Router.delete('/tasks/:id',Auth,async(req,res)=>{
    try{
    // const task= await Task.findByIdAndDelete(req.params.id)
    const task= await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if(!task){
        return res.status(404).send()
    }

    res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports=Router