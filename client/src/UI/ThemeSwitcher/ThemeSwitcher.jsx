import { Switch, Typography } from '@mui/material';
import { useState } from 'react';

export const ThemeSwitcher = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Typography variant="span">Theme</Typography>
      <Switch
        color="warning"
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </>
  );
};
