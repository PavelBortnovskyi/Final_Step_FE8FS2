import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1d9bf0',
      contrastText: '#fff',
    },
    transparent: {
      main: '#eff3f4',
      contrastText: '#000',
    },
    white: {
      main: '#eff3f4',
      contrastText: '#fff',
    },
    gray: {
      main: '#eff3f4',
      contrastText: '#fff',
    },
    black: {
      main: '#000',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: { color: 'transparent' },
          style: {
            background: 'transparent',
            color: '#fff',
            border: '1px solid #fff',
            '&:hover': {
              backgroundColor: '#ffffff33',
              border: '1px solid #ffffff85',
            },
          },
        },
        {
          props: { color: 'white' },
          style: {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#273340',
              border: '1px solid transparent',
            },
          },
        },
        {
          props: { color: 'gray' },
          style: {
            backgroundColor: '#eff3f4',
            border: '1px solid transparent',
            color: '#000',
            '&:hover': {
              backgroundColor: '#d3d3d3f5',
              border: '1px solid transparent',
            },
          },
        },
        {
          props: { color: 'black' },
          style: {
            backgroundColor: '#000',
            border: '1px solid transparent',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#777',
              border: '1px solid transparent',
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: { color: 'transparent' },
          style: {
            background: 'transparent',
            color: '#fff',
            border: '1px solid #fff',
            '&:hover': {
              backgroundColor: '#ffffff33',
              border: '1px solid #ffffff85',
            },
          },
        },
        {
          props: { color: 'white' },
          style: {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#273340',
              border: '1px solid transparent',
            },
          },
        },
        {
          props: { color: 'gray' },
          style: {
            backgroundColor: '#eff3f4',
            border: '1px solid transparent',
            color: '#000',
            '&:hover': {
              backgroundColor: '#d3d3d3f5',
              border: '1px solid transparent',
            },
          },
        },
        {
          props: { color: 'black' },
          style: {
            backgroundColor: '#000',
            border: '1px solid transparent',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#777',
              border: '1px solid transparent',
            },
          },
        },
      ],
    },
  },
});
