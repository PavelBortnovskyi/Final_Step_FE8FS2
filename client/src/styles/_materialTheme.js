import { createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { getTheme } from 'src/redux/selectors/selectors';
import { useMemo } from 'react';

export const themeSettings = (colorTheme) => {
  return {
    palette: {
      ...(colorTheme === 'dark'
        ? {
          //colors for elements
          primary: {
            main: 'rgb(30, 155, 240)',
            disabled: 'rgb(25,93,142)',
            hover: 'rgb(26,140,216)',
          },
          //text colors
          text: {
            primary: '#fff',
            secondary: 'rgb(139, 152, 165)',
            active: '#fff',
            link: 'rgb(29, 155, 240)',
          },
          //background colors
          background: {
            default: 'rgb(21, 32, 43)',
            additional: 'rgb(39, 51, 64)',
            hover: 'rgb(39,51,64)',
          },
          border: {
            main: '#38444d',
          },
          gray: {
            main: '#eff3f4',
            contrastText: '#fff',
          },
          white: {
            main: '#eff3f4',
            contrastText: '#fff',
          },
          transparent: {
            main: '#eff3f4',
            contrastText: '#000',
          },
          black: {
            main: '#000',
            contrastText: '#fff',
          },
          logo: {
            main: '#FFF',
          },
          border: {
            main: '#4d4d4d',
          },
        }
        : {
          primary: {
            main: 'rgb(30, 155, 240)',
            disabled: 'rgb(25,93,142)',
            hover: 'rgb(26,140,216)',
          },
          text: {
            primary: 'rgb(15, 20, 26)',
            secondary: 'rgb(82, 99, 113)',
            active: 'rgb(15, 20, 25)',
            link: 'rgb(29, 155, 240)',
          },
          background: {
            default: '#fff',
            additional: 'rgb(238, 241, 241)',
            hover: 'rgb(233,232,233)',
          },
          border: {
            main: '#fff',
          },
          gray: {
            main: '#eff3f4',
            contrastText: '#fff',
          },
          white: {
            main: '#eff3f4',
            contrastText: '#fff',
          },
          transparent: {
            main: '#eff3f4',
            contrastText: '#000',
          },
          black: {
            main: '#000',
            contrastText: '#fff',
          },
          logo: {
            main: 'rgb(30, 155, 240)',
          },
          border: {
            main: '#dfdfdf',
          },
        }),
    },
    breakpoints: {
      values: {
        xs: 0, // Extra small devices (e.g., phones)
        sm: 500, // Small devices (e.g., tablets)
        md: 990, // Medium devices (e.g., laptops)
        lg: 1260, // Large devices (e.g., desktops)
        xl: 1920, // Extra large devices
      },
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTab-root': {
              textTransform: 'none',
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
              // borderBottom: '1px solid #273340',
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
  };
};

export const useMode = () => {
  const { colorTheme } = useSelector(getTheme);
  const theme = useMemo(
    () => createTheme(themeSettings(colorTheme)),
    [colorTheme]
  );
  return theme;
};
