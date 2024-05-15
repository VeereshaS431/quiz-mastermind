import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { get, getDatabase, push, ref, set } from "firebase/database"
import { useEffect, useState } from "react"
import { app } from '../../firebase/firebaseConfig';
import { Button } from '@mui/material';


export default function UpdateHtml({firebaseId}) {
  const [data, setData] = useState({
    question: "",
    options: ["","","",""],
    answer: ""
  })
  

  useEffect(()=>{
    const fetchData=async ()=>{
        const db=getDatabase(app)
        const dbRef=ref(db, "quize/html/"+firebaseId);
        const snapshot= await get(dbRef);
        if(snapshot.exists()){
            const targetObject=snapshot.val();
          
            setData({...data,question:targetObject.question,options:targetObject.options,answer:targetObject.answer})
        }else{
            alert("error")
        }
    } 

    fetchData();
    },[firebaseId])

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

 

  const overRideData = async () => {
    const db = getDatabase(app);
    const newDoc = ref(db, "quize/html/"+firebaseId);
    set(newDoc, data).then(() => {
        alert("data updated successfully")
    }).catch((err) => {
        alert(err)
    })
}

  return (
    <Box
    component="form"
      sx={{
        width: 700,
        maxWidth: '100%',
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "20px" }}>
        <TextField name='question' defaultValue={data.question} value={data.question} onChange={onChangeHandler} fullWidth label="Question" id="outlined-controlled" required InputLabelProps={{ shrink: true }}/>
        <div style={{ display: "flex", columnGap: "20px" }}>
          <TextField name='option-0' value={data.options[0]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="doutlined-controlled"
            label="Option A"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField name='option-1' value={data.options[1]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="outlined-controlled"
            label="Option B"
            required
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div style={{ display: "flex", columnGap: "20px" }}>
          <TextField name='option-2' value={data.options[2]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="outlined-controlled"
            label="Option C"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField name='option-3' value={data.options[3]} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="outlined-controlled"
            label="Option D"
            required
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <TextField name='answer' value={data.answer} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
          id="outlined-controlled"
          label="Answer"
          required
          InputLabelProps={{ shrink: true }}
        />
        <Button
        variant="contained" 
        size="large"
          onClick={overRideData}
        >
          Update
        </Button>
      </div>
    </Box>
  );
}