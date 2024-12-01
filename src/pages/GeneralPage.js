import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const GeneralPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.page}>
      {/* Navigation Bar */}
      <Box sx={styles.navbar}>
        <Typography variant="h6" sx={styles.logo}>
          Alpha
        </Typography>
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


      {/* Testimonials Section */}
      <Container sx={styles.testimonialsContainer}>
        <Typography variant="h4" sx={styles.sectionTitle}>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={styles.testimonialCard}>
                <CardContent>
                  <Typography variant="body1" sx={styles.testimonialText}>
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="body2" sx={styles.testimonialAuthor}>
                    - {testimonial.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={styles.featuresContainer}>
        <Typography variant="h4" sx={styles.sectionTitle}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={styles.featureCard}>
                <CardMedia
                  component="img"
                  image={feature.image}
                  alt={feature.title}
                  sx={styles.featureImage}
                />
                <CardContent>
                  <Typography variant="h6" sx={styles.featureTitle}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={styles.featureDescription}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={styles.footer}>
        <Typography variant="body2" sx={styles.footerText}>
          © 2024 Alpha. All Rights Reserved.
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
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    fontSize: '16px',
    color: '#333',
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
  testimonialsContainer: {
    padding: '60px 20px',
  },
  sectionTitle: {
    marginBottom: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  testimonialCard: {
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  testimonialText: {
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    marginTop: '10px',
    color: '#333',
  },
  featuresContainer: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  featureCard: {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  featureImage: {
    height: '200px',
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

const testimonials = [
  { text: 'This platform made fitness so easy!', author: 'John D.' },
  { text: 'Highly personalized and effective.', author: 'Emily R.' },
  { text: 'The best decision I ever made!', author: 'Michael P.' },
];

const features = [
  { image: '/nutrition.jpg', title: 'Custom Plans', description: 'Tailored to your specific goals.' },
  { image: '/doctor.png', title: 'Expert Guidance', description: 'Work with top professionals.' },
  { image: '/tech.png', title: 'Seamless Experience', description: 'Track progress easily.' },
];

export default GeneralPage;
