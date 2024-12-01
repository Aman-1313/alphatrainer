import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Container,
} from '@mui/material';
import { auth, db } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const TrainerSignupScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTrainerSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save trainer data to the 'trainers' collection
      await setDoc(doc(db, 'trainers', user.uid), {
        email: user.email,
        createdAt: new Date(),
        name: name,
      });

      alert('Trainer account created successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate(`/trainer-signup/data-form/${user.uid}`); // Navigate to trainer form screen
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <Container maxWidth="sm"  style={{ marginTop: '40px' }}>
       <Box style={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
           height: '800px'
       }}>
       <img
         src="/logo-white.png"
         alt="Logo"
         style={{ width: '40%', marginBottom: '20px' }}
       />
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Trainer Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleTrainerSignup}
          disabled={loading}
          sx={{ mt: 2, mb: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>

        <Button
          variant="text"
          onClick={() => navigate('/trainer-login')}
          sx={{ mt: 1, textTransform: 'none' }}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default TrainerSignupScreen;
