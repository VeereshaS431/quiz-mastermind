import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import { auth, db } from '../firebase/firebaseConfig';

function QuizHistory() {
  const [htmlQuizzes, setHtmlQuizzes] = useState([]);
  const [cssQuizzes, setCssQuizzes] = useState([]);
  const [jsQuizzes, setJsQuizzes] = useState([]);

  useEffect(() => {

    const fetchQuizResults = async () => {
      if (!auth.currentUser) {
        alert('Please log in to view your results.');
        return;
      }
      const userId = auth.currentUser.uid;
      try {
        const userResultsRef = collection(db, 'quizResults', userId, 'results');
        const querySnapshot = await getDocs(userResultsRef);
        const results = querySnapshot.docs.map(doc => doc.data());
        const html = results.filter(quiz => quiz.type === 'HTML');
        const css = results.filter(quiz => quiz.type === 'css');
        const js = results.filter(quiz => quiz.type === 'Javascript');

        setHtmlQuizzes(html);
        setCssQuizzes(css);
        setJsQuizzes(js);

      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };

    fetchQuizResults();
  }, []);

  const renderQuizCards = (quizzes) => (
    quizzes.map((quiz, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" textAlign={"center"}>
              ATTEMPT {index + 1}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              current Answer: {quiz.currect}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              wrong Answer: {quiz.wrong}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              unanswered: {quiz.unanswered}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              percentage: {quiz.percentage}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {new Date(quiz.date).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
  );

  return (
    <div>
      <h2>Quiz History</h2>
      <h3>HTML Quizzes</h3>
      <Grid container spacing={2}>
      {renderQuizCards(htmlQuizzes)}
      </Grid>
      <Divider sx={{ marginTop: "20px" }} />
      <h3>CSS Quizzes</h3>
      <Grid container spacing={2}>
        {renderQuizCards(cssQuizzes)}
      </Grid>
      <Divider sx={{ marginTop: "20px" }} />
      <h3>JavaScript Quizzes</h3>
      <Grid container spacing={2}>
        {renderQuizCards(jsQuizzes)}
      </Grid>
    </div>
  );
}

export default QuizHistory;