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

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, height: "80vh", justifyContent: "center" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, justifyContent: "center", border: "1px solid black", borderRadius: "10px", padding: "20px 0", minWidth: 300, width: "40vw" }}>
            <Typography variant="h4" sx={{ mt: 3 }}>Admin Login</Typography>
            <Box component="form" onSubmit={loginSubmitHandler} sx={{ mt: 2, width: '90%' }}>
                <TextField
                    name="email"
                    value={userCredentials.email}
                    onChange={onChangeHandler}
                    label="Email"
                    fullWidth
                    required
                    margin="normal"
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
                />
                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Sign In
                </Button>
                <Typography sx={{ mt: 1,cursor: 'pointer' }} onClick={()=>navigate("/")}>User LoginPage</Typography>
            </Box>
        </Box>
    </Box>
    )
}