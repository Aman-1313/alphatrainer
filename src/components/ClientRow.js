import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const ClientRow = ({ client, userId, trainerId }) => {
  const navigate = useNavigate();
  const handleChatPress = (client) => {
      navigate(`/chat/${trainerId}/${userId}`);
    };
  return (
  <>
    <Typography variant="h6" style={{ fontSize: "16px", fontWeight: "bold" }}>
        Client Information
    </Typography>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="20px"
      borderBottom="1px solid #ddd"
      style={{
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
        margin: "5px 0",
      }}
    >

      {/* Avatar */}
      <Avatar
        alt={client.username}
        src={client.profileImage}
        style={{
          width: 50,
          height: 50,
          marginRight: "15px",
        }}
      />

      {/* Client Details */}
      <Box display="flex" flexDirection="column" style={{ flex: 1 }}>
        <Typography variant="h6" style={{ fontSize: "16px", fontWeight: "bold" }}>
          {client.username}
        </Typography>
        <Typography variant="body2" style={{ color: "#555" }}>
          Email: {client.email}
        </Typography>

      </Box>

      {/* Additional Info */}
      <Box>
        <Typography
          variant="body2"
          style={{ fontWeight: "bold", textAlign: "right" }}
        >
          Plan: {client.selectedPlan.planId}
        </Typography>
        <Typography variant="body2" style={{ color: "#888", textAlign: "right" }}>
          Active: {JSON.stringify(client.hasPaidPlan)}
        </Typography>
        <Button variant="contained"  onClick={() => handleChatPress(client)} >
            Chat
        </Button>
      </Box>
    </Box>
  </>

  );
};
export default ClientRow;
