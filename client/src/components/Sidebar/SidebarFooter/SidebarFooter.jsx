import React from 'react'
import PopupState from 'material-ui-popup-state';
import { SidebarFooterMenuDropdown } from './SidebarFooterMenuDropdown';
import { SidebarFooterBtnDropdown } from './SidebarFooterBtnDropdown';


export const SidebarFooter = ({ displayName, username }) => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>

                    <SidebarFooterBtnDropdown
                        popupState={popupState}
                        displayName={displayName}
                        username={username}
                    />

                    <SidebarFooterMenuDropdown
                        popupState={popupState}
                        username={username}
                    />

                </React.Fragment>
            )}
        </PopupState>




    )
}
