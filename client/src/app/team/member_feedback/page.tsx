'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Collapse,
  Paper,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

const MemberFeedBack = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedMember, setExpandedMember] = useState(null);

  const handleExpandClick = (member:any) => {
    setExpanded(!expanded);
    setExpandedMember(member === expandedMember ? null : member);
  };

  const feedbackDetails = {
    completion: ['Main interface implement', 'Data research'],
    lateness: ['Word processing'],
    incompletion: ['Team Page Implementation']
  };

  const completionPercentage = 40; // Example completion percentage
  const latenessPercentage = 30; // Example lateness percentage
  const incompletionPercentage = 30; // Example incompletion percentage

  return (
    <Box sx={{ p: 2, flexGrow: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5">Member Feedback</Typography>
        {['Member 1', 'Member 2', 'Member 3'].map((member, index) => (
          <Card key={index} sx={{ mt: 2, borderLeft: 5, borderColor: 'primary.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{member}</Typography>
                <Button onClick={() => handleExpandClick(member)}>
                  {expanded && expandedMember === member ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>
              </Box>
              <Collapse in={expanded && expandedMember === member} timeout="auto" unmountOnExit>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-around' }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                      <CircularProgress variant="determinate" value={100} size={120} thickness={4} sx={{ color: '#e0e0e0' }} />
                      <CircularProgress variant="determinate" value={completionPercentage + latenessPercentage + incompletionPercentage} size={120} thickness={4} sx={{ color: 'black', position: 'absolute', left: 0 }} />
                      <CircularProgress variant="determinate" value={completionPercentage + latenessPercentage} size={120} thickness={4} sx={{ color: 'gray', position: 'absolute', left: 0 }} />
                      <CircularProgress variant="determinate" value={completionPercentage} size={120} thickness={4} sx={{ color: 'white', position: 'absolute', left: 0 }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ width: 16, height: 16, bgcolor: 'white', border: '1px solid black', mr: 1 }}></Box>
                        <Typography>Completion</Typography>
                      </Box>
                      <Box sx={{ pl: 2 }}>
                        {feedbackDetails.completion.map((item, idx) => (
                          <Typography key={idx}>- {item}</Typography>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                        <Box sx={{ width: 16, height: 16, bgcolor: 'gray', border: '1px solid black', mr: 1 }}></Box>
                        <Typography>Lateness</Typography>
                      </Box>
                      <Box sx={{ pl: 2 }}>
                        {feedbackDetails.lateness.map((item, idx) => (
                          <Typography key={idx}>- {item}</Typography>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ width: 16, height: 16, bgcolor: 'black', border: '1px solid black', mr: 1 }}></Box>
                        <Typography>Incompletion</Typography>
                      </Box>
                      <Box sx={{ pl: 2 }}>
                        {feedbackDetails.incompletion.map((item, idx) => (
                          <Typography key={idx}>- {item}</Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </Box>
  );
};

export default MemberFeedBack;
