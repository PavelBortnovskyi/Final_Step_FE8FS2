import React from 'react';
import { bindMenu } from 'material-ui-popup-state';
import { Box, Menu, MenuItem, styled, useTheme } from '@mui/material';
import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher';
import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'src/redux/thunk/logoutUser';


const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
    backgroundColor: `${theme.palette.background.default}`,
    width: '268px',
    padding: '12px',
    '&:hover': {
        backgroundColor: `${theme.palette.background.hover}`,
    }
}))


export const SidebarFooterMenuDropdown = ({ popupState }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user) || "";

    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate('/');
        // Закрытие меню
        popupState.close();
    };


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

            <Box sx={{ borderTop: '1px solid rgb(56, 68, 77)' }}>

                <MenuItemStyled>
                    <ThemeSwitcher />
                </MenuItemStyled>

                <MenuItemStyled onClick={handleLogOut}>
                    <strong>Log out {user.userTag}</strong>
                </MenuItemStyled>
            </Box>

        </Menu>
    )
}
