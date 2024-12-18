const express=require("express");
const app=express();
const collection=require('./mongodb');

app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('addtask');
})
 
app.get('/addtask',(req,res)=>{
    res.render('addtask');
})
 
 app.get('/edit/:id',async(req,res)=>{
    console.log(req.params.id);
    const docs=await collection.findOne({_id:req.params.id})
    res.render('edit',{docs});
 })

 app.get('/tasklist',async(req,res)=>{
    const showalltask= await collection.find({});
    res.render('tasklist',{showalltask})
 });

app.post('/addtask',async(req,res)=>{
    const data={
        date:req.body.date,
        task:req.body.task
    }
    await collection.insertMany([data]);
    res.render('addtask')
    
})

app.post('/edit/:id',async(req,res)=>{
    let docs=await collection.updateOne({_id:req.params.id},
        {
            $set:{
                date:req.body.date,
                task:req.body.task
            },
        },
        {new:true});
        console.log(docs);
        res.render('edit',{docs});
})

app.get('/delete/:id',async(req,res)=>{
    let docs=await collection.deleteOne({_id:req.params.id});
    console.log(docs);
    res.render("addtask");
})


app.listen(8500,()=>{
    console.log("Server started")
});




