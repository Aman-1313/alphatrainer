import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function TrainerLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTrainerLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user is a trainer
      const trainerDoc = await getDoc(doc(db, 'trainers', user.uid)); // Assuming trainers are stored in 'trainers' collection
      if (trainerDoc.exists()) {
        const trainerData = trainerDoc.data();
        alert('Trainer logged in successfully!');
        setEmail('');
        setPassword('');
        navigate('/dashboard', { state: { userId: user.uid, trainerName: trainerData.name } });
      } else {
        setError('Trainer info not found!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Box
        style={{
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
        }}
      >
        <img
          src="/logo-long.png"
          alt="Logo"
          style={{ width: '80%', marginBottom: '20px' }}
        />
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Trainer Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: '16px',
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: '16px',
          }}
        />

        {error && (
          <Alert severity="error" style={{ width: '100%', marginTop: '16px' }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
          onClick={handleTrainerLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>

        <Button
          variant="text"

          sx={{ mt: 1, textTransform: 'none' }}
          onClick={() => navigate('/trainer-signup')}
        >
          Don't have an account? Sign up
        </Button>
      </Box>

    </Container>
  );
}
