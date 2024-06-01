import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

const QuizInstructions = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserName(user.displayName);
        } else {
            setUserName("user");
        }
    }, []);

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} alignItems="center" justifyContent="space-around" marginTop={"50px"}>
                <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'left' }} >
                    <Typography 
                        variant="h3" 
                        gutterBottom
                        sx={{
                            fontSize: {
                                xs: '1.5rem', // for extra small devices
                                sm: '2rem',   // for small devices
                                md: '2.5rem', // for medium devices
                                lg: '5rem',   // for large devices
                                xl: '5.5rem'  // for extra large devices
                            },
                            background: "-webkit-linear-gradient(#eee, #333)",
                            webkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            fontWeight:"bold",
                            textAlign:"center"
                        }}
                    >
                        Welcome
                    </Typography>
                    <Typography 
                        variant="h4" 
                        gutterBottom
                        sx={{
                            fontSize: {
                                xs: '1.5rem',
                                sm: '2rem',
                                md: '4.5rem',
                                lg: '6rem',
                                xl: '6.5rem'
                            },
                            background: "-webkit-linear-gradient(#fc466b, #3f5efb)",
                            webkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            fontFamily:"initial",
                            fontWeight:"bold",
                            textAlign:"center"
                        }}
                    >
                        {userName}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ bgcolor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                        <Typography 
                            variant="h5" 
                            gutterBottom
                            sx={{
                                fontSize: {
                                    xs: '1.2rem',
                                    sm: '1.5rem',
                                    md: '1.8rem',
                                    lg: '2rem',
                                    xl: '2.2rem'
                                }
                            }}
                        >
                            Quiz Instructions
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Start a Quiz: After signing in, navigate to the quiz section. Click on the 'Start Quiz' button. Answer each question within the given time limit (30 seconds per question). Click on the correct answer from the given options. The quiz will automatically proceed to the next question after you select an answer or when the time runs out." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="View Results: Once you complete the quiz, you will be shown a results page. View your correct answers, wrong answers, unanswered questions, and your score percentage. Click the 'Restart' button to take the quiz again if desired." />
                            </ListItem>
                           
                        </List>
                        <Button variant="contained" onClick={() => navigate('/htmlquiz')} sx={{ marginTop: '20px', width: '100%' }}>
                            Start Quiz
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default QuizInstructions;
