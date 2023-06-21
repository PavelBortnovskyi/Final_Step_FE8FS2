import { Box, Divider, List, SwipeableDrawer, useTheme } from '@mui/material'
import React from 'react'
import { UserInformationBlock } from '../User/UserInformationBlock'
import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton'
import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher'
// import { DropdownFooterSelect } from '../Sidebar/SidebarDropdown/DropdownFooterSelect'
// import { selectElements } from '../Sidebar/SidebarDropdown/DropdownElements'
import { SidebarMobileElements } from './SidebarMobileElements'
import { useSelector } from 'react-redux'
import { LinkToEditProfile } from '../User/LinkToEditProfile'
import { SidebarMobileBtn } from './SidebarMobileBtn'

export const SidebarMobile = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.user.user) || "";
  const editProfile = <LinkToEditProfile />;
  const lincToFollowings = "/followings";
  const lincToFollowers = "/followers";
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
          <UserInformationBlock
            w={"40"}
            h={"40"}
            mt={"0"}
            userButton={editProfile}
            userAvatar={user.avatarImgUrl}
            fullName={user.fullName}
            userTag={user.userTag}
            userBio={user.userBio}
            userLocation={user.userLocation}
            lincToFollowers={lincToFollowers}
            lincToFollowings={lincToFollowings}
            // createdAt={createdAt}
            countUserFollowings={user.countUserFollowings}
            countUserFollowers={user.countUserFollowers}
          />
        </Box>

        <List>
          {SidebarMobileElements.map((navElement) => (
            <SidebarMobileBtn navElement={navElement} key={navElement.id}/>
          ))}
        </List>

        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '4px 0' }}>
          <LogoutButton />
          <ThemeSwitcher />
        </Box>
        {/* <List sx={{ padding: 0 }}>
          {
            selectElements.map(selectEl => (
              <DropdownFooterSelect
                key={selectEl.id}
                mainLabel={selectEl.label}
                selects={selectEl.selects}
              />
            ))
          }
        </List> */}
      </Box>
    </SwipeableDrawer>
  )
}
