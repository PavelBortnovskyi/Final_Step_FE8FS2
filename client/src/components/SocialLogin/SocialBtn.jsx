import { Box, Button, alpha, styled } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const ButtonStyledGoogle = styled(Button)(({ theme }) => ({
  padding: '10px',
  borderRadius: '40px',
  width: '100%',
  margin: '10px 0 5px',

  color: `${theme.palette.text.primary}`,
  borderColor: `${alpha(theme.palette.google.main, 0.5)}`,
  backgroundColor: `${alpha(theme.palette.google.main, 0.3)}`,

  '&:hover': {
    borderColor: `${theme.palette.google.main}`,
    backgroundColor: `${alpha(theme.palette.google.main, 0.5)}`,
  },
}));

const ButtonStyledFacebook = styled(Button)(({ theme }) => ({
  padding: '10px',
  borderRadius: '40px',
  width: '100%',
  margin: '10px 0 5px',
  color: `${theme.palette.text.primary}`,
  borderColor: `${alpha(theme.palette.facebook.main, 0.5)}`,
  backgroundColor: `${alpha(theme.palette.facebook.main, 0.3)}`,

  '&:hover': {
    borderColor: `${theme.palette.facebook.main}`,
    backgroundColor: `${alpha(theme.palette.facebook.main, 0.5)}`,
  },
}));

const GoogleIconStyled = styled(GoogleIcon)(({ theme }) => ({
  color: `${theme.palette.google.main}`,
}));

const FacebookIconStyled = styled(FacebookIcon)(({ theme }) => ({
  color: `${theme.palette.facebook.main}`,
}));

const BoxStyled = styled(Box)`
  padding: 0 0 0 10px;
  text-align: left;
`;

/** My Google login button. */
export const MyGoogleLoginButton = () => {
  return (
    <ButtonStyledGoogle variant="outlined">
      <GoogleIconStyled />
      <BoxStyled>Log in with google</BoxStyled>
    </ButtonStyledGoogle>
  );
};

/** My Facebook login button. */
export const MyFacebookLoginButton = () => {
  return (
    <ButtonStyledFacebook variant="outlined">
      <FacebookIconStyled />
      <BoxStyled>Log in with facebook</BoxStyled>
    </ButtonStyledFacebook>
  );
};
