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



export const Sidebar = () => {
  const drawerWidth = 260;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(21,32,43)',

        },
      }}
      variant="permanent"
      anchor="left"
    >
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
                {/* не работает фонт сайз */}
                <ListItemIcon sx={{ fontSize: 30 }}>
                  <navElement.icon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '18px', width: '176px' }} primary={navElement.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>


    // <div className={styles.Header__row}>
    //   <div className={styles.Header_wrapper}>
    //     <div className={styles.Header_wrapper__logo}>
    //       <TwitterIcon sx={{ fontSize: 34 }}/>
    //     </div>





    //     <HeaderMenu />
    //   </div>

    // </div>
  );
};








