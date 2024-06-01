import { Avatar, Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React, { useState, useEffect } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editName, setEditName] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUser(user);
        setDisplayName(user.displayName);
        setEmail(user.email);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setDisplayName(userData.displayName || user.displayName);
          setEmail(userData.email || user.email);
        }
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert('Password updated successfully');
      setShowPasswordFields(false);
    } catch (error) {
      alert('Error updating password: ' + error.message);
    }
  };

  const handleDisplayNameChange = async () => {
    try {
      await updateProfile(user, { displayName });
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { displayName });
      alert('Display name updated successfully');
      setEditName(false);
    } catch (error) {
      alert('Error updating display name: ' + error.message);
    }
  };

  const handleAvatarChange = async () => {
    if (newAvatar) {
      const storageRef = ref(storage, `avatars/${user.uid}/${newAvatar.name}`);
      try {
        await uploadBytes(storageRef, newAvatar);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: downloadURL });
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          await updateDoc(userDocRef, { photoURL: downloadURL });
        } else {
          await setDoc(userDocRef, { photoURL: downloadURL, displayName, email });
        }
        alert('Avatar updated successfully');
        setEditAvatar(false);
      } catch (error) {
        alert('Error updating avatar: ' + error.message);
      }
    }
  };

  const handleAvatarSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewAvatar(event.target.files[0]);
      setEditAvatar(true);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box position="relative">
              <Avatar
                alt={displayName}
                src={user.photoURL}
                sx={{ width: 100, height: 100 }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                // sx={{ position: 'absolute', bottom: 0, right: 0 ,top:"10px"}}
                sx={{position: 'absolute',marginTop:"-35px"}}
              >
                <input hidden accept="image/*" type="file" onChange={handleAvatarSelect} />
                <PhotoCamera />
              </IconButton>
              {editAvatar && <Button sx={{marginTop:"10px"}} onClick={handleAvatarChange}>Update Avatar</Button>}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box display="flex" alignItems="center">
              <TextField
                label="Display Name"
                value={displayName}
                fullWidth
                margin="normal"
                disabled={!editName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <IconButton onClick={() => setEditName((prev) => !prev)}>
                <EditIcon />
              </IconButton>
            </Box>
            {editName && <Button onClick={handleDisplayNameChange}>Update Name</Button>}
            <TextField
              label="Email"
              value={email}
              fullWidth
              margin="normal"
              disabled
            />
            <Button variant="contained" color="primary" onClick={() => setShowPasswordFields((prev) => !prev)}>
              Change Password
            </Button>
            {showPasswordFields && (
              <>
                <TextField
                  label="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handlePasswordChange}>
                  Update Password
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;

