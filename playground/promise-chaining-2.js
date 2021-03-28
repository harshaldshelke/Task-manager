require('../src/database/mongoose')
const Task=require('../src/model/task')

// Task.deleteOne({id:'603409180adabc0f9f5e7a11'}).then((task)=>{
//     console.log(task)
//     return Task.countDocuments()
// }).then((count)=>{
//     console.log(count)
//     return Task.find({completed:false})
// }).then((tasks)=>{
//     console.log(tasks)
// }).catch(()=>{})

const deletByID=async(id)=>{
    await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments()
    return count
}

deletByID("6033ee33bab538774ce2bf28").then((count)=>{
    console.log(count)
}).catch((err)=>{
    console.log(err)
}) 