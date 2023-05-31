import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, useTheme } from '@mui/material'
import React from 'react'
import { UserInformationBlock } from '../User/UserInformationBlock'
import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton'
import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher'
import { DropdownFooterSelect } from '../Sidebar/SidebarDropdown/DropdownFooterSelect'
import { Link, NavLink } from 'react-router-dom'
import { selectElements } from '../Sidebar/SidebarDropdown/DropdownElements'
import { SidebarMobileElements } from './SidebarMobileElements'

export const SidebarMobile = ({ isOpen, setIsOpen }) => {
  const theme = useTheme();
  return (
    <SwipeableDrawer
      anchor='left'
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: `${theme.palette.background.default}`,
        }
      }}
    >
      <Box
        role="presentation"
        onClick={() => setIsOpen(false)}
        onKeyDown={() => setIsOpen(false)}
        sx={{ width: '75vw' }}
      >
        <Box sx={{ m: '16px' }}>
          <UserInformationBlock w="40" h="40" mt="0" />
        </Box>

        <List>
          {SidebarMobileElements.map((navElement) => (
            <Link
              to={navElement.route}
              underline="none"
              key={navElement.id}
              component={NavLink}
            >
              <ListItem key={navElement.id} disablePadding>
                <ListItemButton sx={{
                  '&:hover': {
                    backgroundColor: `${theme.palette.background.hover}`,
                    borderRadius: '30px',
                  },
                }}>
                  <ListItemIcon>
                    <navElement.icon sx={{ fontSize: 30, color: `${theme.palette.text.primary}`, }} />
                  </ListItemIcon>
                  <ListItemText primary={navElement.label} sx={{ color: `${theme.palette.text.primary}`, }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '4px 0' }}>
          <LogoutButton />
          <ThemeSwitcher />
        </Box>
        <List sx={{ padding: 0 }}>
          {
            selectElements.map(selectEl => (
              <DropdownFooterSelect
                key={selectEl.id}
                mainLabel={selectEl.label}
                selects={selectEl.selects}
              />
            ))
          }
        </List>
      </Box>
    </SwipeableDrawer>
  )
}
