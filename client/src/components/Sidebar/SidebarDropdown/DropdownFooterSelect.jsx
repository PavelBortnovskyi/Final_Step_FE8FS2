import styled from '@emotion/styled';
import { Box, FormControl, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const SelectStyled = styled(Select)(({ theme }) => ({
  backgroundColor: `${theme.palette.background.default}`,
  border: 'none',
  color: `${theme.palette.text.primary}`,
  '& .MuiList-padding': {
    backgroundColor: `${theme.palette.background.default}`,
    border: 'none',
    padding: 0,
  },
}))

export const DropdownFooterSelect = ({ mainLabel, selects }) => {
  const theme = useTheme();

  const MenuProps = {
    PaperProps: {
      style: {
        background: `${theme.palette.background.default}`,
        cursor: 'pointer',
      },
    },
  };


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
        backgroundColor: `${theme.palette.background.default}`,
        '& .MuiMenu-list': {
          backgroundColor: `${theme.palette.background.default}`,
          border: 'none',
        },
      }}
    >

      <SelectStyled
        displayEmpty
        value={mainLabel}
        onChange={handleChange}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
      >


        <MenuItem disabled value={mainLabel} sx={{
          '& .MuiList-padding': {
            backgroundColor: `${theme.palette.background.default}`,
            border: 'none',
            color: 'green',
            padding: 0,
          },
        }}>
          <em>{mainLabel}</em>
        </MenuItem>



        {selects && selects.map((selectEl) => (
          <Link
            to={selectEl.route}
            underline="none"
            key={selectEl.id}
            component={NavLink}
          >
            <Box display="flex" alignItems="center" key={selectEl.id}
              sx={{
                backgroundColor: `${theme.palette.background.default}`,
                padding: '0 12px',
                '&:hover': {
                  backgroundColor: `${theme.palette.background.hover}`,
                }
              }}>
              {selectEl.icon && (
                <selectEl.icon sx={{ fontSize: 20, color: `${theme.palette.text.primary}`, }} />
              )}
              {selectEl.label && (
                <MenuItem
                  key={selectEl.id}
                  value={selectEl.label}
                >
                  {selectEl.label}
                </MenuItem>
              )
              }
            </Box>
          </Link>
        ))}
      </SelectStyled>
    </FormControl>
  )
}
