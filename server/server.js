const express = require("express")
// database connections
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.connect('mongodb://localhost/company', {useNewUrlParser: true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection:error'))
db.once('open',function(){
    console.log("Connection Established mere bhai!!!")
})



const ChapterSchema = new mongoose.Schema({
    name: String
  });
  
const Chapter_Model= mongoose.model('Chapter_List', ChapterSchema);

const QuestionSchema = new mongoose.Schema({
    question: String,
    type: String,
    chapter_id: String,
    answer: String
    
  });
  const Question_Model= mongoose.model('Question_Detail', QuestionSchema);
// const bodyParser = require('body-parser')

const  app = express()
app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));



// Chapter_Model.find({},{name:1,_id:1},function(err, data){
//     // data.map((e) => {
//     //     chapters.push(e.name)
//     //     ids.push(e._id.toString())
//     //     // console.log(">>>> " + e.name);
//     // })
//     chapters = data
// });

app.get("/api",(req,res)=>{
    res.json({users:['user_1','user_2','user_3','user_4']})
})

app.get("/name/:_name",(req,res,next)=>{
    
    res.send(req.params._name+"132")
})
app.get("/chapter",(req,res)=>{
    // let chapters = []
    Chapter_Model.find({},{name:1,_id:1},function(err, data){
        // data.map((e) => {
        //     chapters.push(e.name)
        //     ids.push(e._id.toString())
        //     // console.log(">>>> " + e.name);
        // })
        
        // chapters = data
        res.json({
            chapters:data,
            // ids:ids
        })
    })
})

app.get("/chapter_details/:chapter_id",(req,res)=>{
    let main_data = {
        chapter_data:{},
        question_data:{}
    }
    Chapter_Model.find(ObjectId(req.params.chapter_id),function(err, data){

        Question_Model.find({chapter_id:req.params.chapter_id},function(err,quesdata){

            main_data.question_data = quesdata
            main_data.chapter_data = data[0]
        res.send(main_data)
            // res.send(main_data)
        })
        // data.map((e) => {
        //     chapters.push(e.name)
        //     ids.push(e._id.toString())
        //     // console.log(">>>> " + e.name);
        // })
        
    });
})
app.get("/question_details/:question_id",(req,res)=>{


    Question_Model.find(ObjectId(req.params.question_id),function(err,quesdata){


    res.send(quesdata)
            // res.send(main_data)
        })
        // data.map((e) => {
        //     chapters.push(e.name)
        //     ids.push(e._id.toString())
        //     // console.log(">>>> " + e.name);
        // })
        

})






app.post("/add_chapter",(req,res)=>{
    // let chapter_name = req.body
    // res.send(req.body)
    // console.log(chapters)
    // chapters.push(req.body["new_chapter_name"])
    const silence = new Chapter_Model({ name: req.body["new_chapter_name"] });
    silence.save()

    // Chapter_Model.find({},{name:1,_id:1},function(err, data){
    //     chapters = data
    // });

    // console.log(chapters)
    // console.log(req.body)
})
app.post("/add_question",(req,res)=>{
    // let chapter_name = req.body
    // res.send(req.body)
    // console.log(chapters)
    // chapters.push(req.body["new_chapter_name"])
    const silence = new Question_Model({ question: req.body["qname"],type:req.body["qtype"],chapter_id:req.body["chapter_id"] });
    silence.save()

    // Chapter_Model.find({},{name:1,_id:1},function(err, data){
    //     chapters = data
    // });

    // console.log(chapters)
    // console.log(req.body)
})

app.get("/delete_chapter/:chapter_id",(req,res)=>{

    Chapter_Model.deleteOne({_id:ObjectId(req.params.chapter_id)},function(){
        Question_Model.deleteMany({chapter_id:req.params.chapter_id},function(){


            res.json({
                id:req.params.chapter_id
            })
            // res.send(main_data)
        })
        console.log("Data deleted"); // Success
      
    })
})

app.get("/delete_question/:question_id",(req,res)=>{

    Question_Model.deleteOne({_id:ObjectId(req.params.question_id)},function(){
        console.log("Question deleted"); // Success
        res.json({
            question_id:req.params.question_id
        })
    })
})

app.post("/question_update",(req,res)=>{
    let post_data = JSON.parse(Object.keys(req.body)[0])
    Question_Model.updateOne({_id:ObjectId(post_data._id)},{question:post_data.question,answer:post_data.answer},function(){

        res.send("Question Updated Successfully");
    })
    // console.log()
})

app.listen(5000,()=>{
    console.log("Server started at http://localhost:5000")
})

