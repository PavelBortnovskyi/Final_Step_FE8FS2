import { ListItemButton, ListItemIcon, Typography } from '@mui/material';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { bindTrigger} from 'material-ui-popup-state';
import React from 'react'

export const DropdownBtn = ({popupState}) => {
    return (
        <ListItemButton variant="text"
            {...bindTrigger(popupState)}
            sx={{
                '&:hover': {
                    backgroundColor: 'rgb(39,51,64)',
                    borderRadius: '30px',
                }
            }}
        >
            <ListItemIcon sx={{ fontSize: 30 }}>
                <PendingOutlinedIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>

            <Typography
                variant="subtitle1"
                sx={{
                    width: '176px',
                    textTransform: 'capitalize',
                    fontSize: '18px',
                }}
            >
                More
            </Typography>
        </ListItemButton>
    )
}
