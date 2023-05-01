import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


export const SidebarFooter = ({ displayName, username }) => {
    return (

        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="text"
                        {...bindTrigger(popupState)}
                        sx={{
                            position: 'absolute',
                            top: '92vh',
                            left: '10%',
                            '&:hover': {
                                backgroundColor: 'rgb(39,51,64)',
                                borderRadius: '30px',
                            }
                        }}
                    >
                        <Avatar src="./img/avatar2.JPG" />

                        <Box ml={1}>
                            <Typography
                                variant="subtitle1"
                                align="start"
                                sx={{
                                    textTransform: 'capitalize',
                                }}
                            >
                                {displayName}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                display="block"
                                align="start"
                                sx={{
                                    textTransform: 'lowercase',
                                    color: 'rgb(139,152,165)'
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
                                display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%'
                            }}
                        >
                            ...
                        </Typography>
                    </Button>


                    <Menu {...bindMenu(popupState)}
                        sx={{
                            left: '10px',
                            top: '-70px',
                            color: 'rgb(21,32,43)',
                            
                            '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0)'
                                }
                            // backgroundColor: "rgb(21,32,43)"
                        }}
                    >
                        <MenuItem
                            onClick={popupState.close}
                            sx={{
                                backgroundColor: 'red',
                                // backgroundColor: "rgb(21,32,43)",
                                color: 'rgb(139,152,165)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0)'
                                }
                            }}
                        >
                            Add an existing account
                        </MenuItem>
                        <MenuItem
                            onClick={popupState.close}
                            sx={{
                                backgroundColor: "rgb(21,32,43)",
                                color: 'rgb(139,152,165)',
                                // '&:hover': {
                                //     backgroundColor: 'rgba(0, 0, 0, 0)'
                                // }
                            }}
                        >
                            Log out @{username}
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>




    )
}
