import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useState } from 'react';
// import { selectElements } from './DropdownElements';


export const DropdownFooterSelect = ({ mainLabel, selects }) => {
    console.log(mainLabel);
    console.log(selects);

    const handleChange = (event) => {
        // const {
        //     target: { value },
        // } = event;
        // setPersonName(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );
    };

    return (
        mainLabel && <FormControl
            sx={{
                display: 'flex',
                fill: '#FFF'
            }}

        >
            <Select
                displayEmpty
                sx={{
                        backgroundColor: "rgb(21,32,43)",
                        border: 'none',
                        color: '#FFF',
                        
                        '& .MuiPaper': {
                            backgroundColor: "rgb(21,32,43)",
                            border: 'none',
                        },
                        '& .MuiPaper-root': {
                            backgroundColor: "rgb(21,32,43)",
                            border: 'none',
                        },

                        '& .MuiMenu': {
                            backgroundColor: "rgb(21,32,43)",
                            border: 'none',
                        },
                        '& .MuiMenu-paper': {
                            backgroundColor: "rgb(21,32,43)",
                            border: 'none',
                        },
                        '& .MuiPopover': {
                            backgroundColor: "rgb(21,32,43)",
                            border: 'none',
                        },
                        '& .MuiPopover-paper': {
                            backgroundColor: "rgb(21,32,43)",
                            border: 'none',
                        },


                        '& .Mui-selected': {
                            backgroundColor: "rgb(21,32,43)",
                            border: 'none',
                        },
                    }}
                value={mainLabel}
                onChange={handleChange}
                input={<OutlinedInput
                    
                />}

            >


                <MenuItem disabled value={mainLabel}>
                    <em>{mainLabel}</em>
                </MenuItem>



                {selects && selects.map((selectEl) => (
                    <MenuItem
                        key={selectEl.id}
                        value={selectEl.label}

                    >
                        {selectEl.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
