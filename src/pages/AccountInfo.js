import React, { useEffect, useState } from 'react';
import { Typography, Button, IconButton, Divider, Paper, Avatar, CircularProgress } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const AccountInfo = () => {
  const [trainerData, setTrainerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainerData();
  }, []);

  const fetchTrainerData = async () => {
    try {
      const trainer = auth.currentUser;
      if (trainer) {
        const trainerDocRef = doc(db, 'trainers', trainer.uid);
        const trainerDoc = await getDoc(trainerDocRef);
        if (trainerDoc.exists()) {
          setTrainerData(trainerDoc.data());
          setProfileImage(trainerDoc.data().profileImage);
        }
      }
    } catch (error) {
      console.error('Error fetching trainer data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const iconButtons = [
    { name: 'Edit Profile', screen: '/edit-profile' },
    { name: 'My Clients', screen: '/clients' },

  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={styles.container}>
    <Paper elevation={3} style={styles.infoSection}>
      {/* App Bar */}
      <div style={styles.appBar}>
       <IconButton onClick={() => navigate('/trainer/account')} style={{ color: '#fff' }}>
         <MenuIcon fontSize="large" />
       </IconButton>
       <Button onClick={() => navigate('/dashboard')}>
            <Typography  variant="h6" style={styles.appTitle}>
                ALPHA
            </Typography>
       </Button>

      </div>
      <div style={styles.profileSection}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.imageInput}
        />
        {profileImage ? (
          <Avatar alt={trainerData.username} src={profileImage} sx={{ width: 80, height: 80 }} />
        ) : (
          <Avatar sx={{ width: 80, height: 80 }}>{trainerData.username ? trainerData.username[0].toUpperCase() : '?'}</Avatar>
        )}
        <h2>{trainerData.username}</h2>
        <p>{trainerData.email}</p>
      </div>

      <Divider style={styles.divider} />

      {iconButtons.map((button) => (
        <div key={button.name}>
          <button onClick={() => navigate(button.screen)} style={styles.iconButton}>
            {button.name}
          </button>
          <Divider style={styles.divider} />
        </div>
      ))}

      <Button variant="contained" color="error" onClick={handleSignOut} style={styles.logoutButton}>
        Logout
      </Button>
    </Paper>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#FFF',
    margin:'50px'
  },
  infoSection: {
     padding: '30px', // Increased padding for more space inside the section
     borderRadius: '12px', // Slightly increased border radius for smoother corners
     backgroundColor: '#ffffff',
     boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow for more depth
     maxWidth: '950px', // Increased max width to allow for a larger section
     margin: '0 auto', // Keeps it centered
     width: '100%', // Ensures it takes up full width within the max width constraint
     minHeight: '400px', // Increased height to make it taller
  },
  profileSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  imageInput: {
    display: 'none',
  },
  divider: {
    margin: '20px 0',
  },
  iconButton: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '16px',
    width: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  logoutButton: {
    width: '100%',
    marginTop: '20px',
  },
  appBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      backgroundColor: '#6200ea',
      borderRadius: '8px',
      marginBottom: '24px',
  },
  appTitle: {
      fontSize: '20px',
      color: '#fff',
      fontWeight: 'bold',
  },
};

export default AccountInfo;
