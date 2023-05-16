import { FormControlLabel, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from 'src/redux/selectors/selectors';
import { setTheme } from 'src/redux/reducers/themeSlice';
import { modeTheme } from 'src/styles/_materialTheme';

export const ThemeSwitcher = () => {
  const dispatch = useDispatch();

  // get theme setting from redux
  const { theme, colorTheme } = useSelector(getTheme);

  // set value for switcher
  const isChecked = modeTheme[theme] || false;

  const handleChange = (event) => {
    // set theme value for localStorage and redux
    const mode =
      Object.keys(modeTheme).find(
        (key) => modeTheme[key] === event.target.checked
      ) || false;
    localStorage.setItem('theme', mode);
    dispatch(setTheme(mode));
  };

  return (
    <FormControlLabel
      control={
        <Switch
          color="warning"
          checked={isChecked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      labelPlacement="start"
      label="Theme"
    />
  );
};
