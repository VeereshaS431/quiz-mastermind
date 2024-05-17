import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import React, { useState } from 'react';

export default function SimpleContainer({data}) {
    console.log(data)
    const [quiz,setQuiz]=useState({
        question:"",
        options:[],
        answer:"",
    })
    const [index,setIndex]=useState(0)
    
    
        setQuiz({
            question:data[index].question,
            options:data[index].options,
            answer:data[index].answer,
        })



  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{backgroundColor:"GrayText"}}>
        <div>
        
        </div>
      </Container>
    </React.Fragment>
  );
}