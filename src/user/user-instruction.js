import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizInstructions = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" style={{ marginTop: '50px', display:"flex",alignItems:"center",justifyContent:"center",height:"85vh"}}>
            <Box sx={{ bgcolor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h4" gutterBottom>
                    Quiz Instructions
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Start a Quiz: After signing in, navigate to the quiz section. Click on the 'Start Quiz' button. Answer each question within the given time limit (30 seconds per question). Click on the correct answer from the given options. The quiz will automatically proceed to the next question after you select an answer or when the time runs out." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="View Results: Once you complete the quiz, you will be shown a results page. View your correct answers, wrong answers, unanswered questions, and your score percentage. Click the 'Restart' button to take the quiz again if desired." />
                    </ListItem>
                    {/* Add more instructions as needed */}
                </List>
                <Button variant="contained" onClick={() => navigate('/htmlquiz')} style={{ marginTop: '20px' }}>
                    Start Quiz
                </Button>
            </Box>
        </Container>
    );
};

export default QuizInstructions;
