import React from 'react';
import { bindTrigger } from 'material-ui-popup-state';
import { Avatar, Box, Button, Hidden, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

export const SidebarFooterBtnDropdown = ({ popupState, displayName, username }) => {
    const theme = useTheme();

    return (
        <Button variant="text"
            {...bindTrigger(popupState)}
            sx={{
                px: 1,
                minWidth: '64px',
                height: '64px',
                '&:hover': {
                    backgroundColor: `${theme.palette.background.hover}`,
                    borderRadius: '30px',
                }

            }}
        >
            <Avatar src="./img/avatar2.JPG" />

            <Hidden lgDown>
                <Box ml={1} sx={{textAlign: 'start'}}>
                    <Typography variant="subtitle1"
                        sx={{
                            textTransform: 'capitalize',
                            color: `${theme.palette.text.active}`,
                            fontSize: '15px',
                            fontWeight: 700,
                        }}
                    >
                        {displayName}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        display="block"
                        sx={{
                            textTransform: 'lowercase',
                            color: `${theme.palette.text.primary}`,
                            fontSize: '15px',
                            fontWeight: 400,
                        }}
                    >
                        @{username}
                    </Typography>
                </Box>

                <Box
                    ml={2.5}
                    display="flex"
                    alignItems="center"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                        minHeight: '100%',
                    }}
                >
                    <Box
                        sx={{
                            alignSelf: 'flex-start',
                            transform: 'translateY(5%)',
                            fontSize: '22px',
                        }}
                    >
                        ...
                    </Box>
                </Box>
            </Hidden>
        </Button>
    )
}
