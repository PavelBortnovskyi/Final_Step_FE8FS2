import React from 'react'
import PopupState from 'material-ui-popup-state';
import { SidebarFooterMenuDropdown } from './SidebarFooterMenuDropdown';
import { SidebarFooterBtnDropdown } from './SidebarFooterBtnDropdown';
import { Box, styled } from '@mui/material';

const BoxFooterSliderStyled = styled(Box)((props) => ({
    marginLeft: '12px',
}))


export const SidebarFooter = () => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <BoxFooterSliderStyled
                    sx={{
                        
                        alignSelf: { xs: 'end', lg: 'start' },
                    }}
                >

                    <SidebarFooterBtnDropdown
                        popupState={popupState}
                    />

                    <SidebarFooterMenuDropdown
                        popupState={popupState}

                    />

                </BoxFooterSliderStyled>
            )}
        </PopupState>




    )
}
