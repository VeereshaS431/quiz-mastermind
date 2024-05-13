import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { get, getDatabase, push, ref, set } from "firebase/database"
import { useEffect, useState } from "react"
import { app } from '../../firebase/firebaseConfig';
import { Button } from '@mui/material';


export default function UpdateJavascript({firebaseId}) {
  const [data, setData] = useState({
    question: null,
    optionA: null,
    optionB: null,
    optionC: null,
    optionD: null,
    answer: null
  })

  
  useEffect(()=>{
    const fetchData=async ()=>{
        const db=getDatabase(app)
        const dbRef=ref(db, "quize/javascript/"+firebaseId);
        const snapshot= await get(dbRef);
        if(snapshot.exists()){
            const targetObject=snapshot.val();
          
            setData({...data,question:targetObject.question,optionA:targetObject.optionA,optionB:targetObject.optionB,optionC:targetObject.optionC,optionD:targetObject.optionD,answer:targetObject.answer})
        }else{
            alert("error")
        }
    } 

    fetchData();
    },[firebaseId])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    console.log(name, value)
  }

  const overRideData = async () => {
    console.log(data)
    const db = getDatabase(app);
    const newDoc = ref(db, "quize/javascript/"+firebaseId);
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
          <TextField name='optionA' value={data.optionA} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="doutlined-controlled"
            label="Option A"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField name='optionB' value={data.optionB} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="outlined-controlled"
            label="Option B"
            required
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div style={{ display: "flex", columnGap: "20px" }}>
          <TextField name='optionC' value={data.optionC} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
            id="outlined-controlled"
            label="Option C"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField name='optionD' value={data.optionD} onChange={onChangeHandler} style={{ marginTop: "10px", width: "340px" }}
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