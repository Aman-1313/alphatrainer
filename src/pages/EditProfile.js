import React, { useEffect, useState } from 'react';
import { TextField, Typography, IconButton, Paper, Alert, Button, Divider, Avatar } from '@mui/material'; // MUI imports for React.js
import { auth, db, storage } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
const EditProfile = () => {
  const navigate = useNavigate();
  const [trainerData, setTrainerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

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

  const pickImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUri = URL.createObjectURL(file);
      setProfileImage(imageUri);
    }
  };

  const uploadProfileImage = async (uri) => {
    const trainer = auth.currentUser;
    if (!trainer) return null;

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `trainerProfileImages/${trainer.uid}`);
      console.log("profile upload", storageRef)
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading image: ', error);
      return null;
    }
  };

  const handleSave = async () => {
    try {
      const trainer = auth.currentUser;
      if (trainer) {
        let profileImageUrl = trainerData.profileImage;

        if (profileImage && profileImage !== trainerData.profileImage) {

          profileImageUrl = await uploadProfileImage(profileImage);
        }

        const trainerDocRef = doc(db, 'trainers', trainer.uid);
        await updateDoc(trainerDocRef, {
          ...trainerData,
          profileImage: profileImageUrl,
        });

        setTrainerData({ ...trainerData, profileImage: profileImageUrl });
        alert('Profile Updated', 'Your profile information has been successfully updated.');
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  const handleChange = (field, value) => {
    setTrainerData({ ...trainerData, [field]: value });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
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
         <div style={styles.avatarContainer}>
             {profileImage ? (
               <Avatar alt="Profile Image" src={profileImage} sx={{ width: 80, height: 80 }} />
             ) : (
               <Avatar sx={{ width: 80, height: 80 }}>
                 {trainerData.name ? trainerData.name[0].toUpperCase() : '?'}
               </Avatar>
             )}
         </div>
        <input
          type="file"
          onChange={pickImage}
          style={styles.fileInput}
        />

        <p style={styles.username}>{trainerData.name}</p>
        <p style={styles.email}>{trainerData.email}</p>
      </div>

      <Divider style={styles.divider} />

      <div style={styles.inputContainer}>
        <p style={styles.header}>Description</p>
        <TextField
          style={styles.input}
          value={trainerData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description"
        />
      </div>

      <div style={styles.inputContainer}>
        <p style={styles.header}>Experience (years)</p>
        <TextField
          style={styles.input}
          value={trainerData.experience}
          onChange={(e) => handleChange('experience', e.target.value)}
          placeholder="Experience (e.g., 5 years)"
          type="number"
        />
      </div>

      <div style={styles.inputContainer}>
        <p style={styles.header}>Trainer Specialty</p>
        <TextField
          style={styles.input}
          value={trainerData.specialty}
          onChange={(e) => handleChange('specialty', e.target.value)}
          placeholder="Specialty (e.g., Weight Loss)"
        />
      </div>

      <Button variant="contained" onClick={handleSave} style={styles.saveButton}>
        Save Changes
      </Button>
      </Paper>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#FFF',
  },
  profileSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  username: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center', // Horizontally centers the Avatar component
    marginBottom: 10, // Adds space between image and text
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
  email: {
    fontSize: '16px',
    color: 'gray',
  },
  divider: {
    margin: '20px 0',
  },
  inputContainer: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
  },
  saveButton: {
    marginTop: '20px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  header: {
    fontSize: '16px',
    color: '#6200ea',
  },
  fileInput: {
    marginBottom: '10px',
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

export default EditProfile;
