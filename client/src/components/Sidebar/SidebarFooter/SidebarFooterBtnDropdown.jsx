import React from 'react';
import { bindTrigger } from 'material-ui-popup-state';
import { Avatar, Box, Button, Hidden, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export const SidebarFooterBtnDropdown = ({ popupState }) => {
    const user = useSelector((state) => state.user.user) || "";
    const fullName = user.fullName || '';
    const FirstName = fullName.length > 12 ? fullName.slice(0, 12) + "..." : fullName;
    
    const userTag = user.userTag || '';
    const userTagPrewiew = userTag.length > 10 ? userTag.slice(0, 10) + "..." : userTag;

    const theme = useTheme();
    return (
        <Button variant="text"
            {...bindTrigger(popupState)}
            sx={{
                px: 1,
                minWidth: '64px',
                maxWidth: '200px',
                height: '64px',
                '&:hover': {
                    backgroundColor: `${theme.palette.background.hover}`,
                    borderRadius: '30px',
                },
                '& > span': {
    display: 'none',
  }
            }}
        >
            <Avatar src={user.avatarImgUrl} />

            <Hidden lgDown>
                <Box ml={1} sx={{ textAlign: 'start' }}>
                    <Typography variant="subtitle1"
                        sx={{
                            textTransform: 'capitalize',
                            color: `${theme.palette.text.active}`,
                            fontSize: '15px',
                            fontWeight: 700,
                        }}
                    >
                        {FirstName} 
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        display="block"
                        sx={{
                            textTransform: 'lowercase',
                            color: `${theme.palette.text.secondary}`,
                            fontSize: '15px',
                            fontWeight: 400,
                        }}
                    >
                        {userTagPrewiew}
                    </Typography>
                </Box>

                {/* <Box
                    ml={2.5}
                    display="flex"
                    alignItems="center"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                        minHeight: '100%',
                    }}
                > */}
                    {/* <Box
                        sx={{
                            alignSelf: 'flex-start',
                            transform: 'translateY(5%)',
                            fontSize: '22px',
                        }}
                        fontWeight="bold"
                    >
                        ...
                    </Box> */}
                {/* </Box> */}
            </Hidden>
        </Button>
    )
}
