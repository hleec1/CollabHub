'use client';

import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Button, IconButton } from '@mui/material';
import { Chat, ExitToApp, Home, People, Person } from '@mui/icons-material';
import styled from '@emotion/styled';
import StyledContainer from '@/components/StyledContainer';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const Container = styled(Box)({
  padding: '16px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  marginBottom: '60px'
});

const Section = styled(Paper)({
  marginBottom: '16px',
  padding: '16px',
  width: '100%'
});


const Team = () => {
  const router = useRouter();

  return (
    <StyledContainer>
      <Section>
        <Box display="flex" justifyContent="flex-end" marginBottom="16px">
          <IconButton sx={{width: '30px', height: '30px'}} onClick={() => {router.push('/team/1/management')}}>
            <SettingsIcon/>
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="left" alignItems="top" marginBottom="8px">
          <Typography variant="subtitle1" gutterBottom color="textSecondary" width={'35%'}>
            Subject
          </Typography>
          <Typography variant="body1" width={'60%'}>Introduction to Software Engineering</Typography>
        </Box>

        <Box display="flex" justifyContent="left" alignItems="top">
          <Typography variant="subtitle1" gutterBottom color="textSecondary" width={'35%'}>
            Description
          </Typography>
          <Typography variant="body2" width={'60%'}>
            Conducting a project to develop an app that can assist with school life throughout the semester.
          </Typography>
        </Box>
      </Section>

      <Section>
        <Box display="flex" justifyContent="flex-end" marginBottom="16px">
        </Box>
        <Box display="flex" justifyContent="left" alignItems="top">
          <Typography variant="subtitle1" gutterBottom color="textSecondary" width={'35%'}>
            Team Members
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
        <List>
          <ListItem>
            <ListItemText
              primary="Hyun Jun Lee"
              secondary="2019310995"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Se Ra Choi"
              secondary="2021312988"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="In Seo Nam"
              secondary="2019312643"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="In Jin Young"
              secondary="2017311575"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Jimin Choi"
              secondary="2020314014"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Jiyun Im"
              secondary="2020310332"
            />
          </ListItem>
        </List>
        </Box>
      </Section>

      <Section onClick={() => {router.push('/chat/1')}}>   {/* teamID는 임시로 1로 설정 */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Chat />
            <Typography variant="body1" marginLeft={1}>Team 8&apos;s Chat room</Typography>
          </Box>
          <Typography variant="h6">8</Typography>
        </Box>
        <Typography variant="body2">Lastest message content...</Typography>
      </Section>

      <Section>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
          <Typography variant="h6">Upcoming events</Typography>
          <IconButton color="primary" onClick={() => {router.push('/scheduler')}}>
            <ExitToApp />
          </IconButton>
        </Box>
        <List>
          <ListItem>
            <ListItemText
              primary="SRS document submission"
              secondary="Due date: 2024.05.26"
            />
            <Typography variant="body2" color="error">
              D-day
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Final Presentation"
              secondary="Due date: 2024.06.13"
            />
            <Typography variant="body2" color="textSecondary">
              D-17
            </Typography>
          </ListItem>
        </List>
      </Section>

      <Section>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
          <Typography variant="h6">Scheduled meeting</Typography>
          <IconButton color="primary" onClick={() => {router.push('/scheduler')}}>
            <ExitToApp />
          </IconButton>
        </Box>
        <List>
          <ListItem>
            <ListItemText
              primary="About Making Final Presentation"
              secondary="Due date: 2024.06.03"
            />
            <Typography variant="body2" color="textSecondary">
              D-1
            </Typography>
          </ListItem>
        </List>
      </Section>

      <Section>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
          <Typography variant="h6">My todos</Typography>
          <IconButton color="primary" onClick={() => {router.push('/task_manager')}}>
            <ExitToApp />
          </IconButton>
        </Box>
        <List>
          <ListItem>
            <ListItemText
              primary="SRS document writing"
              secondary="Due date: 2024.05.26"
            />
            <Typography variant="body2" color="success">
              Done
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Task Manager implementation"
              secondary="Due date: 2024.06.13"
            />
            <Typography variant="body2" color="primary">
              In progress
            </Typography>
          </ListItem>
        </List>
      </Section>
      <Section>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
          <Typography variant="h6">Member Feedback</Typography>

        </Box>
        <Box display="flex" justifyContent="flex-end" marginTop="8px">
          <Button variant="contained" color="primary" fullWidth onClick={() => {router.push('/team/member_feedback')}}>
            Go to Member Feedback page
          </Button>
        </Box>
      </Section>

    </StyledContainer>
  );
};

export default Team;
