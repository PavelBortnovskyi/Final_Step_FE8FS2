import { ListItemIcon, MenuItem, useTheme } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export const DropdownHeader = ({ dropdownEl, popupState }) => {
    const theme = useTheme();
    return (
        <Link
            to={dropdownEl.route}
            underline="none"
            key={dropdownEl.id}
            component={NavLink}
        >
            <MenuItem
                onClick={popupState.close}
                sx={{
                    width: '286px',
                    padding: '12px 16px',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: `${theme.palette.text.primary}`,
                    backgroundColor: `${theme.palette.background.default}`,
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: `${theme.palette.background.hover}`,
                    }
                }}
            >

                <ListItemIcon sx={{ fontSize: 24, paddingRight: "24px", color: `${theme.palette.text.primary}`, }}>
                    <dropdownEl.icon sx={{ fontSize: 24 }} />
                </ListItemIcon>
                {dropdownEl.label}
            </MenuItem>
        </Link>
    )
}
