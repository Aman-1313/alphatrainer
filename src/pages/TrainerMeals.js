import React, { useEffect, useState } from 'react';
import { db, auth } from '../services/firebase';
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import Edit from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField, Button, Grid, Typography, IconButton, Box,Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
const TrainerMeals = ({ navigation }) => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [mealUpdates, setMealUpdates] = useState({});

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    setFilteredMeals(
      meals.filter((meal) =>
        meal.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, meals]);

  const fetchMeals = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const trainerMealsRef = collection(db, 'meals', user.uid, 'trainerMeals');
        const mealQuery = query(trainerMealsRef);
        const querySnapshot = await getDocs(mealQuery);

        const fetchedMeals = [];
        querySnapshot.forEach((doc) => {
          fetchedMeals.push({ id: doc.id, ...doc.data() });
        });

        setMeals(fetchedMeals);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
      Alert.alert('Error', 'Failed to load meals.');
    }
  };

  const handleEditMeal = (mealId) => {
    setIsEditing(mealId);
    setMealUpdates({}); // Clear previous edits when switching to a new meal
  };

  const handleRecipeChange = (text) => {
    const formattedText = text
      .split('\n') // Split text into lines
      .map(line => line.startsWith('\u2022') ? line : `\u2022 ${line}`) // Add bullet if not already present
      .join('\n'); // Join lines back into a single string
    setMealUpdates((prev) => ({ ...prev, recipe: formattedText }));
  };

  const handleSaveMeal = async (mealId) => {
    try {
      const mealRef = doc(db, 'meals', auth.currentUser.uid, 'trainerMeals', mealId);
      await updateDoc(mealRef, mealUpdates);
      window.alert('Meal updated successfully!');


      // Update local state
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal.id === mealId ? { ...meal, ...mealUpdates } : meal
        )
      );

      setIsEditing(null);
    } catch (error) {
      console.error('Error updating meal:', error);
      window.alert('Meal updated successfully!');

    }
  };

  const renderMealItem = (item) => (
    <Box sx={styles.mealItem}>
      {isEditing === item.id ? (
        <>
          <Box sx={styles.inputContainer}>
            <Typography sx={styles.inputLabel}>Meal Name</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Edit meal name"
              value={mealUpdates.name || item.name}
              onChange={(e) =>
                setMealUpdates((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Typography sx={styles.inputLabel}>Calories</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Edit calories"
              type="number"
              value={(mealUpdates.calories || item.calories).toString()}
              onChange={(e) =>
                setMealUpdates((prev) => ({ ...prev, calories: parseInt(e.target.value) || 0 }))
              }
            />
            <Typography sx={styles.inputLabel}>Carbs (g)</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Edit carbs"
              type="number"
              value={(mealUpdates.carbs || item.carbs).toString()}
              onChange={(e) =>
                setMealUpdates((prev) => ({ ...prev, carbs: parseInt(e.target.value) || 0 }))
              }
            />
            <Typography sx={styles.inputLabel}>Fat (g)</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Edit fat"
              type="number"
              value={(mealUpdates.fat || item.fat).toString()}
              onChange={(e) =>
                setMealUpdates((prev) => ({ ...prev, fat: parseInt(e.target.value) || 0 }))
              }
            />
            <Typography sx={styles.inputLabel}>Protein (g)</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Edit protein"
              type="number"
              value={(mealUpdates.protein || item.protein).toString()}
              onChange={(e) =>
                setMealUpdates((prev) => ({ ...prev, protein: parseInt(e.target.value) || 0 }))
              }
            />
            <Typography sx={styles.inputLabel}>Recipe</Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              placeholder="Edit recipe"
              value={mealUpdates.recipe || item.recipe}
              onChange={(e) => handleRecipeChange(e.target.value)}
            />
            <Typography sx={styles.inputLabel}>Ingredients (comma-separated)</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Edit ingredients (comma-separated)"
              value={mealUpdates.ingredients ? mealUpdates.ingredients.join(', ') : item.ingredients.join(', ')}
              onChange={(e) =>
                setMealUpdates((prev) => ({ ...prev, ingredients: e.target.value.split(',').map((ing) => ing.trim()) }))
              }
            />
          </Box>

          <Box sx={styles.buttonsContainer}>
            <Button variant="contained" color="primary" onClick={() => handleSaveMeal(item.id)}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleEditMeal()}>
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={styles.mealHeader}>
          <Typography sx={styles.mealName}>{item.name}</Typography>
          <IconButton onClick={() => handleEditMeal(item.id)}>
            <Edit size={24} color="#6200ea" />
          </IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={styles.container}>
      <Paper elevation={3} style={styles.infoSection}>
           <Box sx={styles.appbar}>
              <IconButton onClick={() => navigate('/trainer/account')} style={{ color: '#fff' }}>
               <MenuIcon fontSize="large" />
             </IconButton>

             <Button onClick={() => navigate('/dashboard')}> <Typography sx={styles.appTitle}>Alpha</Typography> </Button>
           </Box>
           <TextField
             variant="outlined"
             fullWidth
             sx={styles.searchBar}
             placeholder="Search meals by name..."
             value={searchText}
             onChange={(e) => setSearchText(e.target.value)}
           />
           <Grid container spacing={2}>
             {filteredMeals.map((meal) => (
               <Grid item xs={12} sm={6} md={4} key={meal.id}>
                 {renderMealItem(meal)}
               </Grid>
             ))}
           </Grid>
      </Paper>

    </Box>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#FFF',
  },
  searchBar: {

    marginTop: '16px',
  },
  mealItem: {
    padding: '16px',
    borderBottom: '1px solid #EEE',
  },
  inputContainer: {
    marginBottom: '16px',
  },
  inputLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  mealHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  appbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#6200ea',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  iconButton: {
    padding: '10px',

  },
  appTitle: {
    fontSize: '20px',
    color: '#fff',
    fontWeight: 'bold',
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

export default TrainerMeals;
