import { signOut } from 'firebase/auth';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useContext } from 'react';
import { DataShare } from '../routers/navigation-stack';

const LogoutButton = () => {
  const navigate = useNavigate();
const{adminChangeLogControlForSignOut}=useContext(DataShare)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      adminChangeLogControlForSignOut()
      navigate('/adminLogin'); // Redirect to the admin login page
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <IconButton color="inherit" onClick={handleLogout}>
      <LogoutIcon />
    </IconButton>
  );
};

export default LogoutButton;