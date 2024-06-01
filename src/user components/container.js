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
        
      </Container>
    </React.Fragment>
  );
}




import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState, useCallback } from "react";
import { app } from "../firebase/firebaseConfig";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// export const HtmlData = () => {
//     const [data, setData] = useState([]);
//     const [index, setIndex] = useState(null);
//     const [quiz, setQuiz] = useState({
//         question: "",
//         options: [],
//         answer: "",
//     });
//     const [timeLeft, setTimeLeft] = useState(30);
//     const [currect, setCurrect] = useState(0)
//     const [wrong, setWrong] = useState(0)
//     const [startButton, setStartButton] = useState(true)

//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         let timer;
//         if (index !== null) {
//             setTimeLeft(30);
//             timer = setInterval(() => {
//                 setTimeLeft((prev) => {
//                     if (prev === 1) {
//                         increment();
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//         }
//         return () => clearInterval(timer);
//     }, [index]);

//     const fetchData = async () => {
//         const db = getDatabase(app);
//         const dbRef = ref(db, "quize/html");
//         const snapshot = await get(dbRef);
//         if (snapshot.exists()) {
//             const mydata = snapshot.val();
//             console.log(mydata);
//             const tempArray = Object.keys(mydata).map((each) => {
//                 return {
//                     ...mydata[each],
//                     id: each,
//                 };
//             });
//             console.log(tempArray);
//             setData(tempArray);
//         } else {
//             alert("No data");
//         }
//     };

//     const update = (index) => {
//         setQuiz({
//             question: data[index].question,
//             options: data[index].options,
//             answer: data[index].answer,
//         });
//     };

//     const increment = () => {

//         if (index < data.length - 1) {
//             document.getElementsByClassName("options")[0].style.backgroundColor = "white";
//             document.getElementsByClassName("options")[1].style.backgroundColor = "white";
//             document.getElementsByClassName("options")[2].style.backgroundColor = "white";
//             document.getElementsByClassName("options")[3].style.backgroundColor = "white";
//             setIndex(index + 1);
//             update(index + 1);
//         } else {
//             setIndex(data.length);
//         }
//     };

//     const checkAnswer = (each, idx) => {
//         if (each.trim() === quiz.answer.trim()) {
//             document.getElementsByClassName("options")[idx].style.backgroundColor = "green";
//             setCurrect(currect + 1)
//         } else {
//             document.getElementsByClassName("options")[idx].style.backgroundColor = "red";
//             setWrong(wrong + 1)
//         }
//         setTimeout(increment, 1000);
//     };

//     console.log(quiz)
//     return (
//         <>
//             {index === data.length ? (
//                 <>
//                     <React.Fragment>
//                         <CssBaseline />
//                         <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//                             <Box sx={{ bgcolor: '#cfe8fc', width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "10px" }}>
//                                 <h1>Result</h1>
//                                 <EmojiEventsIcon style={{fontSize:"50px"}}/>
//                                 <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column", height:"30%"}}>
//                                 <p>Currect Answers: {currect}</p>
//                                 <p>Wrong Answers: {wrong}</p>
//                                 <p>UnAnswered Questions: {data.length - (currect + wrong)}</p>
//                                 <p>Percentage: {currect / data.length * 100} %</p>
//                                 </div>
//                                 <Button onClick={() => {
//                                     setIndex(0);
//                                     update(0);
//                                     setCurrect(0);
//                                     setWrong(0);
//                                 }} variant="contained" style={{marginBottom:"20px"}}>ReStart</Button>
//                             </Box>
//                         </Container>
//                     </React.Fragment>

//                 </>
//             ) : (
//                 <>
//                     {
//                         startButton &&
//                         <React.Fragment>
//                             <CssBaseline />
//                             <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//                                 <Box sx={{ bgcolor: '#cfe8fc', height: '50vh', width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "10px" }}>
//                                     <h1>Start The Quiz</h1>
//                                     <ThumbUpAltIcon />
//                                     <p>Good Luck!</p>
//                                     <p>Each Question: 30sec</p>
//                                     <Button onClick={() => {
//                                         setIndex(0);
//                                         update(0);
//                                         setStartButton(false)
//                                     }} variant="contained">Start</Button>
//                                 </Box>
//                             </Container>
//                         </React.Fragment>

//                     }

//                     {index !== null && (
//                         <React.Fragment>
//                             <CssBaseline />
//                             <Container maxWidth="md" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//                                 <Box sx={{ bgcolor: '#cfe8fc', height: '60vh', width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "10px" }}>
//                                     <Container maxWidth="md" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "absolute", marginTop: "-320px" }}>
//                                         <h3 style={{ marginLeft: "20px" }}>Question {index + 1}/{data.length}</h3>
//                                         <div style={{ display: "flex", justifyContent: "center", marginRight: "20px" }}><span><TimerIcon /></span> <span>{timeLeft}s</span></div>
//                                     </Container>

//                                     <Container maxWidth="md" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

//                                         <Container>
//                                             <h3>{quiz.question}</h3>
//                                         </Container>

//                                         <Container>
//                                             {quiz.options.map((eachOption, idx) => {
//                                                 return (
//                                                     <p
//                                                         key={idx}
//                                                         className="options"
//                                                         onClick={() => {
//                                                             checkAnswer(eachOption, idx);
//                                                         }}
//                                                         style={{ border: "1px solid black", padding: "10px", borderRadius: "10px", cursor: "pointer" }}
//                                                     >
//                                                         {idx + 1}. {eachOption}
//                                                     </p>
//                                                 );
//                                             })}
//                                         </Container>

//                                     </Container>

//                                     {index >= 0 && <Button style={{ position: "absolute", marginBottom: "-350px" }} onClick={increment} variant="contained">next</Button>}

//                                 </Box>
//                             </Container>
//                         </React.Fragment>
//                     )}
//                 </>
//             )}
//         </>
//     );
// };