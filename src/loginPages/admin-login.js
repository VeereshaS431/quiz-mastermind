import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { DataShare } from "../routers/navigation-stack";
import { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export const AdminLoginPAge=()=>{
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const {adminChangeLogControl}=useContext(DataShare)
    const navigate=useNavigate()

    const onChangeHandler = (e) => {
        setError("");
        const { name, value } = e.target;
        setUserCredentials((prev) => ({
            ...prev, [name]: value
        }));
    };

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        setError("");
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredential) => {
                if (userCredential.user.emailVerified) {

                    if(userCredential.user.email==="veereshas.431@gmail.com"){
                        alert("Login Successfully");
                        console.log(userCredential)
                        setUserCredentials({ email: "", password: "" });
                        adminChangeLogControl()
                        navigate("/")
                    }
                    else{
                        alert("Not Access to users")
                    }
                    
                }
                else {
                    alert("email is not verified")
                }

            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const stylePart={
        '& .MuiInputBase-input': {
            color: 'white', // text color
          },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', // default color
          },
          '&:hover fieldset': {
            borderColor: '#B4B4B8', // hover color
          },
          '&.Mui-focused fieldset': {
            borderColor: '#C7C8CC', // focused color
          },
        },
        '& .MuiInputLabel-root': {
            color: 'white', // default label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#C7C8CC', // focused label color
          },
          '& .MuiInputLabel-root.Mui-error': {
            color: 'red', // error label color
          },
      }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, height: "80vh", justifyContent: "center" }}>
        <Box sx={{ background: "rgb(2,0,36)",background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(23,57,137,1) 29%, rgba(0,212,255,1) 100%)",display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, justifyContent: "center", border: "1px solid black", borderRadius: "15px", padding: "20px 0", minWidth: 300, width: "40vw",boxShadow: "21px 18px 21px -3px rgba(84,81,84,1)" }}>
            <Typography variant="h4" sx={{ mt: 3,color:"white",fontFamily:"monospace" }}>Admin Login</Typography>
            <Box component="form" onSubmit={loginSubmitHandler} sx={{ mt: 2, width: '90%' }}>
                <TextField
                    name="email"
                    value={userCredentials.email}
                    onChange={onChangeHandler}
                    label="Email"
                    fullWidth
                    required
                    margin="normal"
                    sx={stylePart}
                />
                <TextField
                    name="password"
                    value={userCredentials.password}
                    onChange={onChangeHandler}
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    sx={stylePart}
                />
                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2,backgroundColor:"white",color:"black",'&:hover':{backgroundColor:"#B7B6B5",color:"black"}}}>
                    Sign In
                </Button>
                <Typography sx={{ mt: 1,cursor: 'pointer', color:"white"}} onClick={()=>navigate("/")}>User LoginPage</Typography>
            </Box>
        </Box>
    </Box>
    )
}