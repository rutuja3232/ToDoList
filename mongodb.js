const mongoose=require('mongoose')

const url='mongodb://localhost:27017/MiniProject'

mongoose.connect(url).then((ans)=>{
    console.log("Connected successfully")
}).catch((err)=>{
    console.log("Error in the connection")
})

const taskschema=new mongoose.Schema({
    date:{
        type:String,
        require:true,
    },
    task:{
        type:String,
        require:true
    }
})

const collection=new mongoose.model('ToDoList',taskschema);
module.exports=collection;