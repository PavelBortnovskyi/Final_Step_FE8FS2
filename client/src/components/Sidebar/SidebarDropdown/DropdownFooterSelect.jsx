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

            }}

        >
            <Select
                displayEmpty
                value={mainLabel}
                onChange={handleChange}
                input={<OutlinedInput/>}

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
