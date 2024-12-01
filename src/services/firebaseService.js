
import { doc, setDoc, getDoc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from './firebase'; // Firebase Firestore configuration

/**
 * Function to fetch meals for a specific user and date.
 * @param {string} userId - ID of the user.
 * @param {string} date - Date in "YYYY-MM-DD" format.
 * @returns {object} - An object containing times as keys and their corresponding meals array as values.
 */
export const fetchMealsForDate = async (userId, date) => {
  try {
    // Reference to the date subcollection
    const dateCollectionRef = collection(db, `DietPlans/${userId}/${date}`);

    // Fetch all time documents for the given date
    const querySnapshot = await getDocs(dateCollectionRef);

    const mealsByTime = {};

    // Iterate through each time document
    querySnapshot.forEach((doc) => {
      mealsByTime[doc.id] = doc.data().meals || []; // Use time as the key
    });

    return mealsByTime;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return null;
  }
};


export const saveDietPlan = async (userId, date, time, meal) => {
  try {
    // Reference to the specific time document
    const timeDocRef = doc(db, `DietPlans/${userId}/${date}`, time);

    // Use arrayUnion to add the meal to the meals array without duplicating
    await setDoc(
      timeDocRef,
      { meals: arrayUnion(meal) },
      { merge: true } // Merge data to avoid overwriting existing fields
    );

    console.log("Meal added successfully!");
  } catch (error) {
    console.error("Error adding meal:", error);
  }
};

// Mark diet plan as followed
export const markDietPlanAsFollowed = async (userId, date) => {
  try {
    const docRef = doc(db, `dietPlans/${userId}/plans`, date);
    await updateDoc(docRef, {
      followed: true,
    });
    console.log("Marked as followed!");
  } catch (error) {
    console.error("Error updating followed status:", error);
  }
};

// Save meal for the trainer
export const saveMeal = async (meal) => {
  try {
    const trainerId = auth.currentUser?.uid; // Get the current trainer's UID
    if (!trainerId) {
      console.error("No trainer ID found.");
      return;
    }

    // Save the meal under the trainer's specific subcollection
    await setDoc(doc(db, "meals", trainerId, "trainerMeals", meal.name), meal);
    console.log("Meal saved successfully for trainer:", trainerId);
  } catch (error) {
    console.error("Error saving meal:", error);
  }
};

// Search meals by name for the trainer
export const getMealsByName = async (partialName) => {
  try {
    const trainerId = auth.currentUser?.uid;
    if (!trainerId) {
      console.error("No trainer ID found.");
      return [];
    }

    const mealsCollection = collection(db, "meals", trainerId, "trainerMeals");
    const querySnapshot = await getDocs(mealsCollection);

    const meals = [];
    querySnapshot.forEach((doc) => {
      const meal = doc.data();
      if (meal.name.toLowerCase().includes(partialName.toLowerCase())) {
        meals.push({ id: doc.id, ...meal });
      }
    });

    return meals;
  } catch (error) {
    console.error("Error fetching meals by name:", error);
    return [];
  }
};
/**
 * Edit a specific meal in Firestore by its index in the array.
 * @param {string} userId - ID of the user.
 * @param {string} date - The date (e.g., "2024-11-21").
 * @param {string} time - The time (e.g., "09:00").
 * @param {number} mealIndex - The index of the meal to edit.
 * @param {Object} updatedMeal - The updated meal object.
 */
export const editMealByIndex = async (userId, date, time, mealIndex, updatedMeal) => {
  try {
    // Reference to the specific time document
    const timeDocRef = doc(db, "DietPlans", userId, date, time);

    // Fetch the existing meals array
    const timeDoc = await getDoc(timeDocRef);

    if (timeDoc.exists()) {
      const meals = timeDoc.data().meals || [];

      // Ensure the index is valid
      if (mealIndex < 0 || mealIndex >= meals.length) {
        console.error(`Invalid meal index: ${mealIndex}`);
        return;
      }

      // Update the specific meal by index
      meals[mealIndex] = { ...meals[mealIndex], ...updatedMeal };

      // Save the updated meals array back to Firestore
      await updateDoc(timeDocRef, { meals });

      console.log(`Meal at index ${mealIndex} updated successfully.`);
    } else {
      console.error("No data found for the specified date and time.");
    }
  } catch (error) {
    console.error("Error updating meal:", error);
  }
};


export const deleteDietItems = async (userId, date, time, mealToDelete) => {
  try {
    // Path to the meals array for the specific date and time
    const dietPlanRef = doc(db, "DietPlans", userId, date, time);

    // Fetch the document
    const dietPlanSnap = await getDoc(dietPlanRef);

    if (!dietPlanSnap.exists()) {
      throw new Error("Diet plan not found for the specified date and time.");
    }

    const mealsArray = dietPlanSnap.data()?.meals || [];

    // Filter out the meal to delete
    const updatedMeals = mealsArray.filter(
      (meal) =>
        !(meal.name === mealToDelete.name &&
          meal.calories === mealToDelete.calories &&
          meal.macronutrients === mealToDelete.macronutrients &&
          meal.recipe === mealToDelete.recipe)
    );

    // Update the document with the filtered meals array
    await updateDoc(dietPlanRef, { meals: updatedMeals });

    console.log("Meal deleted successfully.");
  } catch (error) {
    console.error("Error deleting the diet item:", error);
  }
};

// Fetch client info using the ID

 export const fetchClientData = async (clientId) => {
      try {
        const clientDocRef = doc(db, 'users', clientId); // Access the 'users' collection using clientId
        const clientDoc = await getDoc(clientDocRef);
        if (clientDoc.exists()) {
          return(clientDoc.data());
        } else {
          console.error('No such client document!');
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
 };