import { ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { bindTrigger } from 'material-ui-popup-state';
import React from 'react'
import { useTheme } from '@emotion/react';

export const DropdownBtn = ({ popupState }) => {
    const theme = useTheme();
    return (


            <ListItemButton
                {...bindTrigger(popupState)}
                sx={{
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 4px',
                    backgroundColor: `${theme.palette.background.default}`,
                    '&:hover': {
                        backgroundColor: 'rgb(39,51,64)',
                        borderRadius: { xs: '50%', lg: '30px' },
                    }
                }}
            >
                <ListItemIcon
                    sx={{
                        
                        fontSize: 30,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <PendingOutlinedIcon sx={{ fontSize: 30, color: '#FFF' }} />
                </ListItemIcon>

                <Typography
                    variant="subtitle1"
                    sx={{
                        display: { lg: 'block', xs: 'none' },
                        width: '100%',
                        textTransform: 'capitalize',
                        fontSize: '18px',
                    }}
                >
                    More
                </Typography>
            </ListItemButton>
        
    )
}
