import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

function Home() {
  const [backendData,setbackendData] = useState("InititialValue")
  const [chapters,setchapters] = useState({"chapters":[]})

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const addChapter = ()=>{
    let new_chapter_name = document.getElementById("new_chapter_name").value
    if(new_chapter_name!=""){
      var http = new XMLHttpRequest();
      var url = '/add_chapter';
      var params = `new_chapter_name=${new_chapter_name}`
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      
      http.send(params);
      handleClose()

      let theUrl = `/chapter`
      let xmlHTTP = new XMLHttpRequest();
      xmlHTTP.open( "GET", theUrl, false );
      xmlHTTP.send( null );
      let return_data = JSON.parse(xmlHTTP.responseText)
      setchapters(return_data)


    }
    else{
      alert("Enter Chapter Name!!!")
    }
   }

  function delete_chapter(id){
    let choice = window.confirm("Are you sure you want to delete this chapter?")
    if(choice){

      var _http = new XMLHttpRequest();
      var url = `/delete_chapter/${id}`;
      // var params = `new_chapter_name=${new_chapter_name}`
      _http.open('GET', url, true);
      _http.send( null );
      alert("Chapter Deleted")
      
    }
    // if(choice){

    // }
  }
useEffect(
  ()=>{
    fetch("/chapter").then(
      response => response.json()
    ).then(
      data => {
        setchapters(data)
      }
    )
  }
)
const searchQuestion = (event) => {

let all_chapters = document.getElementsByClassName('chapter')
let all_cards = document.getElementsByClassName('card')
for(let i=0;i<all_chapters.length;i++){
  if (all_chapters[i].innerText.toLowerCase().includes(event.target.value)){
    all_cards[i].style.display = "block"
  }
  else{
    all_cards[i].style.display = "none"

  }
}
}
  return (
    

  <>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />

  {/* <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">MBSA VQB</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>

       
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}

<div className='container-fluid' style={{backgroundColor:"#d3d7e7",height:'100vh',backgroundImage:`url("/bgimg.jpg")`,backgroundSize:'cover'}}>
   <div className='container' >
   <h1 className="text-center" style={{color:'white'}}>Virtual Question Bank</h1>

      <center>
        {/* <Mbsa id="dhbjcbdj" name="ayush" /> */}
      <Button variant="primary" onClick={handleShow} style={{borderRadius:'20px'}}>
        Add new chapter
      </Button>
 <input id="search_chapter" className="form-control my-2" type="search" placeholder="Search" style={{width:'40%',textAlign:'center',borderRadius:'20px'}} onChange={searchQuestion}/>
 <br />
      </center>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">@</span>
        <input type="text" class="form-control" placeholder="Enter Chapter Name" aria-label="Username" aria-describedby="basic-addon1" id="new_chapter_name" />
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addChapter}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>









   {/* <button onClick={load}>Load Data</button> */}
   </div>
  <div className="row">
  {chapters.chapters.map((val,e)=>{
    
    
    return   ( 
    // <div className="col">
    <div className="card my-2 mx-4" style={{width:"15rem"}}>
  <div className="card-body">
    <h5 className="card-title chapter"><b>{val.name}</b></h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    {/* <center> */}
    {/* <Route path="/chapter" component={Chapter} /> */}
    <Link to={"/chapter/"+val._id}><button className="btn btn-sm btn-danger" style={{fontSize:'17px'}}>Open</button></Link>
    {/* <Link to={"/delete_chapter/"+val._id}> */}
      <button className="btn btn-sm btn-danger mx-3" chapter_id={val._id} onClick={()=>delete_chapter(val._id)} style={{fontSize:'17px'}}>Delete</button>
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
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossOrigin="anonymous"></script>
  </>
    
  )
}

export default Home