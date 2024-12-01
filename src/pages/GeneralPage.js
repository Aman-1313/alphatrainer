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

      {/* Main Section */}
      <Container sx={styles.mainContainer}>
        <Grid container spacing={3}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={styles.mainTitle}>
              Achieve Your <br />
              <span style={{ color: '#FF7000' }}>Fitness Goals</span>
            </Typography>
            <Typography variant="body1" sx={styles.mainSubtitle}>
              Your journey to a healthier life starts here. Work with experts, get personalized plans, and see real results.
            </Typography>
            <Button variant="contained" sx={styles.mainButton}>
              Join Now
            </Button>
            <Typography variant="h6" sx={styles.brandsText}>
              What Our Clients Say
            </Typography>

            <Box sx={styles.testimonials}>
              <Grid container spacing={4}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={styles.testimonialCard} elevation={3}>
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
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={8} md={4}>
            <Box sx={styles.imageOverlay}>
              <Box sx={styles.imageBlur}>
                <Typography variant="h4" sx={styles.overlayText}>
                  Explore Our App
                  <Button variant="contained" sx={styles.mainButton}>
                    Download Now
                  </Button>
                </Typography>

              </Box>
              <img src="/app.png" alt="App Logo" style={styles.mainImage} />
            </Box>
          </Grid>

        </Grid>
      </Container>
       {/* Features Section */}
        <Container style={styles.featuresContainer}>
          <Typography variant="h4" style={styles.brandsText}>
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card style={styles.featureCard} elevation={3}>
                  <CardMedia
                    component="img"
                    image={feature.image}
                    alt={feature.title}
                    style={styles.featureImage}
                  />
                  <CardContent>
                    <Typography variant="h6" style={styles.featureTitle}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" style={styles.featureDescription}>
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
    fontFamily: "'Roboto', sans-serif",
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#FFF',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
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
  avatar: {
    backgroundColor: '#FF7000',
    color: '#FFF',
  },
  mainContainer: {
    flex: '1', // This makes the content grow to fill available space
    padding: '40px 20px',
    marginBottom: '40px',
    marginLeft: '25%',
    marginTop: '5%',
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: '3rem',
    lineHeight: '1.2',
  },
  mainSubtitle: {
    margin: '20px 0',
    color: '#666',
    fontSize: '16px',
  },
  mainButton: {
    backgroundColor: '#FF7000',
    color: '#FFF',
    padding: '10px 20px',
    textTransform: 'none',
    fontSize: '16px',
    margin: '20px 0',
    '&:hover': {
      backgroundColor: '#E56400',
    },
  },
  brandsText: {
    marginTop: '50px',
    fontWeight: 'bold',

  },
  imageOverlay: {
    position: 'relative',
    textAlign: 'center',
    marginLeft: '50px'
  },
  imageBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#FFF',
    zIndex: 2,
    fontWeight: 'bold',
  },
  mainImage: {
    width: '100%',
    borderRadius: '10px',
    zIndex: 0,
    filter: 'blur(2px)',
  },
  testimonials: {
    marginTop: '10px',
  },
  testimonialCard: {
    padding: '20px',
  },
  testimonialText: {
    fontStyle: 'italic',
    fontSize: '18px',
  },
  testimonialAuthor: {
    marginTop: '10px',
    color: '#333',
  },
  footer: {
    marginTop: 'auto', // Pushes the footer to the bottom when content is short
    backgroundColor: '#FFF',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
  },
  footerText: {
    color: '#666',
    fontSize: '14px',
  },
  featuresContainer: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  featuresGrid: {
    marginTop: '20px',
  },
  featureCard: {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
    },
  },
  featureImage: {
    height: '200px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  featureTitle: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  featureDescription: {
    marginTop: '10px',
    color: '#666',
  },
};


const testimonials = [
  {
    text: 'This platform made fitness so easy and achievable!',
    author: 'John D.',
  },
  {
    text: 'I love how personal the experience is. Highly recommend!',
    author: 'Emily R.',
  },
  {
    text: 'The trainers here are so supportive and professional.',
    author: 'Michael P.',
  },
];
// Placeholder Content
const features = [
  {
    image: '/nutrition.jpg',
    title: 'Custom Plans',
    description: 'Tailored to your specific goals and needs.',
  },
  {
    image: '/doctor.png',
    title: 'Expert Guidance',
    description: 'Work with top-certified trainers and dietitians.',
  },
  {
    image: '/tech.png',
    title: 'Seamless Experience',
    description: 'Intuitive tools to track progress and stay motivated.',
  },
];

export default GeneralPage;
