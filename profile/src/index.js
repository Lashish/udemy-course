import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

function App(){
  return(
    <>
    <Avatar/>
    <Intro  userName = 'Ashish Kumar'/>
    <SkillList/>
    </>
  )
}

function Avatar(){
  return <img src='https://images.pexels.com/photos/17889085/pexels-photo-17889085/free-photo-of-glasses-on-sunlit-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'></img>
}
function Intro(props){
  return(
  <>
  <h2>{props.userName}</h2>
  <p> I am a full stack web developer with some skills that I have mensioned below!</p>
  </>
  )
}
function SkillList(){
  return(
    <div>
      <Skill skill= "react" emoji='👍' color = "red"/>
      <Skill skill= "javaScript" emoji="💪" color = "blue"/>
      <Skill skill= "HTML + css" emoji="👌" color = "yellow"/>
    </div>
  )

}
function Skill(props){
 return( 
 <div>
  <span style={{backgroundColor: props.color}}>{props.skill}</span>  
  </div>
 )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
