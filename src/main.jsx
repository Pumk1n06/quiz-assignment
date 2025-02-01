import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './styles/App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Purple color scheme
    },
    secondary: {
      main: '#03dac6', // Teal accent color
    },
    background: {
      default: '#f0f0f0',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
