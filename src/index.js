const express = require('express')
require('./database/mongoose')
// const User=require('./model/user')
const Task=require('./model/task')
const userRouter=require('./Routers/userRoutes')
const taskRouter=require('./Routers/taskRoutes')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//below are the old routes tha are without separate router file (This also is valid code)

// app.post('/users', async (req, res) => {
//     const user = new User(req.body)

//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// app.get('/users/:id', async (req, res) => {
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

// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)

//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.send(tasks)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const task = await Task.findById(_id)

//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// app.patch('/users/:id',async(req,res)=>{
//     try{
//     const updates=Object.keys(req.body);
//     const updatesAllowed=['name','age','password','email']
//     const isValidOperation=updates.every((update)=>updatesAllowed.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({'error':'Invalid Updates'})
//     }

//     const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new :true , runValidators:true})
//     if(!user){
//         return res.status(404).send()
//     }

//     res.status(200).send(user)
//     } catch (e) {
//         res.status(500).send()
//     }

// })


// app.patch('/tasks/:id',async(req,res)=>{
//     try{
//     const updates=Object.keys(req.body)
//     const Allowedupdates=['description','completed']

//     const isValidUpdate = updates.every((update)=>Allowedupdates.includes(update))

//     if(!isValidUpdate){
//         return res.status(404).send({'error':'Invalid update'})
//     }

//     const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
//     if(!task){
//         return res.status(400).send()
//     }

//     res.status(200).send(task) 
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// app.delete('/users/:id',async(req,res)=>{
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

// app.delete('/tasks/:id',async(req,res)=>{
//     try{
//     const task= await Task.findByIdAndDelete(req.params.id)
//     if(!task){
//         return res.status(404).send()
//     }

//     res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})