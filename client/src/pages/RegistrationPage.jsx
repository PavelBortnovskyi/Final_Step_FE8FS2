import { Typography } from '@mui/material';
import { FormRegistration } from 'src/components/_forms/FormRegistration';

export const RegistrationPage = () => {
  return (
    <div className="">
      <Typography variant="h5">Sign up</Typography>
      <br />
      <FormRegistration />
    </div>
  );
};
