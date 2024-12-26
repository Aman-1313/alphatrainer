import React from 'react';
import {
  Typography,
  Button,
  Grid
} from '@mui/material';
import { Box } from '@mui/system';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactUs from './ContactUs';
import { Link } from 'react-router-dom'
const GeneralPage = () => {


  const openWhatsApp = () => {
    const phoneNumber = '14315574644'; // Replace with your business WhatsApp number
    const message = 'Hello, I would like to get more information about the plans.';
    const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Box sx={styles.page}>
        <>
            <nav className="navbar py-0 navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <Link data-aos="fade-right" className="navbar-brand navbar-brand d-flex justify-content-center align-items-center" >
                        <p className="logo ms-2 mt-4">
                        <span className="text-primary">Fit</span><span>ealthy</span>
                        </p>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="animate__animated animate__fadeInRightBig collapse navbar-collapse mt-4 mt-lg-0" id="navbarColor03">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link rounded-pill active mt-2 mt-lg-0 flex-center" to="/">Home <ion-icon class="ms-1" name="home-outline"></ion-icon>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link rounded-pill active mt-2 mt-lg-0 flex-center" to="/AboutUs">About Us <ion-icon class="ms-1" name="globe-outline"></ion-icon>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link rounded-pill active mt-2 mt-lg-0 flex-center" to="/policy-details">Terms & Conditions  <ion-icon class="ms-1" name="people-outline"></ion-icon>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link rounded-pill active mt-2 mt-lg-0 flex-center" to="/privacy-policy">Privacy Policy <ion-icon class="ms-1" name="log-in-outline"></ion-icon>
                            </Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link rounded-pill active mt-2 mt-lg-0 flex-center" to="/trainer-login">Trainers <ion-icon class="ms-1" name="aperture-outline"></ion-icon>
                            </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <br /><br /> <br />
        </>


      {/* Hero Section */}
      <Box sx={styles.heroSection}>
        {/* Text Content as a Card */}
        <Box sx={styles.heroCard}>
          <Typography variant="h2" sx={styles.heroTitle}>
             Achieve Your <span style={{ color: '#FF7000' }}>Fitness Goals</span>
          </Typography>
          <Typography variant="body1" sx={styles.heroDescription}>
            Your journey to a healthier life starts here. Work with experts, get personalized plans, and see real results.
          </Typography>
          <Box sx={styles.heroButtons}>
            <Button variant="contained" sx={styles.getStartedButton}>
              Get Started Today
            </Button>
          </Box>
        </Box>
      </Box>


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
      <ContactUs/>
      {/* Footer */}
      <Box sx={styles.footer}>
        <Typography variant="body2" sx={styles.footerText}>
          © 2024 Fitealthy. All Rights Reserved.
        </Typography>
        <Typography  sx={styles.footerText}>
         Email: info@fitealthy.com
        </Typography>
        <Typography  sx={styles.footerText}>
         Located at: #3 village Daria, Chandigarh
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
    height: '3rem',  // Dynamic size based on viewport width
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
  heroSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh', // Full screen height
    backgroundImage: 'url("/apple.jpg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    margin: '5vw',  // Dynamic margin based on viewport width
  },
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
    padding: '4vw',
    borderRadius: '1em', // Using em for rounded corners
    boxShadow: '0 0.4em 1.2em rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '90vw',  // Dynamic max width based on viewport width
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
    margin: '2vw 0',  // Responsive margin
    fontFamily: 'Rakkas',
  },
  heroDescription: {
    marginBottom: '2vw',  // Dynamic bottom margin
    lineHeight: '1.6',
    fontFamily: 'Rakkas',
  },
  heroButtons: {
    display: 'flex',
    gap: '4vw',  // Dynamic gap between buttons
    justifyContent: 'center',

  },
    getStartedButton: {
      backgroundColor: '#FF7000',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#45A049',
      },
      fontFamily: 'Rakkas',
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
