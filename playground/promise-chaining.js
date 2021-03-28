require('../src/database/mongoose')
const User=require('../src/model/user')

// User.findByIdAndUpdate('6033f17cb3a17c78859d4030',{age:32}).then((user)=>{
//     console.log(user)
//     return User.countDocuments()
// }).then((count)=>{
//     console.log(count)
// })

const findByIdAndUpdate=async(id,age)=>{
    await User.findByIdAndUpdate(id,{age:age})
    const count=await User.countDocuments()
    return count
}

findByIdAndUpdate("6033f17cb3a17c78859d4030",35).then((count)=>{
    console.log(count)
}).catch((err)=>{
    console.log(err)
})
