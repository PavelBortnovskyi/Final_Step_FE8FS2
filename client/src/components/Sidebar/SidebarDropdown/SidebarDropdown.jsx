import { ListItem } from '@mui/material';
import PopupState from 'material-ui-popup-state';
import React from 'react';
import { DropdownBtn } from './DropdownBtn';
import { SidebarDropdownMenu } from './SidebarDropdownMenu';

export const SidebarDropdown = ({isAuthenticated}) => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <ListItem disablePadding>

                        <DropdownBtn popupState={popupState} />

                        <SidebarDropdownMenu popupState={popupState} />

                    </ListItem>
                </React.Fragment>
            )}
        </PopupState>
    )
}
