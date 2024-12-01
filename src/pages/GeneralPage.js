import React from 'react';
import {
  Typography,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const GeneralPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.page}>
      {/* Navigation Bar */}
      <Box sx={styles.navbar}>
        {/* Logo Section */}
        <img 
          src="/logo-long.png" 
          alt="Alpha Logo" 
          style={styles.logoImage} 
        />
        
        {/* Navigation Links */}
        <Box sx={styles.navLinks}>
          <Typography variant="body1" sx={styles.navLink}>
            About Us
          </Typography>
          <Typography onClick={() => navigate('/trainer-login')} variant="body1" sx={styles.navLink}>
            Trainers
          </Typography>
          <Typography variant="body1" sx={styles.navLink}>
            Contact
          </Typography>
        </Box>
      </Box>


      {/* Hero Section */}
      <Box sx={styles.heroImageContainer}>
      <Box sx={styles.heroImageOverlay}>
        <Typography variant="h2" sx={styles.heroText}>
          Achieve Your <br />
          <span style={{ color: '#FF7000' }}>Fitness Goals</span>
        </Typography>
        <Typography variant="body1" sx={styles.heroSubtitle}>
          Your journey to a healthier life starts here. Work with experts, get personalized plans, and see real results.
        </Typography>
        <Button variant="contained" sx={styles.heroButton}>
          Join Now
        </Button>
      </Box>
      <img src="/apple.jpg" alt="Fitness Hero" style={styles.heroImage} />
      </Box>

      {/* Footer */}
      <Box sx={styles.footer}>
        <Typography variant="body2" sx={styles.footerText}>
          © 2024 Fitealthy. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

// Styles
const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFF',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#FFF',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logoImage: {
    height: '50px', // Adjust size as needed
    objectFit: 'contain',
    cursor: 'pointer', // Optional: Makes the logo clickable
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    fontSize: '16px',
    color: '#333',
    fontFamily: 'Rakkas',
    cursor: 'pointer',
    '&:hover': {
      color: '#FF7000',
    },
  },
  heroImageContainer: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    textAlign: 'center',
    padding: '20px',
  },
  heroText: {
    fontWeight: 'bold',
    fontSize: '5rem',
    lineHeight: '1.2',
    fontFamily: 'Rakkas',
  },

  heroSubtitle: {
    margin: '20px 0',
    fontSize: '2rem',
    color: '#FFF',
    fontFamily: 'Rakkas',
  },
  heroButton: {
    backgroundColor: '#FF7000',
    color: '#FFF',
    padding: '10px 20px',
    textTransform: 'none',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#E56400',
    },
  },
  
  footer: {
    marginTop: 'auto',
    backgroundColor: '#FFF',
    padding: '20px',
    textAlign: 'center',
  },
  footerText: {
    color: '#666',
  },
};


export default GeneralPage;
