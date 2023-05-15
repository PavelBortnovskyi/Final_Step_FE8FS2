import { createTheme } from '@mui/material';

export const modeTheme = {
  dark: true,
  light: false,
};

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
    text: {
      primary: 'rgba(208,27,27,0.87)',
      secondary: 'rgba(76,97,191,0.6)',
      dark: 'red',
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          // Ваши стили здесь

          '& .MuiTab-root': {
            fontSize: '16px',
          },
        },
        indicator: {
          // Ваши стили здесь
        },
      },
      variants: [
        {
          props: { colorTheme: 'dark' },
          style: {
            // background: 'transparent',
            // color: 'red',
            borderBottom: '1px solid #273340',
            // '&:hover': {
            //   backgroundColor: '#ffffff33',
            //   border: '1px solid #ffffff85',
            // },
            transition: 'all 0.3s ease-out',

            '& .MuiTab-root': {
              textTransform: 'none',
              transition: 'all 0.3s ease-out',
              color: '#8b98a5',
            },
            '& .MuiTab-root:hover': {
              transition: 'all 0.3s ease-out',
              backgroundColor: '#273340',
            },
            '& .MuiTab-root.Mui-selected': {
              color: '#fff',
            },
          },
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          marginTop: '4px !important',
        },
      },
    },
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
