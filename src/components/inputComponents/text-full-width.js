import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getDatabase, push, ref, set } from "firebase/database"
import { useState } from "react"
import { app } from '../../firebase/firebaseConfig';
import { Button } from '@mui/material';


export default function FullWidthTextField() {
  const [data, setData] = useState({
    question: null,
    optionA: null,
    optionB: null,
    optionC: null,
    optionD: null,
    answer: null
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    console.log(name, value)
  }

  const saveData = async () => {
    console.log(data)
    const db = getDatabase(app);
    const newDoc = push(ref(db, "quize/html"));
    set(newDoc, data).then(() => {
      alert("data saved successfully")
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
          <TextField name='optionA' value={data.optionA} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="demo-helper-text-aligned"
            label="Option A"
            required
          />
          <TextField name='optionB' value={data.optionB} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="demo-helper-text-aligned"
            label="Option B"
            required
          />
        </div>

        <div style={{ display: "flex", columnGap: "20px" }}>
          <TextField name='optionC' value={data.optionC} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="demo-helper-text-aligned"
            label="Option C"
            required
          />
          <TextField name='optionD' value={data.optionD} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
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