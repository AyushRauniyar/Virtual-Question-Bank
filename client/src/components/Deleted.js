import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
function Deleted() {
    const[id,setId] = useState("")
    let params = useParams();
    useEffect(
        ()=>{
          fetch(`/delete_chapter/${params.chapter_id}`).then(
            response => response.json()
          ).then(
            data => 
            {
                // console.log(data)
                setId(data)
                window.location.href="/"
            }
            
          )
        }
      )

  return (
    <div>Chapter with chapterID {id.id} Deleted Successfully !!!</div>
  )
}

export default Deleted