"use client"

import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, BottomNavigation, BottomNavigationAction, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import StyledContainer from '@/components/StyledContainer';
import { ExitToApp, Style } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();
  return (
    <StyledContainer>

      {/* Welcome greeting */}
      <Box sx={{ paddingBottom: 2, marginBottom: 2, borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" sx={{lineHeight: '50px'}}>Greetings!</Typography>
          <Typography>Enhance your team projects with our all-in-one collaboration tool.</Typography>
        </Paper>
      </Box>

      {/* Major Schedule */}
      <Box sx={{ paddingBottom: 2, borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5">Major Schedule</Typography>
          <List>
            <ListItem>
              <ListItemText primary="SRS document submission" secondary="Due date: 2024.05.26" />
              <Typography color="error">D-day</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Final Presentation" secondary="Due date: 2024.06.13" />
              <Typography color="textSecondary">D-17</Typography>
            </ListItem>
          </List>
        </Paper>
      </Box>

      <Box sx={{ flexGrow: 1, borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
            <Typography variant="h5">Your Teams</Typography>
            <IconButton color="primary" onClick={() => {router.push('/myteams')}}>
              <ExitToApp />
            </IconButton>
          </Box>
        
          <Box sx={{ mt: 2, "&:hover": {border: 1, bordercolor: 'primary.main'} }} onClick={() => {router.push('/team')}}>
            <Paper elevation={1} sx={{ p: 2, borderLeft: 5, borderColor: 'primary.main' }}>
              <Typography variant="h6">Team 8</Typography>
              <Typography>Introduction to Software Engineering_차수영</Typography>
              <Typography variant="caption">2024년 1학기</Typography>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </StyledContainer>
  );
};

export default Main;
