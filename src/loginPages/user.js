import { useContext, useState } from "react";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { DataShare } from "../routers/navigation-stack";
import { useNavigate } from "react-router-dom";

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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, height: "80vh", justifyContent: "center" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, justifyContent: "center", border: "1px solid black", borderRadius: "10px", padding: "20px 0", minWidth: 300, width: "40vw" }}>
                <Grid container spacing={2} sx={{ maxWidth: 300 }}>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => setLoginType(true)} fullWidth>Sign In</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => setLoginType(false)} fullWidth>Sign Up</Button>
                    </Grid>
                </Grid>
                <Typography variant="h4" sx={{ mt: 3 }}>{loginType ? "Login" : "Sign Up"}</Typography>
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
                        {loginType ? "Sign In" : "Sign Up"}
                    </Button>
                    {loginType && <Typography onClick={passwordReset} sx={{ mt: 2, cursor: 'pointer' }}>Forgot Password?</Typography>}
                    <Button variant="contained" onClick={googleSignIn} sx={{ mt: 2 }}>Sign In with Google</Button>
                    <Typography sx={{ mt: 1,cursor: 'pointer' }} onClick={()=>navigate("/adminLogin")}>Admin LoginPage</Typography>
                </Box>
            </Box>
        </Box>
    );
};
