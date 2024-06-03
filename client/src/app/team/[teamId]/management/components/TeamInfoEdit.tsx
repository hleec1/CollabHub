"use client"

import React, { useState, useEffect } from 'react';

import { Box, Button, Modal, TextField } from '@mui/material';

// Define the structure of the team information object
interface TeamInfo {
    teamName: string;
    description: string;
    subject: string;
    membersLimit: number;
  }
  
  // Define the props expected by TeamInfoEdit component
  interface TeamInfoEditProps {
    open: boolean;
    handleClose: () => void;
    handleSave: (teamInfo: TeamInfo) => void;  // Updated to pass TeamInfo object to the save function
    teamInfo: TeamInfo;
  }
  
  const TeamInfoEdit: React.FC<TeamInfoEditProps> = ({ open, handleClose, handleSave, teamInfo }) => {
    const [teamName, setTeamName] = useState<string>(teamInfo.teamName);
    const [description, setDescription] = useState<string>(teamInfo.description);
    const [subject, setSubject] = useState<string>(teamInfo.subject);
    const [membersLimit, setMembersLimit] = useState<number>(teamInfo.membersLimit);
  
    useEffect(() => {
      if (teamInfo) {
        setTeamName(teamInfo.teamName);
        setDescription(teamInfo.description);
        setSubject(teamInfo.subject);
        setMembersLimit(teamInfo.membersLimit);
      }
    }, [teamInfo]);
  
    const save = () => {
      handleSave({
        teamName,
        description,
        subject,
        membersLimit
      });
      handleClose();
    };
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: 400, 
        maxWidth: '60%' 
        }}>
          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            margin="normal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Limited Number of Members"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={membersLimit}
            onChange={(e) => setMembersLimit(parseInt(e.target.value, 10))}

          />
  
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={save} color="primary" variant="contained">Save</Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default TeamInfoEdit;