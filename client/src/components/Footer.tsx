'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RoofingIcon from '@mui/icons-material/Roofing';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { styled, useTheme } from '@mui/material/styles';

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
}));
  
export default function Footer() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
    
  return (
    <Box sx={{ 
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
        }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ 
            backgroundColor: theme.palette.primary.main,
        }}
      >
        <StyledBottomNavigationAction label="Home" icon={<RoofingIcon />}/>
        <StyledBottomNavigationAction label="Teams" icon={<GroupsIcon />} />
        <StyledBottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}