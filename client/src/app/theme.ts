'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
        dark: '#092412',
        main: '#0E341B',
        light: '#3e5c48',
        contrastText: '#F2F2F2',
    },
    secondary: {
        dark: '#628a2c',
        main: '#8DC63F',
        light: '#a3d165',
        contrastText: '#092412'
    }
  }
});

export default theme;
