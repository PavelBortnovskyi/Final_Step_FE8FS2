import React from 'react';
import { bindTrigger } from 'material-ui-popup-state';
import { Avatar, Box, Button, Hidden, Typography } from '@mui/material';

export const SidebarFooterBtnDropdown = ({ popupState, displayName, username }) => {
    return (
        <Button variant="text"
            {...bindTrigger(popupState)}
            sx={{
                marginRight: '4px',
                '&:hover': {
                    backgroundColor: 'rgb(39,51,64)',
                    borderRadius: '30px',
                }
                
            }}
        >
            <Avatar src="./img/avatar2.JPG" />

            <Hidden lgDown>
                <Box ml={1} sx={{
                    // textAlign: 'start',
                }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textTransform: 'capitalize',
                            color: '#FFF',
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
                            color: 'rgb(139,152,165)',
                            fontSize: '15px',
                            fontWeight: 400,
                        }}
                    >
                        @{username}
                    </Typography>
                </Box>

                <Typography
                    ml={2.5}
                    variant="h5"
                    display="block"
                    sx={{
                        color: '#FFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%'
                    }}
                >
                    ...
                </Typography>
            </Hidden>
        </Button>
    )
}
