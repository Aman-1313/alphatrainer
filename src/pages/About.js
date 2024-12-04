import React from 'react';
import { Box, Typography, Button, Grid, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <Box sx={styles.page}>
      { /* Navigation Bar */}
      <Box sx={styles.navbar}>
        {/* Logo Section */}
        <img
          src="/logo-long.png"
          alt="Alpha Logo"
          style={styles.logoImage}
          onClick={() => navigate('/')}
        />

        {/* Navigation Links */}
        <Box sx={styles.navLinks}>
          <Typography onClick={() => navigate('/AboutUs')} variant="body1" sx={styles.navLink}>
            About Us
          </Typography>
          <Typography onClick={() => navigate('/trainer-login')} variant="body1" sx={styles.navLink}>
            Trainers
          </Typography>

        </Box>
      </Box>
      {/* Hero Section */}
      <Box sx={styles.heroSection}>
        {/* Text Content as a Card */}
        <Box sx={styles.heroCard}>
          <Typography variant="overline" sx={styles.heroSubtitle}>
            About Us
          </Typography>
          <Typography variant="h2" sx={styles.heroTitle}>
            Advancing health with accessible Nutrition
          </Typography>
          <Typography variant="body1" sx={styles.heroDescription}>
            Your path to better health starts here with accessible and reliable diet plans tailored to meet your unique needs.
          </Typography>
          <Box sx={styles.heroButtons}>
            <Button variant="contained" sx={styles.getStartedButton}>
              Get Started Today
            </Button>
            <Button variant="outlined" sx={styles.learnMoreButton}>
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>


      {/* Our Story Section */}
      <Box sx={styles.ourStorySection}>
        <Typography variant="overline" sx={styles.sectionSubtitle}>
          Our Story
        </Typography>
        <Typography variant="h4" sx={styles.sectionTitle}>
          Founded on the belief that health should be accessible to all
        </Typography>
        <Typography variant="body1" sx={styles.sectionDescription}>
          We created this platform to bridge the gap between expert health advice and everyday practice. Our journey began with a passion for wellness and a desire to make a positive impact on people's lives.
        </Typography>
      </Box>


      {/* Core Values Section */}
      <Box sx={styles.coreValuesSection}>
        <Typography variant="overline" sx={styles.sectionSubtitle}>
          Our Values
        </Typography>
        <Typography variant="h4" sx={styles.sectionTitle}>
          Our Core Values
        </Typography>
        <Grid container spacing={1} sx={styles.valuesGrid}>
          {coreValues.map((value, index) => (
            <Grid container spacing={2} key={index} sx={styles.valueItem}>
              {/* Text Content */}
              <Grid item xs={12} md={6} order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}>
                <Box sx={styles.valueText}>
                  <Typography variant="overline" sx={styles.valueOverline}>
                    {value.overline}
                  </Typography>
                  <Typography variant="h6" sx={styles.valueTitle}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={styles.valueDescription}>
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
              {/* Image */}
              <Grid item xs={12} md={6} order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}>
                <Box component="img" src={value.image} alt={value.title} sx={styles.valueImage} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

// Core Values Data
const coreValues = [
  {
    overline: "Honesty First",
    title: "Integrity",
    description:
      "Our unwavering commitment to honesty and strong moral principles guides every action we take, ensuring transparency, trust, and ethical behavior in all our interactions and decisions.",
    image: "/nutrition.jpg",
  },
  {
    overline: "Inclusive Support",
    title: "Community",
    description:
      "We are dedicated to building a supportive and inclusive environment where everyone feels valued and respected, fostering a sense of belonging and mutual support that strengthens our collective well-being.",
    image: "/community.jpg",
  },
  {
    overline: "Continuous Improvement",
    title: "Innovation",
    description:
      "We strive to continuously enhance our offerings by embracing new ideas and cutting-edge technologies, driving progress and improvement to better serve our community’s evolving needs and expectations.",
    image: "/trainer.jpg",
  },
];


// Styles
const styles = {
  page: {
    backgroundColor: '#fff',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
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
      height: '50px',
      objectFit: 'contain',
      cursor: 'pointer',
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
  heroSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh', // Full screen height
    backgroundImage: 'url("/yoga.jpg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    margin: '100px',
  },
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '600px',
    zIndex: 2, // Ensure it stays on top of the background
  },
  heroSubtitle: {
    color: '#4CAF50',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Rakkas',
  },
  heroTitle: {
    fontWeight: 'bold',
    margin: '20px 0',
    fontFamily: 'Rakkas',
  },
  heroDescription: {
    marginBottom: '20px',
    lineHeight: '1.6',
    fontFamily: 'Rakkas',
  },
  heroButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#45A049',
    },
  },
  learnMoreButton: {
    borderColor: '#4CAF50',
    color: '#4CAF50',
    '&:hover': {
      borderColor: '#45A049',
      color: '#45A049',
    },
  },
  ourStorySection: {
    textAlign: 'center',
    padding: '40px 20px',

  },
  sectionSubtitle: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontFamily: 'Rakkas',

  },
  sectionTitle: {
    fontFamily: 'Rakkas',
    margin: '20px 0',
    fontWeight: 'bold',
  },
  sectionDescription: {
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Rakkas',
  },
  coreValuesSection: {
    padding: '100px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '100px',
    backgroundColor: '#f4f4f4',
  },

  valuesGrid: {
    marginTop: '40px',
    alignItems: 'center',
  },
  valueItem: {
    alignItems: 'center',
    marginBottom: '40px',

  },
  valueText: {
    padding: '20px',
    fontFamily: 'Rakkas',
     width: '60%',
  },
  valueOverline: {
    fontWeight: 'bold',
    color: '#4CAF50',
    textTransform: 'uppercase',
    fontFamily: 'Rakkas',
  },
  valueTitle: {
    margin: '10px 0',
    fontWeight: 'bold',
    fontFamily: 'Rakkas',
    fontSize: '2rem',
  },
  valueDescription: {
    lineHeight: '1.6',
    fontFamily: 'Rakkas',
    fontSize: '1rem',
  },
  valueImage: {
    width: '60%',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

export default AboutUs;
