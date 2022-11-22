import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, Link } from "react-router-dom";

function Chapter() {
  const [show, setShow] = useState(false);
  const [filterQuesType, setfilterQuesType] = useState("all");
  const [filtershow, setfilterShow] = useState(false);
  const handleClose = () => setShow(false);
  const filterhandleClose = () => setfilterShow(false);
  const handleShow = () => setShow(true);
  const filterhandleShow = () => setfilterShow(true);
    const[chapter_details,setChapterDetails] = useState({})
    const[question_details,setQuestionDetails] = useState([])
    let params = useParams();
    useEffect(
        ()=>{
          fetch(`/chapter_details/${params.chapter_id}`).then(
            response => response.json()
          ).then(
            data => {
                // console.log(data)
                setChapterDetails(data.chapter_data)
                setQuestionDetails(data.question_data)
            }
          )
        }
      )


  const addQuestion = () =>{
    let qname = document.getElementById("qname").value
    let qtype = document.getElementById("qtype").value
    let cur_url = window.location.href.split("/")
    cur_url = cur_url[cur_url.length-1]
    if (qname!="" && qtype!="" && qtype!="ns"){
      var http = new XMLHttpRequest();
      var url = '/add_question';
      var params = `qname=${qname}&qtype=${qtype}&chapter_id=${cur_url}`
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      
      http.send(params);
      handleClose()
    }
    else{
      alert("Enter all the details!!")
    }
  }
  
 const deleteQuestion = (ques_id) => {
  let delete_ques = window.confirm("Are you sure you want to delete this Question?")
  if(delete_ques){

    var http_ques = new XMLHttpRequest();
    var url = `/delete_question/${ques_id}`;
    // var params = `new_chapter_name=${new_chapter_name}`
    http_ques.open('GET', url, true);
    http_ques.send( null );
    alert("Question Deleted")
  }
 }

 const filterQuestion = (e) => {
  setfilterQuesType(e.target.value)
  if(e.target.value == 'all'){
    let all_cards = document.getElementsByClassName("card")
    for(let i=0;i<all_cards.length;i++){

        all_cards[i].style.display = 'block'
  
      
    }
    return true;
  }
  let all_types = document.getElementsByClassName("type")
  let all_cards = document.getElementsByClassName("card")
  for(let i=0;i<all_types.length;i++){
    if(all_types[i].innerText == e.target.value){
      all_cards[i].style.display = 'block'
    }
    else{
      all_cards[i].style.display = 'none'

    }
  }
// alert(e.target.value)
 }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />
      <div className='container-fluid' style={{backgroundColor:"#d3d7e7",height:'100vh',backgroundImage:`url("/quesbgimg_2.jpg")`,backgroundSize:'cover'}}>
  <h1 className="text-center" style={{color:'white'}}>
    {chapter_details.name}
  </h1>
  <center>




 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Q</span>
        <textarea type="text" className="form-control" placeholder="Enter Question" aria-label="Username" aria-describedby="basic-addon1" id="qname" />
      </div>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">T</span>
        <select name="" id="qtype" className="form-control">
          <option value="ns">---- Select Question Type ----</option>
          <option value="Single Correct">Single Correct</option>
          <option value="Multiple Correct">Multiple Correct</option>
          <option value="Subjective">Subjective</option>
        </select>
        {/* <input type="text" class="form-control" placeholder="Enter Question Type" aria-label="Username" aria-describedby="basic-addon1" id="new_chapter_name" /> */}
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick = {addQuestion}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={filtershow} onHide={filterhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">T</span>
        <select name="" id="filter_qtype" className="form-control" onChange={filterQuestion} value={filterQuesType}>
          <option value="all">All types</option>
          <option value="Single Correct">Single Correct</option>
          <option value="Multiple Correct">Multiple Correct</option>
          <option value="Subjective">Subjective</option>
        </select>
        {/* <input type="text" class="form-control" placeholder="Enter Question Type" aria-label="Username" aria-describedby="basic-addon1" id="new_chapter_name" /> */}
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={filterhandleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick = {addQuestion}>
            Add
          </Button> */}
        </Modal.Footer>
      </Modal>




      {/* <h5 className="text-center">
      Chapter Id :- {params.chapter_id}
      </h5> */}
      <Button variant="primary mx-2" onClick={filterhandleShow}>
        Filter Question
      </Button>
      <Button variant="primary" onClick={handleShow}>
        Add new question
      </Button>
  </center>



      <div className="row">
      {question_details.map((val,e)=>{
    
    
    return   ( 
    // <div className="col">
    <div className="card my-2 mx-4" style={{width:"15rem"}} key={e}>
  <div className="card-body">
    <h4 className="card-title"><b>{val.question}</b></h4>
    <h6 className="card-title my-2" style={{color:"grey"}}>Question Type: <span className="type">{val.type}</span></h6>
    <h6 className="card-title my-2" style={{color:"grey"}}>Question ID: {val._id}</h6>
    <Link to={"/question/"+val._id}><Button variant="primary"  style={{fontSize:'17px'}}>
            Open
          </Button></Link>
          <Button  className='mx-2' variant="danger"  style={{fontSize:'17px'}} onClick={()=>{deleteQuestion(val._id)}}>
            Delete
          </Button>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    {/* <center> */}
    {/* <Route path="/chapter" component={Chapter} /> */}

    {/* <Link to={"/delete_chapter/"+val._id}> */}

      {/* </Link> */}
    {/* </center> */}
    {/* <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a> */}
  </div>
</div>
// </div>
  )
})}
  </div>
  </div>


    </>
  )
}

export default Chapter