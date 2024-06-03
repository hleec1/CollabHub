"use client"

import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import TeamInfoEdit from './TeamInfoEdit';

interface Member {
  name: string;
  photo: string;
  studentId: string;
}

interface TeamInfo {
  teamName: string;
  subject: string;
  description: string;
  membersLimit: number;
  teamAccessCode: string;
  members: Member[];
}

const TeamManagement: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamName: 'Team 8 Software Engineering',
    subject: 'Software Engineering',
    description: 'Conducting a project to develop an app that can assist with school life throughout the semester.',
    membersLimit: 6,
    teamAccessCode: '',
    members: [
      { name: "Hyun Jun Lee", photo: 'https://example.com/photo-tony.jpg', studentId: '2019310995' },
      { name: 'Se Ra Choi', photo: 'https://example.com/photo-steve.jpg', studentId: '2021312988' },
      { name: 'In Seo Nam', photo: 'https://example.com/photo-tony.jpg', studentId: '2019312643' },
      { name: 'In Jin Young', photo: 'https://example.com/photo-steve.jpg', studentId: '2017311575' },
      { name: 'Jimin Choi', photo: 'https://example.com/photo-steve.jpg', studentId: '2020314014' },
      { name: 'Jiyun Im', photo: 'https://example.com/photo-steve.jpg', studentId: '2020310332' }
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
    navigator.clipboard.writeText(teamInfo.teamAccessCode || 'No Code Generated');
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
      <Box sx={{ width: '100%', maxWidth: 500, marginBottom: 2 }}>
        <TeamInfoEdit 
          open={isModalOpen} 
          handleClose={handleCloseModal} 
          handleSave={handleSave}
          teamInfo={teamInfo}
        />
        <Typography variant="h6" sx={{ color: 'black', marginBottom: 1 , display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>Team Info.
        <Tooltip title="Edit Team Info">
          <IconButton onClick={handleOpenModal} color="primary" sx={{ marginBottom: 2 , marginRight: 1}}>
            <EditIcon />
          </IconButton>
        </Tooltip></Typography>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between',marginBottom: 2, paddingInlineEnd: 2}}>
          Team Name <Typography component="span" sx={{ color: 'black'}}>{teamInfo.teamName}</Typography>
        </Typography>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2,  paddingInlineEnd: 2}}>
          Subject <Typography component="span" sx={{ color: 'black', }}>{teamInfo.subject}</Typography>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingInlineEnd: 5 }}>Description</Typography>
          <Typography component="span" sx={{ color: 'black', whiteSpace: 'pre-line', wordBreak: 'break-word', lineHeight: '1.5', maxWidth:200 }}>
            {teamInfo.description}
          </Typography>
        </Box>
        <Typography sx={{ color: 'gray', display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingInlineEnd: 2 }}>
          Limited Number of Members 
          <Typography component="span" sx={{ color: 'black' }}>{teamInfo.membersLimit}</Typography>
        </Typography>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 500, marginBottom: 2 }}>
      <Typography variant="h6" sx={{ color: 'black', marginBottom: 1 , textAlign: 'left', fontWeight: 'bold'}}>Members</Typography>
      <Box sx={{
  width: '88%',
  maxWidth: 500,
  border: '1px solid lightgray',
  padding: 2,
  marginBottom: 2,
  maxHeigh: '400px', 
  overflowY: 'auto' ,
  borderRadius: '20px' 
}}>
  <List>
    {teamInfo.members.map((member, index) => (
      <ListItem key={index} sx={{
        backgroundColor: '#f7f7f7', 
        marginBottom: '8px',
        borderRadius: '4px' 
      }}>
        <ListItemAvatar>
          <Avatar src={member.photo} />
        </ListItemAvatar>
        <ListItemText primary={member.name} secondary={`ID: ${member.studentId}`} />
      </ListItem>
    ))}
  </List>
</Box>
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
  <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', paddingInlineEnd: 5  }}>
    <Tooltip title="Copy to Clipboard">
      <IconButton onClick={copyAccessCodeToClipboard} color="primary">
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  </Box>
</Box>
    </Box>
  );
};

export default TeamManagement;
