import TwitterIcon from '@mui/icons-material/Twitter';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainSidebarElemets } from './sidebarElemets';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { SidebarDropdown } from './SidebarDropdown/SidebarDropdown';
import { BtnTweet } from './BtnTweet/BtnTweet';
import SmallBtnTweet from './SmallBtnTweet/SmallBtnTweet';





export const Sidebar = () => {

  return (
    <Drawer
      variant="permanent"
      anchor="left"

      sx={{
        flexShrink: 0,
        marginRight: '12px',
        width: '100%',
        height: '100vh',
        '& .MuiDrawer-paper': {
          position: 'relative',
          width: '100%',
          border: 'none',
          boxSizing: 'border-box',
          backgroundColor: 'rgb(21,32,43)',
        },
      }}
    >

      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'end',
        marginBottom: '18px',
        textAlign: 'start',
        mx: '10px',
      }}>

        <Box>
          <Link href='/'
            display="flex" justifyContent="center" alignItems="center"
            sx={{
              width: '50px',
              height: '50px',
              ml: '10px',
              mt: '2px',
              color: '#FFF',
              '&:hover': {
                backgroundColor: 'rgb(39,51,64)',
                borderRadius: '30px',
              },
            }}
          >
            <TwitterIcon
              sx={{
                fontSize: 34,
              }}
            />
          </Link>


          <List
            sx={{
              // mx: '10px',
            }}
          >
            {mainSidebarElemets.map((navElement) => (
              <Link href={navElement.route} underline="none" key={navElement.id}>
                <ListItem key={navElement.id} disablePadding sx={{ color: '#FFF' }}>
                  <ListItemButton
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgb(39,51,64)',
                        borderRadius: '30px',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <navElement.icon sx={{ fontSize: 30, color: '#FFF' }} />
                    </ListItemIcon>

                    <ListItemText primaryTypographyProps={{ fontSize: '18px', }}
                      sx={{
                        display: { lg: 'block', xs: 'none' }
                      }}
                      primary={navElement.label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}

            <SidebarDropdown />

            <BtnTweet />

            <SmallBtnTweet />


          </List>
        </Box>

        <SidebarFooter displayName="Алексей SlaAll00" username="slaall00" />
      </Box>
    </Drawer>

  );
};
