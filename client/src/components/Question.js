import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
function Question() {
    const[quesdata,setQuesdata] = useState({})
    let params = useParams();
    useEffect(
        ()=>{

          fetch(`/question_details/${params.question_id}`).then(
            response => response.json()
          ).then(
            data => {
                // console.log(data[0])

                setQuesdata(data[0])
             
            }
          )
        }
      ,[])

  const questionUpdate = (e) =>{
    e.preventDefault()
    // alert("mbsa")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/question_update"); 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(event){ 
        alert("Success, server responded with: " + event.target.response); // raw response
    }; 
// or onerror, onabort
var formData = new FormData(document.getElementById("Question_Data")); 
let mainData = JSON.stringify(Object.fromEntries(formData));
xhr.send(mainData);
  }
 const dataChange = (event) => {
  var _formData = new FormData(document.getElementById("Question_Data")); 
 let _mainData = Object.fromEntries(_formData);
//  alert(mainData)
  setQuesdata(_mainData)

 }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />
      <div className='container-fluid' style={{backgroundColor:"#d3d7e7",height:'100vh',backgroundImage:`url("/quesbgimg_1.jpg")`,backgroundSize:'cover'}}>
  <h1 className="text-center" style={{color:'black',fontWeight:"40px"}}>
    Question Page
  </h1>
 <div className="container">
  <form action="" id="Question_Data" onSubmit={questionUpdate}>

 

  <input type="hidden" name="_id" className="form-control" id="_id" value={quesdata._id}/>
  <input type="hidden" name="chapter_id" className="form-control" id="chapter_id" value={quesdata.chapter_id}  onChange={dataChange}/>

  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label"><b>Question</b></label>
  <input type="text" name="question" className="form-control" id="question" value={quesdata.question}  onChange={dataChange} />
</div>
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label"><b>Question Type</b></label>
  <input type="text" name="type" className="form-control" id="type" value={quesdata.type} disabled/>
</div>
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label"><b>Answer</b></label>
  <textarea type="text" name="answer" className="form-control" id="answer" value={quesdata.answer} onChange={dataChange}> </textarea>
</div>
<center>
<button className="btn btn-success" type='submit'>
        SUBMIT
      </button>
</center>
</form>
 </div>
 </div>


    </>
  )
}

export default Question