import { ListItem, Menu } from '@mui/material';
import PopupState, { bindMenu } from 'material-ui-popup-state';
import React from 'react';
import { dropdownElements } from '../sidebarElemets';
import { DropdownHeader } from './DropdownHeader';
import { DropdownBtn } from './DropdownBtn';

export const SidebarDropdownMenu = () => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <ListItem disablePadding>

                        <DropdownBtn popupState={popupState} />

                        <Menu {...bindMenu(popupState)}
                            sx={{
                                left: '10px',
                                top: '-270px',
                                color: 'rgb(21,32,43)',

                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0)'
                                }
                            }}
                        >

                            {dropdownElements.map(dropdownEl => (
                                <DropdownHeader
                                    dropdownEl={dropdownEl}
                                    popupState={popupState}
                                />
                            ))
                            }



                        </Menu>
                    </ListItem>
                </React.Fragment>
            )}
        </PopupState>
    )
}
