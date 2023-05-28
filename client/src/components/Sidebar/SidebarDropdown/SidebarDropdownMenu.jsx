import React from 'react';
import { dropdownElements } from './DropdownElements';
import { DropdownHeader } from './DropdownHeader';
import { Box, Menu } from '@mui/material';
import { bindMenu } from 'material-ui-popup-state';
import styled from '@emotion/styled';
import { DropdownFooterSelect } from './DropdownFooterSelect';
import { selectElements } from './DropdownElements';
import { ThemeSwitcher } from 'src/UI/ThemeSwitcher/ThemeSwitcher';
import { LogoutButton } from 'src/UI/LogoutButton/LogoutButton';

const MenuStyled = styled(Menu)(({ theme }) => ({
    left: 0,
    top: '-260px',
    '& .MuiPopover-paper': {
        borderRadius: '10px',
        boxShadow: '2px 1px 10px 0.5px rgb(56, 68, 77)',
    },
    '& .MuiList-padding': {
        padding: 0,
        backgroundColor: `${theme.palette.background.default}`,
    },
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }
}))



export const SidebarDropdownMenu = ({ popupState, isAuthenticated }) => {

    return (
        <MenuStyled {...bindMenu(popupState)}>

            <Box sx={{ borderBottom: '1px solid rgb(56, 68, 77)' }}>
                {
                    dropdownElements.map(dropdownEl => (
                        <DropdownHeader key={dropdownEl.id}
                            dropdownEl={dropdownEl}
                            popupState={popupState}
                        />
                    ))
                }
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '4px 0' }}>
                <LogoutButton />
                <ThemeSwitcher />
            </Box>

            {
                selectElements.map(selectEl => (
                    <DropdownFooterSelect
                        key={selectEl.id}
                        mainLabel={selectEl.label}
                        selects={selectEl.selects}
                    />
                ))
            }

        </MenuStyled>
    )
}
