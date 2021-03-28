//CRUD operation by using node and mongo
// const mongodb= require('mongodb')
// const MongoClient= mongodb.MongoClient;
// const ObjectID= mongodb.ObjectID
const {MongoClient,ObjectID}=require('mongodb')


const connectionURL='mongodb://127.0.0.1/27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,/*{useNewUrlParser:true}*/{useUnifiedTopology:true},(error,client)=>{
    if(error){
        return console.log(error)
    }
    console.log('Success!')

    const db = client.db(databaseName);
    //to insert single document
    // db.collection('users').insertOne({
    //     name:'Harshal',
    //     age:26
    // })

    //insert many doc at a time 
    // db.collection('users').insertMany([------------you can find document for various methods and their inputs 
    //     {
    //         name:'Prasad',
    //         age:30
    //     },
    //     {
    //         name:'Priya',
    //         age:26   
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log("unable to insert")
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description:'To learn Node js',
    //         completed:false
    //     },
    //     {
    //         description:'To learn mongodb',
    //         completed:false
    //     },
    //     {
    //         description:'To learn Angular',
    //         completed:true
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('Failed to insert')
    //     }

    //     console.log(result.ops)
    // })

    //read
    //find one
    // db.collection('users').findOne({ name:'Prasad' },(error,user)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })

    //find many
    // db.collection('users').find({age:26}).toArray((error,user)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({age:26}).count((error,count)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     console.log(count)
    // })


    //task find challenge
    // db.collection('tasks').findOne({_id:new ObjectID("6032478990d31c32777507fe")},(error,user)=>{
    //     console.log(user)
    // })

    // db.collection('tasks').find({completed:false}).toArray((arror,users)=>{
    //     console.log(users)
    // })

    // db.collection('users').updateOne({_id: new ObjectID("6032365f8ae01b2fad8d58ee")},
    // {
    //     $set:{
    //         name:'Harshal'
    //     }
    // }).then((data)=>{
    //     console.log(data)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({ completed:false},{
    //     $set:{
    //         completed:true
    //     }
    // }).then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('tasks').deleteOne({description:"To learn js"}).then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('tasks').deleteMany({completed:false}).then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    //    })

})
