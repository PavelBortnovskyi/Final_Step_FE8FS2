import React from 'react';
import { dropdownElements } from './DropdownElements';
import { DropdownHeader } from './DropdownHeader';
import { Box, Menu } from '@mui/material';
import { bindMenu } from 'material-ui-popup-state';
import styled from '@emotion/styled';
import { DropdownFooterSelect } from './DropdownFooterSelect';
import { selectElements } from './DropdownElements';



const MenuStyled = styled(Menu)((props) => ({
    left: 0,
    top: '-260px',
    color: 'rgb(21,32,43)',
    '& .MuiPopover-paper': {
        borderRadius: '10px',
        boxShadow: '2px 1px 10px 0.5px rgb(56, 68, 77)',
    },
    '& .MuiList-padding': {
        padding: 0,
        backgroundColor: "rgb(21,32,43)",
    },
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }
}))

export const SidebarDropdownMenu = ({ popupState }) => {
    return (
        <MenuStyled {...bindMenu(popupState)}>

            <Box sx={{ borderBottom: '1px solid rgb(56, 68, 77)', color: '#FFF' }}>
                {
                    dropdownElements.map(dropdownEl => (
                        <DropdownHeader key={dropdownEl.id}
                            dropdownEl={dropdownEl}
                            popupState={popupState}
                        />
                    ))
                }
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
