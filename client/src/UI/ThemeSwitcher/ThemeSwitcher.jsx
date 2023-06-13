import { FormControlLabel, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from 'src/redux/selectors/selectors';
import { setColor } from 'src/redux/reducers/themeSlice';
import { useState } from 'react';

export const ThemeSwitcher = () => {
  const dispatch = useDispatch();

  const modeTheme = {
    dark: true,
    light: false,
  };

  // get theme setting from redux
  const { colorTheme } = useSelector(getTheme);

  // set value for switcher
  const isChecked = modeTheme[colorTheme] || false;

  const handleChange = (event) => {
    // set theme value for localStorage and redux
    const mode =
      Object.keys(modeTheme).find(
        (key) => modeTheme[key] === event.target.checked
      ) || false;
    localStorage.setItem('colorTheme', mode);
    dispatch(setColor(mode));
  };

  return (
    <FormControlLabel 
      control={
        <Switch
          checked={isChecked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      labelPlacement="start"
      label="Сhange Theme"
    />
  );
};
