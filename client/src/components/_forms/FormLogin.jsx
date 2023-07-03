import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Snackbar,
  TextField,
  styled,
  useTheme,
} from '@mui/material';

import { loginUser } from 'src/redux/thunk/loginUser';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

// google auth
import {
  GoogleLogin,
  GoogleOAuthProvider,
  googleLogout,
} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import axios from 'axios';
// import {
//   FacebookLoginButton,
//   GoogleLoginButton,
// } from 'react-social-login-buttons';

const TextFieldWhite = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.primary,

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.border.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  padding: '10px',
  borderRadius: '40px',
}));

// for check email
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// structure data for form
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'invalid email address')
    .required('required field'),
  password: Yup.string()
    .min(8, 'must be more than 8 characters')
    .required('required field'),
});

// Formik form
export const FormLogin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // get message from server after authorization
  const { error, message, isAuthenticated } = useSelector(getAuthorizationData);

  // navigate
  const navigate = useNavigate();

  // set view message from server after auth
  useEffect(() => {
    // if (message) <Alert severity="success">{message}</Alert>;
    // if (error) <Alert severity="error">{error}</Alert>;
    if (isAuthenticated) navigate('/');
  }, [navigate, isAuthenticated]);

  // send report and clear form
  const handleSubmit = async (values, actions) => {
    // send user data to redux thunk
    dispatch(loginUser(values));

    // reset form
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  // default value for form
  const initialValues = {
    email: 'uniqChat@chat.ua',
    password: '12345678',
  };
  // const initialValues = {
  //   email: '',
  //   password: '',
  // };

  //*** GOOGLE AUTH ********************************************/

  const handleLogin = () => {
    const googleLoginUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId =
      '833649741221-eijh9fedi04psm4e9pfvu3atkbarj3bg.apps.googleusercontent.com';
    const redirectUri =
      'https://final-step-fe2fs8tw.herokuapp.com/api/v1/auth/login/oauth2/code/google';
    // 'http://localhost:3000';
    const scope = 'email profile';

    const authUrl = `${googleLoginUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&response_type=code`;

    window.location.href = authUrl;
  };

  ////////////////////////////////

  const googleConnect = async () => {
    const response = await axios.get(
      'https://final-step-fe2fs8tw.herokuapp.com/oauth2/authorization/google'
      // 'https://final-step-fe2fs8tw.herokuapp.com/api/v1/auth/oauth2'
    );

    console.log('google', response);
  };

  //***********************************************/

  return (
    <>
      {message && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '18px',
              margin: '20px 0px',
              width: 'clamp(200px, 60vw, 300px)',
              maxWidth: '300px',
            }}
            autoComplete="off"
          >
            {/* email */}
            <TextFieldWhite
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            {/* password */}
            <TextFieldWhite
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <ButtonStyled variant="outlined" type="submit">
              Log in
            </ButtonStyled>
          </Form>
        )}
      </Formik>
      {/* <GoogleOAuthProvider
        clientId="833649741221-eijh9fedi04psm4e9pfvu3atkbarj3bg.apps.googleusercontent.com"
        redirect_uri="https://final-step-fe2fs8tw.herokuapp.com/api/v1/auth/login/oauth2/code/google"
        scope="profile email"
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log('google', credentialResponse);

            const decode = jwt_decode(credentialResponse.credential);
            console.log('decode', decode);

            // sendData(credentialResponse);s
          }}
          onError={() => {
            console.log('login error');
          }}
          redirect_uri="https://final-step-fe2fs8tw.herokuapp.com/api/v1/auth/login/oauth2/code/google"
        />
      </GoogleOAuthProvider> */}
      <br />
      {/* <button onClick={handleLogin}>Login with Google</button> */}
      <br />
      {/* <button onClick={googleConnect}>Get to server login</button> */}
      <br />
      <Link to="https://final-step-fe2fs8tw.herokuapp.com/oauth2/authorization/google">
        Link to server login
      </Link>
    </>
  );
};
