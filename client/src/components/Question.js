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
      )




  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />
  <h2 className="text-center">
    Question Page
  </h2>
 <div className="container">
 <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Question ID</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" value={quesdata._id} disabled/>
</div>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Chapter ID</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" value={quesdata.chapter_id} disabled/>
</div>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Question</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" value={quesdata.question} disabled/>
</div>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Question Type</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" value={quesdata.type} disabled/>
</div>
 </div>
 


    </>
  )
}

export default Question