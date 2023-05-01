import { ListItemIcon, MenuItem } from '@mui/material'
import React from 'react'

export const DropdownHeader = ({dropdownEl, popupState}) => {
    return (
        <MenuItem
            onClick={popupState.close}
            sx={{
                width: '286px',
                padding: '16px',
                fontSize: '20px',
                fontWeight: '700',
                backgroundColor: "rgb(21,32,43)",
                // color: 'rgb(139,152,165)',
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: 'rgb(30,39,50)'
                }
            }}
        >

            <ListItemIcon sx={{ fontSize: 24, paddingRight: "24px" }}>
                <dropdownEl.icon sx={{ fontSize: 24 }} />
            </ListItemIcon>
            {dropdownEl.label}
        </MenuItem>
    )
}
