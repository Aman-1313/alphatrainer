
import { doc, setDoc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from './firebase'; // Firebase Firestore configuration

// Fetch diet plan for a specific date
export const fetchDietPlanForDate = async (userId, date) => {
  try {
    const docRef = doc(db, `dietPlans/${userId}/plans`, date);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // return the plan for the date
    } else {
      return null; // No plan for this date
    }
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    return null;
  }
};

export const saveDietPlan = async (userId, date, meals) => {

  try {
    // Save the diet plan for the user
    console.log(date);
    await setDoc(doc(db, `dietPlans/${userId}/plans`, date), {
      meals,
      followed: false, // Initially set to not followed
    });


    console.log("Diet plan saved successfully!");
  } catch (error) {
    console.error("Error saving diet plan:", error);
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
