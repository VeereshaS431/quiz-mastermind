import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app, auth, db } from "../firebase/firebaseConfig";
import { Box, Button, Container, CssBaseline, Grid, Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { addDoc, collection } from "firebase/firestore";

export const JavaScriptData = () => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(null);
    const [quiz, setQuiz] = useState({
        question: "",
        options: [],
        answer: "",
    });
    const [randomData, setRandomData] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [currect, setCurrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [startButton, setStartButton] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let timer;
        if (index !== null) {
            setTimeLeft(30);
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 1) {
                        increment();
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        if(index==randomData.length){
            saveQuizResult()
        }
        return () => clearInterval(timer);
    }, [index]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "quize/javascript");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const mydata = snapshot.val();
            const tempArray = Object.keys(mydata).map((each) => ({
                ...mydata[each],
                id: each,
            }));
            setData(tempArray);
            randomFunctionData(tempArray);
        } else {
            alert("No data");
        }
    };

    const randomFunctionData = (array) => {
        const shuffledArray = array.sort(() => 0.5 - Math.random());
        const randomTen = shuffledArray.slice(0, 10);
        setRandomData(randomTen);
    };

    const update = (index) => {
        const shuffledArray = randomData[index].options.sort(() => 0.5 - Math.random());
        setQuiz({
            question: randomData[index].question,
            options: shuffledArray,
            answer: randomData[index].answer,
        });
    };

    const increment = () => {
        if (index < randomData.length - 1) {
            document.getElementsByClassName("options")[0].style.backgroundColor = "white";
            document.getElementsByClassName("options")[1].style.backgroundColor = "white";
            document.getElementsByClassName("options")[2].style.backgroundColor = "white";
            document.getElementsByClassName("options")[3].style.backgroundColor = "white";
            setIndex(index + 1);
            update(index + 1);
        } else {
            setIndex(randomData.length);
           
        }
    };

    const checkAnswer = (each, idx) => {
        if (each.trim() === quiz.answer.trim()) {
            document.getElementsByClassName("options")[idx].style.backgroundColor = "green";
            setCurrect((prev) => prev + 1);
        } else {
            document.getElementsByClassName("options")[idx].style.backgroundColor = "red";
            setWrong((prev) => prev + 1);
        }
        setTimeout(increment, 1000);
    };


    const saveQuizResult = async () => {
        if (!auth.currentUser) {
            alert('Please log in to save your results.');
            return;
        }
        const userId = auth.currentUser.uid;
        const resultData = {
            currect,
            wrong,
            unanswered: randomData.length - (currect + wrong),
            percentage: (currect / randomData.length) * 100,
            date: new Date().toISOString(),
            type:"Javascript"
        };
        try {
            const userResultsRef = collection(db, 'quizResults', userId, 'results');
            await addDoc(userResultsRef, resultData);
            console.log('Quiz result saved successfully!');
        } catch (error) {
            console.error('Error saving quiz result:', error);
        }
    };


    return (
        <>
             {index === randomData.length ? (
                <>
                    <CssBaseline />
                    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
                        <Box sx={{ background: "rgb(2,0,36)",background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(23,57,137,1) 29%, rgba(0,212,255,1) 100%)", width: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',rowGap:"20px", flexDirection: 'column', borderRadius: '10px', p: 2 }}>
                            <Typography textAlign={"center"} color={"white"} fontWeight={"bold"} variant="h4">Result</Typography>
                            <EmojiEventsIcon sx={{ fontSize: '50px',color:"white" }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '30%',rowGap:"5px"}}>
                                <Typography textAlign={"center"} color={"white"}>Correct Answers: {currect}</Typography>
                                <Typography textAlign={"center"} color={"white"}>Wrong Answers: {wrong}</Typography>
                                <Typography textAlign={"center"} color={"white"}>Unanswered Questions: {randomData.length - (currect + wrong)}</Typography>
                                <Typography textAlign={"center"} color={"white"}>Percentage: {(currect / randomData.length) * 100} %</Typography>
                            </Box>
                            <Button onClick={() => {
                                setIndex(0);
                                update(0);
                                setCurrect(0);
                                setWrong(0);
                                randomFunctionData(data);
                            }} variant="contained" sx={{ mb: 2 }}  style={{marginBottom:"20px",backgroundColor:"white",color:"black"}}>ReStart</Button>
                        </Box>
                    </Container>
                </>
            ) : (
                <>
                    {startButton && (
                        <>
                            <CssBaseline />
                            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
                                <Box sx={{ background: "rgb(2,0,36)",background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(23,57,137,1) 29%, rgba(0,212,255,1) 100%)", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', rowGap:"20px",flexDirection: 'column', borderRadius: '10px', p: 2 }}>
                                    <Typography marginTop={5} textAlign={"center"} color={"white"} fontWeight={"bold"} variant="h4">Start The Quiz of Javascript</Typography>
                                    <ThumbUpAltIcon style={{color:"white", fontSize:"50px"}}/>
                                    <Typography textAlign={"center"} color={"white"}>Good Luck!</Typography>
                                    <Typography textAlign={"center"} color={"white"}>Each Question: 30sec</Typography>
                                    <Button style={{marginBottom:"20px",backgroundColor:"white",color:"black", width:"120px"}} onClick={() => {
                                        setIndex(0);
                                        update(0);
                                        setStartButton(false);
                                    }} variant="contained">Start</Button>
                                </Box>
                            </Container>
                        </>
                    )}

                    {index !== null && (
                        <>
                            <CssBaseline />
                            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
                                <Box sx={{ background: "rgb(2,0,36)",background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(23,57,137,1) 29%, rgba(0,212,255,1) 100%)", width: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'space-between', flexDirection: 'column', borderRadius: '10px', p: 2 }}>
                                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
                                        <Typography color={"white"} variant="h6">Question {index + 1}/{randomData.length}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TimerIcon style={{color:"white"}} />
                                            <Typography color={"white"} fontWeight={"bold"}>{timeLeft}s</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid container flexDirection="column" alignItems="center" spacing={1} sx={{ mb: 5 }}>
                                        <Typography color={"white"} variant="h6" textAlign={"center"}>{quiz.question}</Typography>
                                        </Grid>
                                        <Grid container flexDirection="column" alignItems="center" rowGap={1} spacing={1} sx={{ mb: 2 }}>
                                        {quiz.options.map((eachOption, idx) => (
                                            <Button
                                                key={idx}
                                                className="options"
                                                onClick={() => checkAnswer(eachOption, idx)}
                                                sx={{p: 1.5, borderRadius: '10px', cursor: 'pointer', width:"70%",backgroundColor:"white",":hover":{color:"black", backgroundColor:"white"}}}
                                                
                                            >
                                                {idx + 1}. {eachOption}
                                            </Button>
                                        ))}
                                        </Grid>
                                   

                                    {index >= 0 && <Button onClick={increment} sx={{backgroundColor:"white",color:"black", ":hover":{color:"black",backgroundColor:"#EEF7FF"}}} variant="contained">Next</Button>}
                                </Box>
                            </Container>
                        </>
                    )}
                </>
            )}
        </>
    );
};
