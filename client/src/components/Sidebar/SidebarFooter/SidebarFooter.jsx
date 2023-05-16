import React from 'react'
import PopupState from 'material-ui-popup-state';
import { SidebarFooterMenuDropdown } from './SidebarFooterMenuDropdown';
import { SidebarFooterBtnDropdown } from './SidebarFooterBtnDropdown';
import { Box, styled } from '@mui/material';

const BoxFooterSliderStyled = styled(Box)((props) => ({
    marginLeft: '12px', 
    
    // alignSelf: {xs: 'end', lg: 'start'},
    // '& .MuiButton-root': {
    //     padding: 0, 
    // }
}))


export const SidebarFooter = ({ displayName, username }) => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <BoxFooterSliderStyled >

                    <SidebarFooterBtnDropdown
                        popupState={popupState}
                        displayName={displayName}
                        username={username}
                    />

                    <SidebarFooterMenuDropdown
                        popupState={popupState}
                        username={username}
                    />

                </BoxFooterSliderStyled>
            )}
        </PopupState>




    )
}
