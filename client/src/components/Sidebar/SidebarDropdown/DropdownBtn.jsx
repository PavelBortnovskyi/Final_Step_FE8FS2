import { ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { bindTrigger } from 'material-ui-popup-state';
import React from 'react'

import styled from '@emotion/styled';

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 4px',
    borderRadius: '30px',

    '&:hover': {
        backgroundColor: `${theme.palette.background.hover}`,
        borderRadius: { xs: '50%', lg: '30px' },
    }
}))

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))


export const DropdownBtn = ({ popupState }) => {
    const theme = useTheme();

    return (
        <ListItemButtonStyled {...bindTrigger(popupState)}>
            <ListItemIconStyled>
                <PendingOutlinedIcon sx={{ fontSize: 30, color: `${theme.palette.text.primary}`, }} />
            </ListItemIconStyled>

            <Typography
                variant="subtitle1"
                sx={{
                    display: { lg: 'block', xs: 'none' },
                    width: '100%',
                    textTransform: 'capitalize',
                    fontSize: '18px',
                    color: `${theme.palette.text.primary}`
                }}
            >
                More
            </Typography>
        </ListItemButtonStyled>

    )
}
