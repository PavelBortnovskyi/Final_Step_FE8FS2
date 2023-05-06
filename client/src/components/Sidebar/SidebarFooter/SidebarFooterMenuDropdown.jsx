import React from 'react';
import { bindMenu } from 'material-ui-popup-state';
import { Box, List, Menu, MenuItem } from '@mui/material';
import styled from '@emotion/styled';


const MenuItemStyled = styled(MenuItem)((props) => ({
    backgroundColor: "rgb(21,32,43)",
    width: '268px',
    padding: '12px',
    '&:hover': {
        backgroundColor: 'rgb(30,39,50)'
    }
}))


export const SidebarFooterMenuDropdown = ({ popupState, username }) => {
    return (
        <Menu {...bindMenu(popupState)}
            sx={{
                left: '-10px',
                top: '-70px',
                color: 'rgb(21,32,43)',
                '& .MuiPopover-paper': {
                    borderRadius: '10px',
                    boxShadow: '2px 1px 10px 0.5px rgb(56, 68, 77)',
                },
                '& .MuiList-padding': {
                    padding: 0,
                    paddingTop: '12px',
                    backgroundColor: "rgb(21,32,43)",
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
