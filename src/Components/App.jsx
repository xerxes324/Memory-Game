import { useState } from "react";
import FetchData from "./FetchData";

function HeaderDisplay(props){
  return(
    <>
      <h1 className="title"> MG </h1>  

      <div className="info">
        <p> Score : {props.score} </p>
        <p> Best : {props.best} </p>
      </div>    
    </>
  )
}

function App() {
  

  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  
  return(
    <div className="container">
      <div className="header">
        <HeaderDisplay score = {score} best = {best} />
      </div>
      <FetchData/>
    </div>
  )
}

export default App;


