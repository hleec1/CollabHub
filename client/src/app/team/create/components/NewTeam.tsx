"use client"

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton, Tooltip, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import NewTeamModal from './NewTeamModal';

interface TeamInfo {
  teamName: string;
  description: string;
  subject: string;
  membersLimit: number;
  teamAccessCode: string;
  creationDate: string;
  members: { name: string, photo: string, studentId: string }[];
}

const NewTeam: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamName: '',
    subject: '',
    description: '',
    membersLimit: 0,
    teamAccessCode: '',
    creationDate: new Date().toLocaleDateString(),
    members: [
      { name: 'Tony Stark', photo: 'https://example.com/photo-tony.jpg', studentId: '2021010101' },
      { name: 'Steve Rogers', photo: 'https://example.com/photo-steve.jpg', studentId: '2021010101' }
    ]
  });

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSave = (updatedInfo: Partial<TeamInfo>) => setTeamInfo({ ...teamInfo, ...updatedInfo });

  const generateAccessCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTeamInfo(prev => ({ ...prev, teamAccessCode: newCode }));
  };

  const copyAccessCodeToClipboard = () => {
    const teamLink = window.location.href;
    const fullText = `Access Code: ${teamInfo.teamAccessCode || 'No Code Generated'}\nLink: ${teamLink}`;
    navigator.clipboard.writeText(fullText);
  };

  useEffect(() => {
    generateAccessCode();
  }, []);

  return (
    <Box sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      width: '100%',
    }}>
      <Box sx={{ width: '100%', maxWidth: 500, marginBottom: 2, marginTop: 5  }}>
        <NewTeamModal 
          open={isModalOpen} 
          handleClose={handleCloseModal} 
          handleSave={(newTeamInfo) => {
            setTeamInfo({ ...teamInfo, ...newTeamInfo });
          }}
        />
        <Typography variant="h6" sx={{ color: 'black', marginBottom: 1, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
         Created Team Info.
        </Typography>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingInlineEnd: 5 }}>
          Team Name <Typography component="span" sx={{ color: 'black' }}>{teamInfo.teamName}</Typography>
        </Typography>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingInlineEnd: 5 }}>
          Subject <Typography component="span" sx={{ color: 'black' }}>{teamInfo.subject}</Typography>
        </Typography>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingInlineEnd: 5 }}>
          Description <Typography component="span" sx={{ color: 'black' }}>{teamInfo.description}</Typography>
        </Typography>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingInlineEnd: 5 }}>
          Limited Number of Members 
          <Typography component="span" sx={{ color: 'black' }}>{teamInfo.membersLimit}</Typography>
        </Typography>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingInlineEnd: 5 }}>
          Created on
        </Typography>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 500, marginBottom: 2 }}>
      </Box>
      <Box sx={{
        width: '100%',
        maxWidth: 500,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 2
      }}>
        <Typography variant="h6" sx={{ color: 'black', flexGrow: 1, textAlign: 'left', fontWeight: 'bold' }}>
          Team Access Code
        </Typography>
        <Typography sx={{ color: 'black', flexGrow: 1, textAlign: 'center' }}>
          {teamInfo.teamAccessCode || 'No Code Generated'}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', paddingInlineEnd: 5 }}>
          <Tooltip title="Copy to Clipboard">
            <IconButton onClick={copyAccessCodeToClipboard} color="primary">
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Button variant="outlined" color="primary" sx={{ marginRight: 5, marginTop:5, color: 'black' , fontSize: 15 }}>
        Go to the main page of the team
      </Button>
    </Box>
  );
};

export default NewTeam;