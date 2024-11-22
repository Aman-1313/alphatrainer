import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Paper, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ClientInfo = () => {
  const { clientId } = useParams(); // Get clientId from route parameters using React Router

  const navigate = useNavigate();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientDocRef = doc(db, 'users', clientId); // Access the 'users' collection using clientId
        const clientDoc = await getDoc(clientDocRef);
        if (clientDoc.exists()) {
          setClientData(clientDoc.data());
        } else {
          console.error('No such client document!');
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData(); // Call the function
  }, [clientId]); // Add clientId as a dependency

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 10 }}>
          Loading client information...
        </Typography>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* App Bar */}
      <AppBar position="static" style={styles.appbar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/trainer/account')}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={styles.appTitle}>
            ALPHA
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Client Info Section */}
      <Paper elevation={3} style={styles.infoSection}>
        <Typography variant="h5" style={styles.title}>
          Client Information
        </Typography>

        <div style={styles.infoRow}>
          <Typography style={styles.infoLabel}>Name:</Typography>
          <Typography style={styles.infoValue}>{clientData?.username || 'N/A'}</Typography>
        </div>

        <div style={styles.infoRow}>
          <Typography style={styles.infoLabel}>Gender:</Typography>
          <Typography style={styles.infoValue}>{clientData?.gender || 'N/A'}</Typography>
        </div>

        <div style={styles.infoRow}>
          <Typography style={styles.infoLabel}>Age:</Typography>
          <Typography style={styles.infoValue}>{clientData?.age || 'N/A'}</Typography>
        </div>

        <div style={styles.infoRow}>
          <Typography style={styles.infoLabel}>Fitness Goal:</Typography>
          <Typography style={styles.infoValue}>{clientData?.fitnessGoal || 'N/A'}</Typography>
        </div>

        <div style={styles.infoRow}>
          <Typography style={styles.infoLabel}>Activity Level:</Typography>
          <Typography style={styles.infoValue}>{clientData?.activityLevel || 'N/A'}</Typography>
        </div>

        <div style={styles.infoRow}>
          <Typography style={styles.infoLabel}>Height:</Typography>
          <Typography style={styles.infoValue}>{clientData?.height || 'N/A'} cm</Typography>
        </div>

        <div style={styles.infoRow}>
          <Typography style={styles.infoLabel}>Weight:</Typography>
          <Typography style={styles.infoValue}>{clientData?.weight || 'N/A'} kg</Typography>
        </div>
      </Paper>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
  },
  appbar: {
    marginBottom: '24px',
    backgroundColor: '#6200ea',
    color: '#ffffff',
  },
  appTitle: {
    flexGrow: 1,
    fontWeight: '600',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#333',
  },
  infoSection: {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '20px',
    fontWeight: '700',
    fontSize: '1.5rem',
    color: '#333',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  infoLabel: {
    fontWeight: '600',
    color: '#666',
    fontSize: '1rem',
  },
  infoValue: {
    fontWeight: '500',
    color: '#333',
    fontSize: '1rem',
  },
};

export default ClientInfo;
