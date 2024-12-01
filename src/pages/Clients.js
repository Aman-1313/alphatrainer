import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid, CircularProgress, IconButton, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Clients = ({ history }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const trainerUid = auth.currentUser?.uid;
      if (!trainerUid) {
        console.error('Trainer is not logged in.');
        setLoading(false);
        return;
      }

      const trainerDoc = await getDoc(doc(db, 'trainers', trainerUid));

      if (trainerDoc.exists()) {
        const clientIds = trainerDoc.data().clients || [];
        if(clientIds.length > 0){
            const clientsQuery = query(collection(db, 'users'), where('__name__', 'in', clientIds));
            const querySnapshot = await getDocs(clientsQuery);
            const fetchedClients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setClients(fetchedClients);
        }
      } else {
        console.error('Trainer not found!');
      }

      setLoading(false);
    };

    fetchClients();
  }, []);

  const handleChatPress = (client) => {
    const trainerId = auth.currentUser?.uid;
    if (!trainerId) {
      console.error('Trainer is not logged in.');
      return;
    }
    navigate(`/chat/${trainerId}/${client.id}`);

  };

  const handleDietPress = (client) => {
    navigate(`/trainer/assign-diet/${client.id}`);
  };

  const handleInfoPress = (client) => {
    navigate(`/trainer/client/${client.id}`);
  };

  if (loading) {
    return <div style={styles.loader}><CircularProgress /></div>;
  }

  if (clients.length === 0) {
    return <Typography variant="h6" align="center" style={styles.noClientsText}>No clients found!</Typography>;
  }

  return (
    <div style={styles.clientsContainer}>
      {/* App Bar */}
      <Paper elevation={3} style={styles.infoSection}>
        <div style={styles.appBar}>
          <IconButton onClick={() => navigate('/trainer/account')} style={{ color: '#fff' }}>
            <MenuIcon fontSize="large" />
          </IconButton>
           <Button onClick={() => navigate('/dashboard')}>
              <Typography  variant="h6" style={styles.appTitle}>
                  ALPHA
              </Typography>
           </Button>
        </div>

        <Typography variant="h4" style={styles.clientsTitle}>Client List</Typography>
        <Grid container spacing={3} style={styles.clientsGrid}>
          {clients.map((client) => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
              <Card style={styles.clientCard}>
                <CardMedia
                  component="img"
                  image={client.profileImage || 'https://via.placeholder.com/140'}
                  alt={client.username || 'Client Avatar'}
                  style={styles.clientImage}
                />
                <CardContent style={styles.cardContent}>
                  <Typography variant="h6" style={styles.clientName}>
                    {client.username || 'No Name'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={styles.clientEmail}>
                    {client.email || 'No Email'}
                  </Typography>
                </CardContent>
                <div style={styles.clientActions}>
                  <Button variant="contained" color="primary" onClick={() => handleDietPress(client)} style={styles.cardButton}>
                    Diet Plan
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleChatPress(client)} style={styles.cardButton}>
                    Chat
                  </Button>
                  <Button variant="outlined" onClick={() => handleInfoPress(client)} style={styles.cardButton}>
                    Info
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

    </div>
  );
};

const styles = {
  clientsContainer: {
    padding: '16px',
    backgroundColor: '#f9f9f9',  // Soft background color for minimal look
    minHeight: '100vh',
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
  clientsTitle: {
    fontSize: '32px',
    marginTop: '24px',
    fontWeight: '600',
    textAlign: 'center',
  },
  clientsGrid: {
    marginTop: '20px',
  },
  clientCard: {
    maxWidth: 280,
    margin: '0 auto',
    borderRadius: 12,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
  clientImage: {
    width: '100%',
    height: 'auto',
    maxWidth: 120,
    maxHeight: 120,
    display: 'block',
    margin: '0 auto',
    marginTop: 15,
    borderRadius: '10%',
  },
  clientName: {
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '8px',
  },
  clientEmail: {
    fontSize: '0.85rem',
    color: '#777',
    textAlign: 'center',
  },
  cardContent: {
    padding: '16px 12px',
  },
  clientActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 0',
  },
  cardButton: {
    width: '85%',
    textTransform: 'none',
    borderRadius: 8,
    fontSize: '0.875rem',
  },
  loader: {
    textAlign: 'center',
    marginTop: '50px',
  },
  noClientsText: {
    fontSize: '1.2rem',
    color: '#666',
    textAlign: 'center',
    marginTop: '20px',
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
};

export default Clients;
