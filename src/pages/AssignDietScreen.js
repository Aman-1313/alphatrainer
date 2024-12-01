import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
} from "@mui/material";
import { auth } from '../services/firebase';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchClientData, deleteDietItems, editMealByIndex, fetchMealsForDate, saveDietPlan, saveMeal } from '../services/firebaseService'; // import the updated functions
import ClientRow from '../components/ClientRow';
const getWeekDates = (offset = 0) => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1 + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.toISOString().split("T")[0];
  });
};

const isCurrentWeek = (dates) => {
  const today = new Date().toISOString().split("T")[0];
  return dates.includes(today);
};

const AssignDietScreen = () => {
  const { userId } = useParams();

  const navigate = useNavigate();
  const [weekOffset, setWeekOffset] = useState(0);
  const [times, setTimes] = useState(["09:00", "10:00", "11:00", "12:00"]);
  const [newTime, setNewTime] = useState(""); // For inputting a new time slot
  const [meals, setMeals] = useState({});
  const [openModal, setOpenModal] = useState(false); // Control modal visibility
  const [selectedDietItem, setSelectedDietItem] = useState(null); // Store selected diet item for editing
  const [newDietItem, setNewDietItem] = useState({ name: "", calories: "", macronutrients: "", recipe: "" }); // New diet item
  const [clientData, setClientData] = useState(null);
  const dates = getWeekDates(weekOffset);
  //fetch meals,



   //fetch meals,
   useEffect(() => {
     const fetchDietPlans = async () => {
       const updatedMeals = { }; // Clone the existing state

       for (const date of dates) {
         try {
           // Wait for mealsByTime data from fetchMealsForDate
           const mealsByTime = await fetchMealsForDate(userId, date);

           // Process the fetched mealsByTime data
           Object.entries(mealsByTime).forEach(([time, mealsArray]) => {
             const key = `${date}_${time}`; // Generate the key

             if (!updatedMeals[key]) {
               updatedMeals[key] = []; // Initialize key if not already present
             }

             updatedMeals[key] = [...updatedMeals[key], ...mealsArray]; // Add meals to the key
           });

         } catch (error) {
           console.error(`Error fetching meals for date ${date}:`, error);
         }
       }

       setMeals(updatedMeals); // Update the state after processing all dates
     };

     fetchDietPlans();
   }, [userId, weekOffset, meals]);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userData = await fetchClientData(userId);
          setClientData(userData);

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();

    }, [userId]);


  // Handle editing a diet item
  const handleEditDietItem = (mealKey, index, date, time) => {
    setSelectedDietItem({ ...meals[mealKey][index], index, mealKey, date, time });
    setNewDietItem((meals[mealKey][index]));
    setOpenModal(true);
  };

  // Update diet item in meal
  const updateDietItem = (updatedItem) => {
    const updatedMeals = { ...meals };
    //Firebase Logic

    editMealByIndex(userId, selectedDietItem.date, selectedDietItem.time, selectedDietItem.index, updatedItem);
    // ends
    updatedMeals[selectedDietItem.mealKey][selectedDietItem.index] = updatedItem;
    setMeals(updatedMeals);
    setOpenModal(false);
    resetDietItemState();
  };

  // Open modal for adding a new diet item
  const openAddDietItemModal = (date, time) => {
    resetDietItemState();
    setNewDietItem((prev) => ({ ...prev, date, time }));
    setOpenModal(true);
  };

  // Handle adding a new diet item
  const handleAddNewDietItem = async () => {
    const { date, time } = newDietItem;
    if (!date || !time) {console.log("returning"); return;}
    const meal = {
       name: newDietItem.name,
       calories: newDietItem.calories,
       macronutrients: newDietItem.macronutrients,
       recipe: newDietItem.recipe,
     };
     try{
        await saveMeal(meal);
        await saveDietPlan(userId, date, time, meal);
     }catch (error) {
        console.log("Error", "Failed to save the meal. Please try again.");
     }

     //ends


//    setMeals(updatedMeals);
    setNewDietItem({ name: "", calories: "", macronutrients: "", recipe: "" }); // Reset form
    setOpenModal(false); // Close the modal after adding

  };


  // Add a new time slot
  const addTimeSlot = () => {
    if (newTime && !times.includes(newTime)) {
      setTimes([...times, newTime]);
      setNewTime(""); // Clear the input after adding
    }
  };

  // Delete a time slot
  const deleteTimeSlot = (time) => {
    setTimes(times.filter((t) => t !== time));
  };

  // Delete a diet item
  const deleteDietItem = async (mealKey, index, date, time) => {
    const updatedMeals = { ...meals };

    await deleteDietItems(userId, date, time, updatedMeals[mealKey][index]);

    updatedMeals[mealKey].splice(index, 1); // Remove the selected item
    setMeals(updatedMeals);
  };

  const resetDietItemState = () => {
    setSelectedDietItem(null);
    setNewDietItem({ name: "", calories: "", macronutrients: "", recipe: "" });
  };



  const styles = {
    container: {
      padding: "20px",
    },
    card: {
      padding: "20px",
      width: "200px",
      backgroundColor: '#f1f1f1',
    },
    title: {
      marginBottom: "20px",
      fontWeight: "bold",
      textAlign: "center",
    },
    navigation: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    tableContainer: {
      overflowX: "auto",
      marginTop: "20px",
    },
    addButton: {
      margin: "20px auto",
      display: "flex",
      alignItems: "center",
    },
    tableCell: {
      minWidth: "150px",
      textAlign: "center",
      verticalAlign: "middle",
    },
    timeInput: {
      width: "100%",
    },
    newTimeInput: {
      width: "100px", // Adjust the size of the new time input
      marginRight: "10px",
    },
    deleteButton: {
      marginLeft: "10px",
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
  };

  return (
    <Box style={styles.container}>
      {/* App Bar */}
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


       {
         clientData && <ClientRow client={clientData} userId={userId} trainerId={auth.currentUser?.uid} />
       }
      {/* Navigation for Weeks */}
      <Box style={styles.navigation}>
        <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          {isCurrentWeek(dates)
            ? "Current Week"
            : `Week of ${dates[0]} - ${dates[6]}`}
        </Typography>
        <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      {/* Diet Plan Table */}
      <Paper style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              {dates.map((date) => (
                <TableCell key={date} style={styles.tableCell}>
                  {date}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {times.map((time) => (
              <TableRow key={time}>
                <TableCell style={styles.tableCell}>
                  <TextField
                    type="time"
                    variant="outlined"
                    size="small"
                    value={time}
                    onChange={(e) => {
                      const updatedTimes = [...times];
                      updatedTimes[updatedTimes.indexOf(time)] = e.target.value;
                      setTimes(updatedTimes);
                    }}
                    style={styles.timeInput}
                  />
                  {/* Delete Button */}
                  <IconButton
                    onClick={() => deleteTimeSlot(time)}
                    style={styles.deleteButton}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
                {dates.map((date) => {
                  const key = `${date}_${time}`;
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      <Card style={styles.card}>
                        {meals[key]?.map((dietItem, index) => (
                          <Box key={index} style={{ display: "flex", alignItems: "center" }}>
                            <Typography>{dietItem.name}</Typography>
                            <IconButton
                              onClick={() => handleEditDietItem(key, index, date, time)}
                              size="small"
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={() => deleteDietItem(key, index, date, time)}
                              size="small"
                              style={styles.deleteButton}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Box>
                        ))}
                        {/* Add new diet item icon button */}
                        <Box style={styles.addButton}>
                          <IconButton
                            onClick={() => openAddDietItemModal(date, time)} // Pass date and time
                            size="large"
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                          <Typography>Add new meal</Typography>
                        </Box>
                      </Card>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Time Slot Section */}
      <Box style={styles.addButton}>
        <TextField
          type="time"
          variant="outlined"
          size="small"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          style={styles.newTimeInput}
        />
        <Button onClick={addTimeSlot} variant="contained">Add Time</Button>
      </Box>

      {/* Diet Item Modal */}
      <Dialog open={openModal} onClose={() => { setOpenModal(false); resetDietItemState(); }}>
        <DialogTitle>
          {selectedDietItem ? "Edit Diet Item" : "Add New Diet Item"}
        </DialogTitle>
        <DialogContent>
          <Typography>Name</Typography>
          <TextField
            label={selectedDietItem ? selectedDietItem.name : "Name"}
            fullWidth
            value={newDietItem.name}
            onChange={(e) => setNewDietItem({ ...newDietItem, name: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <Typography>Calories</Typography>
          <TextField
            label= {selectedDietItem ? selectedDietItem.calories : "Calories"}
            fullWidth
            value={newDietItem.calories}
            onChange={(e) => setNewDietItem({ ...newDietItem, calories: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <Typography>Macronutrients</Typography>
          <TextField
            label={selectedDietItem ? selectedDietItem.macronutrients : "Macronutrients"}
            fullWidth
            value={newDietItem.macronutrients}
            onChange={(e) => setNewDietItem({ ...newDietItem, macronutrients: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <Typography>Recipe</Typography>
          <TextField
            label={selectedDietItem ? selectedDietItem.recipe : "Recipe"}
            fullWidth
            value={newDietItem.recipe}
            onChange={(e) => setNewDietItem({ ...newDietItem, recipe: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenModal(false); resetDietItemState(); }} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedDietItem) {
                updateDietItem(newDietItem);
              } else {
                handleAddNewDietItem(); // Use the updated function
              }
              resetDietItemState();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default AssignDietScreen;
