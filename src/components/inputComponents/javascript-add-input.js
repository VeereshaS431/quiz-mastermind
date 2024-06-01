import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getDatabase, push, ref, set } from "firebase/database"
import { useState } from "react"
import { app } from '../../firebase/firebaseConfig';
import { Button, Container, Grid, Typography } from '@mui/material';


export default function JavaScriptAddInput() {
  const [data, setData] = useState({
    question: "",
    options: ["","","",""],
    answer: ""
  })
  const [error, setError] = useState("");
  const onChangeHandler = (e) => {
    const { name, value } = e.target
      if (name.startsWith("option")) {
        const index = parseInt(name.split("-")[1]); // Get the index from the name attribute
        const newOptions = [...data.options]; // Copy the current options
        newOptions[index] = value; // Update the specific option
        setData({ ...data, options: newOptions }); // Update the state with the new options array
      } else {
        setData({ ...data, [name]: value }); // Update the state for question and answer
      }
  }

  const validateData = () => {
    if (!data.question || !data.answer || data.options.some(option => !option)) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const saveData = async () => {
    if (!validateData()) return;
    console.log(data)
    const db = getDatabase(app);
    const newDoc = push(ref(db, "quize/javascript"));
    set(newDoc, data).then(() => {
      alert("data saved successfully")
      setData({
        question: "",
        options: ["","","",""],
        answer: ""
      })
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <Container>
    <Box
      sx={{
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}  sx={{
              width: '100%'
            }}>
          <TextField
            name='question'
            value={data.question}
            onChange={onChangeHandler}
            fullWidth
            label="Question"
            required
           
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="option-0"
              value={data.options[0]}
              onChange={onChangeHandler}
              fullWidth
              label="Option A"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="option-1"
              value={data.options[1]}
              onChange={onChangeHandler}
              fullWidth
              label="Option B"
              required
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name='option-2'
              value={data.options[2]}
              onChange={onChangeHandler}
              fullWidth
              label="Option C"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='option-3'
              value={data.options[3]}
              onChange={onChangeHandler}
              fullWidth
              label="Option D"
              required
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12} sx={{width:"100%"}}>
          <TextField
            name='answer'
            value={data.answer}
            onChange={onChangeHandler}
            fullWidth
            label="Answer"
            required
          />
        </Grid>
        </Grid>
        {error && <Typography textAlign={"center"} color="error">{error}</Typography>}
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={saveData}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
}