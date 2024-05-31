import { useContext, useState } from "react";
import { Button, Grid, TextField, Typography, Box, Divider} from "@mui/material";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile, GoogleAuthProvider, getAuth } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { DataShare } from "../routers/navigation-stack";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';


export const UserRegisterPage = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
        displayName: ""
    });
    const [error, setError] = useState(null);
    const [loginType, setLoginType] = useState(true);

    const {changeLogControl}=useContext(DataShare)
    const navigate=useNavigate()

    const onChangeHandler = (e) => {
        setError("");
        const { name, value } = e.target;
        setUserCredentials((prev) => ({
            ...prev, [name]: value
        }));
    };


    const signUpSubmitHandler = (e) => {
        e.preventDefault();
        setError("");
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: userCredentials.displayName
            }).then(() => {
                sendEmailVerification(user)
                    .then(() => {
                        alert("Verification email sent! Please check your inbox.");
                    })
                    .catch((error) => {
                        setError("Failed to send verification email.");
                    });
                alert("Registered Successfully. Please verify your email.");
                setLoginType(true);
                setUserCredentials({ email: "", password: "", displayName: "" });
            }).catch((error) => {
                setError("Failed to update profile.");
            });
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        setError("");
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredential) => {
                if (userCredential.user.emailVerified) {
                    alert("Login Successfully");
                    console.log(userCredential)
                    setUserCredentials({ email: "", password: "" });
                    changeLogControl()
                    navigate("/")
                }
                else {
                    alert("email is not verified")
                }

            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const passwordReset = () => {
        const email = prompt("Please Enter your Email");
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Email sent! Check your inbox for password reset instructions.");
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };


    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                alert("Signed in with Google");
                console.log(user);
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


      const dividerStyle={
        "&.MuiDivider-root": {
          "&::before": {
            border: '1px solid white',
          },
          "&::after": {
            border: '1px solid white',
          },
        },
        color:"white",
        my: 2
      }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, height: "80vh", justifyContent: "center" }}>
            <Box sx={{background: "rgb(2,0,36)",background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(23,57,137,1) 29%, rgba(0,212,255,1) 100%)",display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, justifyContent: "center", border: "1px solid black", borderRadius: "15px", padding: "20px 0", minWidth: 300, width: "40vw",boxShadow: "21px 18px 21px -3px rgba(84,81,84,1)"}}>
                <Grid container spacing={2} sx={{ maxWidth: 300 }}>
                    <Grid item xs={6}>
                        <Button variant="outlined" sx={{backgroundColor:"white",'&:hover':{backgroundColor:"#B7B6B5",color:"black"}}} onClick={() => setLoginType(true)} fullWidth>Sign In</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" sx={{backgroundColor:"white",'&:hover':{backgroundColor:"#F8F4E3",color:"black"}}} onClick={() => setLoginType(false)} fullWidth>Sign Up</Button>
                    </Grid>
                </Grid>
                <Typography color={"white"} variant="h4" sx={{ mt: 3 }}>{loginType ? "Login" : "Sign Up"}</Typography>
                <Box component="form" onSubmit={loginType ? loginSubmitHandler : signUpSubmitHandler} sx={{ mt: 2, width: '90%' }}>
                    {!loginType && (
                        <TextField
                            name="displayName"
                            value={userCredentials.displayName}
                            onChange={onChangeHandler}
                            label="Display Name"
                            fullWidth
                            required
                            margin="normal"
                            sx={stylePart}
                        />
                    )}


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
                        {loginType ? "Sign In" : "Sign Up"}
                    </Button>
                    {loginType && <Typography onClick={passwordReset} sx={{ mt: 2, cursor: 'pointer',color:"white" }}>Forgot Password?</Typography>}
                    <Divider sx={dividerStyle}>Sign in With</Divider>
                    <Grid sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Button variant="contained" onClick={googleSignIn} sx={{ mt: 1 ,backgroundColor:"white",color:"black",'&:hover':{backgroundColor:"#B7B6B5",color:"black"}}}><GoogleIcon/> <Typography>Google</Typography></Button>
                    </Grid>
                   
                    <Typography sx={{ mt: 1,cursor: 'pointer',color:"white" }} onClick={()=>navigate("/adminLogin")}>Admin LoginPage</Typography>
                </Box>
            </Box>
        </Box>
    );
};
