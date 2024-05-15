import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getDatabase, push, ref, set } from "firebase/database"
import { useState } from "react"
import { app } from '../../firebase/firebaseConfig';
import { Button } from '@mui/material';


export default function CssAddInput() {
  const [data, setData] = useState({
    question: "",
    options: ["","","",""],
    answer: ""
  })

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

  const saveData = async () => {
    console.log(data)
    const db = getDatabase(app);
    const newDoc = push(ref(db, "quize/css"));
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
    <Box
      sx={{
        width: 700,
        maxWidth: '100%',
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "20px" }}>
        <TextField name='question' value={data.question} onChange={onChangeHandler} fullWidth label="Question" id="fullWidth" required />
        <div style={{ display: "flex", columnGap: "20px" }}>
          <TextField name='option-0' value={data.options[0]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="demo-helper-text-aligned"
            label="Option A"
            required
          />
          <TextField name='option-1' value={data.options[1]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="demo-helper-text-aligned"
            label="Option B"
            required
          />
        </div>

        <div style={{ display: "flex", columnGap: "20px" }}>
          <TextField name='option-2' value={data.options[2]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="demo-helper-text-aligned"
            label="Option C"
            required
          />
          <TextField name='option-3' value={data.options[3]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="demo-helper-text-aligned"
            label="Option D"
            required
          />
        </div>
        <TextField name='answer' value={data.answer} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
          id="demo-helper-text-aligned"
          label="Answer"
          required
        />
        <Button
        variant="contained" 
        size="large"
          onClick={saveData}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}