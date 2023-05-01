import TwitterIcon from '@mui/icons-material/Twitter';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainSidebarElemets } from './sidebarElemets';
import Link from '@mui/material/Link';
import { Avatar, Box, Stack, Toolbar } from '@mui/material';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { SidebarDropdownMenu } from './SidebarDropdownMenu/SidebarDropdownMenu';
import Button from '@mui/material/Button';













export const Sidebar = () => {
  const drawerWidth = 264;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(21,32,43)',
          // position: 'fixed',
          // height: '100vh',
          // top: 0,
          // left: 0,
        },
      }}
    >

      <Box sx={{
        height: '100vh',
      }}>
        <Link href='/'
          display="flex" justifyContent="center" alignItems="center"
          sx={{
            width: '50px',
            height: '50px',
            ml: '20px',
            mt: '2px',
            '&:hover': {
              backgroundColor: 'rgb(39,51,64)',
              borderRadius: '30px',
            }
          }}
        >
          <TwitterIcon sx={{
            fontSize: 34,
          }}
          />
        </Link>
        <Divider />
        <List
          sx={{
            mx: '10px'
          }}
        >
          {mainSidebarElemets.map((navElement) => (
            <Link href={navElement.route}
              underline="none"
            >
              <ListItem key={navElement.id} disablePadding>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgb(39,51,64)',
                      borderRadius: '30px',
                    }
                  }}
                >
                  <ListItemIcon sx={{ fontSize: 30 }}>
                    <navElement.icon sx={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontSize: '18px', width: '176px' }} primary={navElement.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}

          <SidebarDropdownMenu />

            <Button variant="contained"
            size="large"
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                width: '230px',
                height: '50px',
                marginTop: '20px',
                marginLeft: '10px',
                color: '#FFFF',
                backgroundColor: 'rgb(30,155,240)',
                borderRadius: "30px",
                textTransform: 'capitalize',

                '&:hover': {
                  backgroundColor: 'rgb(26, 140, 216)'
                }
              }}
            >
              Tweet
            </Button>
        </List>




        {/* <Toolbar/>
        <Divider /> */}

        <SidebarFooter
          displayName="Алексей SlaAll00"
          username="slaall00"
        />
      </Box>
    </Drawer>






  );
};








