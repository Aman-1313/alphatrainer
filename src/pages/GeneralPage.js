import React from 'react';
import {
  Typography,
  Button,
  Grid
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const GeneralPage = () => {
  const navigate = useNavigate();

  const openWhatsApp = () => {
    const phoneNumber = '917837500013'; // Replace with your business WhatsApp number
    const message = 'Hello, I would like to get more information about the plans.';
    const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

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
          <Typography onClick={() => navigate('/AboutUs')} variant="body1" sx={styles.navLink}>
            About Us
          </Typography>
          <Typography onClick={() => navigate('/trainer-login')} variant="body1" sx={styles.navLink}>
            Trainers
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

      {/* Services Section */}
      {/* Services Section */}
      <Box sx={styles.servicesSection}>

        <Typography variant="h4" sx={styles.sectionTitle}>
          What We Offer
        </Typography>
        <Grid container spacing={1} sx={styles.servicesGrid}>
          {services.map((service, index) => (
            <Grid container spacing={2} key={index} sx={styles.serviceItem}>
              {/* Text Content */}
              <Grid item xs={12} md={6} order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}>
                <Box sx={styles.serviceText}>
                  <Typography variant="overline" sx={styles.serviceOverline}>
                    {service.overline}
                  </Typography>
                  <Typography variant="h6" sx={styles.serviceTitle}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={styles.serviceDescription}>
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
              {/* Image */}
              <Grid item xs={12} md={6} order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}>
                <Box component="img" src={service.image} alt={service.title} sx={styles.serviceImage} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={styles.footer}>
        <Typography variant="body2" sx={styles.footerText}>
          © 2024 Fitealthy. All Rights Reserved.
        </Typography>
      </Box>

      {/* Bottom Fixed Contact Us */}
      <Box sx={styles.contactUs}>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={openWhatsApp}
          sx={styles.contactButton}
        >
          Chat with Us on WhatsApp
        </Button>
      </Box>
    </Box>
  );
};
const services = [
  {
    overline: "Personalized Plans",
    title: "Custom Diet & Fitness Plans",
    description:
      "We provide tailored diet and fitness plans designed to meet your unique needs and goals, empowering you to live a healthier and happier life.",
    image: "/nutrition.jpg",
  },
  {
    overline: "Expert Guidance",
    title: "Professional Support",
    description:
      "Get access to certified trainers and dietitians who will guide you every step of the way, ensuring you stay on track to achieve your fitness and health goals.",
    image: "/trainer.jpg",
  },
  {
    overline: "Track Your Progress",
    title: "Progress Monitoring",
    description:
      "We offer tools and features that allow you to track your progress, making adjustments to your plan as needed to keep you moving forward on your journey.",
    image: "/yoga.jpg",
  },
];

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFF',
    paddingBottom: '10%', // Adjusted to make it more dynamic
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2em 2vw',  // Using relative units
    backgroundColor: '#FFF',
    boxShadow: '0 0.2em 0.4em rgba(0, 0, 0, 0.1)',
  },
  logoImage: {
    height: '1rem',  // Dynamic size based on viewport width
    objectFit: 'contain',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    gap: '2vw',  // Dynamic gap between links
  },
  navLink: {
    fontSize: '1rem',  // Using rem for better scalability
    color: '#333',
    fontFamily: 'Rakkas',
    cursor: 'pointer',
    '&:hover': {
      color: '#FF7000',
    },
  },
  heroImageContainer: {
    position: 'relative',
    margin: '5% auto', // Adjusted for dynamic margin
    overflow: 'hidden',
    width: '90%', // Dynamic width relative to parent container
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    textAlign: 'center',
    padding: '5%', // Adjusted padding
  },
  heroText: {
    fontWeight: 'bold',
    fontSize: '5rem',
    lineHeight: '1.2',
    fontFamily: 'Rakkas',
    '@media (max-width: 768px)': {
      fontSize: '3rem', // Responsive font size for smaller screens
    },
  },
  heroSubtitle: {
    margin: '2% 0',
    fontSize: '2rem',
    color: '#FFF',
    fontFamily: 'Rakkas',
  },
  heroButton: {
    backgroundColor: '#FF7000',
    color: '#FFF',
    padding: '1rem 2rem',
    textTransform: 'none',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#E56400',
    },
  },
  sectionTitle: {
    fontFamily: 'Rakkas',
    fontWeight: 'bold',
    fontSize: '2rem',
    margin: '3%',
    color: '#333',
  },
  servicesSection: {
    position: 'relative',
    margin: '5% auto', // Adjusted for dynamic margin
    overflow: 'hidden',
    width: '90%', // Dynamic width relative to parent container
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  },
  servicesGrid: {
    marginTop: '4rem',
    alignItems: 'center',

  },
  serviceItem: {
    alignItems: 'center',
    marginBottom: '4rem',
  },
  serviceText: {
    fontFamily: 'Rakkas',
    width: '50%',
    margin: '0 auto', // Center the text
  },
  serviceOverline: {
    fontWeight: 'bold',
    color: '#4CAF50',
    textTransform: 'uppercase',
    fontFamily: 'Rakkas',
  },
  serviceTitle: {
    margin: '1rem',
    fontWeight: 'bold',
    fontFamily: 'Rakkas',
    fontSize: '2rem',
  },
  serviceDescription: {
    lineHeight: '1.6',
    fontFamily: 'Rakkas',
    fontSize: '1rem',
  },
  serviceImage: {
    width: '60%',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    backgroundColor: '#FFF',
    padding: '2rem',
    textAlign: 'center',
  },
  footerText: {
    color: '#666',
  },
  contactUs: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    padding: '2rem 4%', // Dynamic padding
    textAlign: 'center',
    zIndex: 1000,
  },
  contactButton: {
    backgroundColor: '#25D366',
    color: '#fff',
    padding: '1rem 2rem', // Dynamic padding
    borderRadius: '8px',
    fontSize: '1rem', // Responsive font size
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#20b358',
    },
  },
};


export default GeneralPage;
