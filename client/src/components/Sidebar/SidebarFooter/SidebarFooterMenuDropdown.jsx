import React from 'react';
import { bindMenu } from 'material-ui-popup-state';
import { Box, Menu, MenuItem, styled, useTheme } from '@mui/material';



export const SidebarFooterMenuDropdown = ({ popupState, username }) => {
    const theme = useTheme();

    const MenuItemStyled = styled(MenuItem)((props) => ({
        backgroundColor: `${theme.palette.background.default}`,
        width: '268px',
        padding: '12px',
        '&:hover': {
            backgroundColor: `${theme.palette.background.hover}`,
        }
    }))


    return (
        <Menu {...bindMenu(popupState)}
            sx={{
                left: '-10px',
                top: '-70px',
                color: `${theme.palette.text.primary}`,
                '& .MuiPopover-paper': {
                    borderRadius: '10px',
                    boxShadow: '2px 1px 10px 0.5px rgb(56, 68, 77)',
                },
                '& .MuiList-padding': {
                    padding: 0,
                    paddingTop: '12px',
                    backgroundColor: `${theme.palette.background.default}`,
                },
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                }
            }}
        >

            <Box sx={{ borderTop: '1px solid rgb(56, 68, 77)'}}>
            
                <MenuItemStyled onClick={popupState.close}>
                    Add an existing account
                </MenuItemStyled>

                <MenuItemStyled onClick={popupState.close}>
                    Log out @{username}
                </MenuItemStyled>
            </Box>

        </Menu>
    )
}
