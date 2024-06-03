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

// Define the props expected by NewTeamModal component
interface NewTeamModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (teamInfo: TeamInfo) => void;
}

const NewTeamModal: React.FC<NewTeamModalProps> = ({ open, handleClose, handleSave }) => {
  const [teamName, setTeamName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [membersLimit, setMembersLimit] = useState<number>(2);

  const save = () => {
    handleSave({
      teamName,
      description,
      subject,
      membersLimit,
    });
    handleClose();
  };

  useEffect(() => {
    if (!open) {
      setTeamName('');
      setDescription('');
      setSubject('');
      setMembersLimit(2);
    }
  }, [open]);

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
          inputProps={{ min: 2, max: 20 }}
          onChange={(e) => setMembersLimit(parseInt(e.target.value, 10))}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button onClick={save} color="primary" variant="outlined">Submit</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewTeamModal;
