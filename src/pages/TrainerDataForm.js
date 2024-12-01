import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
} from '@mui/material';
import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
const TrainerDataForm = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [trainerType, setTrainerType] = useState('fitness');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    console.log(trainerId);
    setLoading(true);
    try {
      await updateDoc(doc(db, 'trainers', trainerId), {
        description: description,
        experience: experience,
        specialty: specialty,
        trainerType: trainerType,
        rating: 5,
      });

      alert('Trainer data saved successfully!');
      navigate('/dashboard'); // Navigate to the trainer dashboard
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
             padding: '24px',
             border: '1px solid #ccc',
             borderRadius: '8px',
             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
             backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Complete Your Trainer Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Experience (years)"
          variant="outlined"
          value={experience}
          onChange={(e) => setExperience(e.target.value.replace(/[^0-9]/g, ''))} // Only allows numeric input
          placeholder="Enter your experience in years"
          sx={{ mb: 3 }}
          inputProps={{ type: 'number' }}
        />

        <TextField
          fullWidth
          label="Specialty"
          variant="outlined"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          placeholder="Enter your specialty"
          sx={{ mb: 3 }}
        />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Select Trainer Type:
        </Typography>
        <RadioGroup
          value={trainerType}
          onChange={(e) => setTrainerType(e.target.value)}
          row
          sx={{ mb: 3 }}
        >
          <FormControlLabel
            value="fitness"
            control={<Radio />}
            label="Fitness Trainer"
          />
          <FormControlLabel value="diet" control={<Radio />} label="Diet Trainer" />
        </RadioGroup>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
        </Button>
      </Box>
    </Container>
  );
};

export default TrainerDataForm;
