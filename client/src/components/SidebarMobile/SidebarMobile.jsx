// import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, useTheme } from '@mui/material'
// import React from 'react'
// import { UserInformationBlock } from '../User/UserInformationBlock'
// import { SidebarMobileElements } from '../MainPage_header/SidebarMobile/SidebarMobileElements'
// import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton'
// import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher'
// import { selectElements } from '../Sidebar/SidebarDropdown/DropdownElements'
// import { DropdownFooterSelect } from '../Sidebar/SidebarDropdown/DropdownFooterSelect'

// export const SidebarMobile = ({toggleDrawer}) => {
//   const theme = useTheme();
//   return (
//     <SwipeableDrawer
//       anchor='left'
//       open={state['left']}
//       onClose={toggleDrawer('left', false)}
//       onOpen={toggleDrawer('left', true)}
//       sx={{
//         '& .MuiDrawer-paper': {
//           backgroundColor: `${theme.palette.background.default}`,
//         }
//       }}
//     >
//       <Box

//         role="presentation"
//         onClick={toggleDrawer('left', false)}
//         onKeyDown={toggleDrawer('left', false)}
//         sx={{ width: '75vw' }}
//       >
//         <Box sx={{ m: '16px' }}>
//           <UserInformationBlock w="40" h="40" mt="0" />
//         </Box>

//         <List>
//           {SidebarMobileElements.map((navElement) => (
//             <ListItem key={navElement.id} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <navElement.icon sx={{ fontSize: 30, color: `${theme.palette.text.primary}`, }} />
//                 </ListItemIcon>
//                 <ListItemText primary={navElement.label} sx={{ color: `${theme.palette.text.primary}`, }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>

//         <Divider />
//         <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '4px 0' }}>
//           <LogoutButton />
//           <ThemeSwitcher />
//         </Box>
//         <List sx={{ padding: 0 }}>
//           {
//             selectElements.map(selectEl => (
//               <DropdownFooterSelect
//                 key={selectEl.id}
//                 mainLabel={selectEl.label}
//                 selects={selectEl.selects}
//               />
//             ))
//           }
//         </List>
//       </Box>
//     </SwipeableDrawer>
//   )
// }
