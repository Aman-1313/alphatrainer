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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDietPlanForDate, saveDietPlan, saveMeal, getMealsByName } from '../services/firebaseService'; // import the updated functions

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
  const [times, setTimes] = useState(["09:00"]);
  const [newTime, setNewTime] = useState(""); // For inputting a new time slot
  const [meals, setMeals] = useState({});
  const [openModal, setOpenModal] = useState(false); // Control modal visibility
  const [selectedDietItem, setSelectedDietItem] = useState(null); // Store selected diet item for editing
  const [newDietItem, setNewDietItem] = useState({ name: "", calories: "", macronutrients: "", recipe: "" }); // New diet item

  const dates = getWeekDates(weekOffset);
  //fetch meals,



   //fetch meals,
   useEffect(() => {
     const fetchDietPlans = async () => {
       const fetchedMeals = {};
       const newTimes = new Set(times); // Use a Set to store unique times

       for (const date of dates) {
         const dietPlan = await fetchDietPlanForDate(userId, date);

         if (dietPlan) {
           // Loop through the meals and store them with the date and time as the key
           dietPlan.meals.forEach((meal) => {
             const key = `${date}_${meal.time}`;

             // Add the meal time to the Set (ensures uniqueness)
             if(meal.time)
                newTimes.add(meal.time);

             if (!fetchedMeals[key]) {
               fetchedMeals[key] = [];
             }
             fetchedMeals[key].push(meal); // Add the meal to the corresponding key
           });
         }
       }

       // Convert the Set to an array and update the state with unique times
       setTimes(Array.from(newTimes));


       // Update the state with the structured fetchedMeals object
       setMeals(fetchedMeals);
     };

     fetchDietPlans();
   }, [userId, weekOffset]);



  // Handle editing a diet item
  const handleEditDietItem = (mealKey, index) => {
    console.log(meals[mealKey][index])
    setSelectedDietItem({ ...meals[mealKey][index], index, mealKey });
    setOpenModal(true);
  };

  // Update diet item in meal
  const updateDietItem = (updatedItem) => {
    const updatedMeals = { ...meals };
    updatedMeals[selectedDietItem.mealKey][selectedDietItem.index] = updatedItem;
    setMeals(updatedMeals);
    setOpenModal(false);
  };

  // Open modal for adding a new diet item
  const openAddDietItemModal = (date, time) => {
    resetDietItemState();
    setNewDietItem((prev) => ({ ...prev, date, time })); // Set default date and time in the new item
    setOpenModal(true);
  };

  // Handle adding a new diet item
  const handleAddNewDietItem = async () => {
    const { date, time } = newDietItem;
    if (!date || !time) return; // Ensure date and time are available
    const newMealKey = `${date}_${time}`;
    const updatedMeals = { ...meals };
    updatedMeals[newMealKey] = updatedMeals[newMealKey] || [];
    updatedMeals[newMealKey].push({
      name: newDietItem.name,
      calories: newDietItem.calories,
      macronutrients: newDietItem.macronutrients,
      recipe: newDietItem.recipe
    });
    // firebase logic mine!
    const meal = {
       name: newDietItem.name,
       calories: newDietItem.calories,
       macronutrients: newDietItem.macronutrients,
       recipe: newDietItem.recipe
     };
     try{
        await saveMeal(meal);

     }catch (error) {
        console.log("Error", "Failed to save the meal. Please try again.");
     }

     await saveDietPlan(userId, date, meal);

     //ends


    setMeals(updatedMeals);
    setNewDietItem({ name: "", calories: "", macronutrients: "", recipe: "", date: "", time: "" }); // Reset form
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
  const deleteDietItem = (mealKey, index) => {
    const updatedMeals = { ...meals };
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
        <Typography variant="h6" style={styles.appTitle}>
          ALPHA
        </Typography>
     </div>

      <Typography variant="h4" style={styles.title}>
        Assign Diet Plan
      </Typography>

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
                              onClick={() => handleEditDietItem(key, index)}
                              size="small"
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={() => deleteDietItem(key, index)}
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
