import React, { useState } from "react";
import {  signInWithEmailAndPassword, deleteUser as firebaseDeleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../services/firebase';


const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSuccess("Signed in successfully!");
      console.log("User ID:", user.uid);

      // Trigger delete
      await handleDelete(user);
    } catch (err) {
      setError("Failed to sign in: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user) => {
    try {
      // Delete user data from Firestore
      await deleteDoc(doc(db, "users", user.uid));

      // Delete user from Firebase Authentication
      await firebaseDeleteUser(user);

      setSuccess("Account and data deleted successfully.");
    } catch (err) {
      setError("Failed to delete account: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Delete Account</h1>
      <div style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignIn} style={styles.button} disabled={loading}>
          {loading ? "Processing..." : "Sign In and Delete Account"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
};

export default DeleteAccount;
