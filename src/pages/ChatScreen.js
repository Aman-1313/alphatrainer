
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from '../services/firebase';
import "./styles.css"; // Import a CSS file for styling
import {  useParams } from 'react-router-dom';
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState(null);
  const [chatId, setChatId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { trainerId, userId } = useParams();
  const checkAndCreateChat = async (userId, trainerId) => {
    const generatedChatId = `${userId}_${trainerId}`;
    const chatRef = doc(db, "chats", generatedChatId);

    const chatDoc = await getDoc(chatRef);
    if (!chatDoc.exists()) {
      await setDoc(chatRef, {
        userId: userId,
        trainerId: trainerId,
        createdAt: Timestamp.now(),
      });
    }

    return generatedChatId;
  };

  useEffect(() => {
    const initializeChat = async () => {
      const generatedChatId = await checkAndCreateChat(userId, trainerId);
      setChatId(generatedChatId);

      const q = query(
        collection(db, "chats", generatedChatId, "messages"),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let msgs = [];
        snapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() });
        });
        setMessages(msgs);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    initializeChat();
  }, [userId, trainerId]);

  const sendMessage = async (type = "text", mediaUrl = null, fileName = null) => {
    if (inputText.trim() === "" && !mediaUrl) return;

    const messageData = {
      text: type === "text" ? inputText : null,
      senderId: auth.currentUser.uid,
      type: type,
      mediaUrl: mediaUrl,
      fileName: fileName,
      timestamp: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "chats", chatId, "messages"), messageData);
      setInputText("");
      setMedia(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const pickImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const blob = file;
        const storageRef = ref(storage, `chat_media/${file.name}_${Date.now()}`);
        await uploadBytes(storageRef, blob);

        const downloadUrl = await getDownloadURL(storageRef);
        sendMessage("image", downloadUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const renderMessage = (message) => (
    <div
      className={`message ${
        message.senderId === auth.currentUser.uid ? "sent" : "received"
      }`}
      key={message.id}
    >
      {message.type === "text" ? (
        <p>{message.text}</p>
      ) : message.type === "image" ? (
        <img
          src={message.mediaUrl}
          alt="Attachment"
          className="message-image"
          onClick={() => setSelectedImage(message.mediaUrl)}
        />
      ) : message.type === "document" ? (
        <a href={message.mediaUrl} target="_blank" rel="noopener noreferrer">
          {message.fileName || "View Document"}
        </a>
      ) : null}
      <span className="timestamp">
        {message.timestamp.toDate().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Messages</h2>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="chat-messages">
          {messages.map((message) => renderMessage(message))}
        </div>
      )}

      <div className="chat-input">
        <input
          type="file"
          accept="image/*"
          onChange={pickImage}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="upload-button">
          📷
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={() => sendMessage()}>Send</button>
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged Attachment" />
        </div>
      )}
    </div>
  );
}
