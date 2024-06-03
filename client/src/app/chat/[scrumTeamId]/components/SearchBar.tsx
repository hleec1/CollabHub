"use client"

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { MessageType } from '../mockups/messages';
import { useEffect, useState } from 'react';

interface Props {
  messages: MessageType[];
  onSearchResults: (filteredMessages: MessageType[], searchValue: string) => void;
}

const Search = styled('div')(({ theme }) => ({
    borderRadius: '5px',
    backgroundColor: '#EDEDED',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: '20px',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function SearchBar({messages, onSearchResults}: Props) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchButtonClick = () => {
    if (searchValue.trim().length > 0) {
      const filteredMessages = messages.filter(message =>
        message.content.toLowerCase().includes(searchValue.toLowerCase())
      );
      onSearchResults(filteredMessages, searchValue);
    } else {
      onSearchResults([], ""); 
    }
  };

    return (
        <Search>
          <StyledInputBase
            placeholder="Search Messages"
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIconWrapper onClick={handleSearchButtonClick}>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
    )
}