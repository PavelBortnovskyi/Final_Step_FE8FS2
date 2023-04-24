import { Typography } from '@mui/material';
import { FormLogin } from 'src/components/_forms/FormLogin';

export const LoginPage = () => {
  return (
    <div className="">
      <Typography variant="h5">Log in</Typography>
      <br />
      <FormLogin />
    </div>
  );
};
