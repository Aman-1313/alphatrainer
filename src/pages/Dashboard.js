import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Paper, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';

const Dashboard = () => {
  const navigate = useNavigate();

  // Refined styles
  const styles = {
    dashboardContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      backgroundColor: '#fff',
      minHeight: '100vh',
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
    dashboardTitle: {
      fontSize: '32px',
      fontWeight: '600',
      marginBottom: '32px',
      color: '#333',
    },
    card: {
      marginBottom: '24px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
    },
    cardIcon: {
      fontSize: '48px',
      color: '#6200ea',
      marginRight: '16px',
    },
    cardText: {
      flex: 1,
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#333',
    },
    cardDescription: {
      fontSize: '14px',
      color: '#777',
    },
    cardButton: {
      backgroundColor: '#6200ea',
      color: '#fff',
      padding: '8px 16px',
      fontWeight: '600',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#3700b3',
      },
    },
  };

  return (
    <div style={styles.dashboardContainer}>

      <Paper elevation={3} style={styles.infoSection}>
          {/* App Bar */}
           <div style={styles.appBar}>
              <IconButton onClick={() => navigate('/trainer/account')} style={{ color: '#fff' }}>
                <MenuIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6" style={styles.appTitle}>
                ALPHA
              </Typography>
           </div>
          <Typography variant="h4" style={styles.dashboardTitle}>
            Trainer Dashboard
          </Typography>

          {/* Current Clients Card */}
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              <GroupIcon style={styles.cardIcon} />
              <div style={styles.cardText}>
                <Typography variant="h6" style={styles.cardTitle}>
                  Current Clients
                </Typography>
                <Typography variant="body2" style={styles.cardDescription}>
                  Interact with your current clients and assign their diet plans!
                </Typography>
              </div>
              <Button
                variant="contained"
                style={styles.cardButton}
                onClick={() => navigate('/clients')}
              >
                View Clients
              </Button>
            </CardContent>
          </Card>

          {/* Meals Database Card */}
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              <BookIcon style={styles.cardIcon} />
              <div style={styles.cardText}>
                <Typography variant="h6" style={styles.cardTitle}>
                  Meals Database
                </Typography>
                <Typography variant="body2" style={styles.cardDescription}>
                  Browse, update, or add new meals to your saved meals database!
                </Typography>
              </div>
              <Button
                variant="contained"
                style={styles.cardButton}
                onClick={() => navigate('/meals-database')}
              >
                Manage Meals
              </Button>
            </CardContent>
          </Card>
      </Paper>

    </div>
  );
};

export default Dashboard;
