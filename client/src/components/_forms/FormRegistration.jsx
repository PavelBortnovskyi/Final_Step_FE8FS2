import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Snackbar, TextField, styled } from '@mui/material';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { registerUser } from 'src/redux/thunk/registerUser';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

import {
  MyFacebookLoginButton,
  MyGoogleLoginButton,
} from '../SocialLogin/SocialBtn';

const TextFieldWhite = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    backgroundColor: `${theme.palette.background.modal}`,

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

const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  '&:after': {
    content: '""',
    position: 'absolute',
    width: '200px',
    height: '1px',
    background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${theme.palette.text.primary}, rgba(0, 0, 0, 0))`,
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '0',
  },
}));

const BoxLiner = styled(Box)(({ theme }) => ({
  padding: '0 0 10px',
  textAlign: 'center',
  position: 'relative',
  zIndex: '1',

  '& span': {
    color: `${theme.palette.text.primary}`,
    padding: '2px 6px',
    backgroundColor: `${theme.palette.background.modal}`,
    zIndex: '2',
  },
}));

// for check email
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// structure data for form
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'invalid email address')
    .required('required field'),
  fullName: Yup.string()
    .min(2, 'must be more than 2 characters')
    .max(20, 'must be no more than 20 characters')
    .required('required field'),
  userTag: Yup.string()
    .min(2, 'must be more than 2 characters')
    .max(20, 'must be no more than 20 characters')
    .matches(/^[0-9a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ_\-/.]+$/, 'only letters and numbers')
    .required('required field'),
  password: Yup.string()
    .min(8, 'must be more than 8 characters')
    .required('required field'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('required field'),
  // birthDate: Yup.date()
  //   .max(new Date(), 'Date cannot be greater than current')
  //   .required('required field'),
});

// Formik form
export const FormRegistration = () => {
  const dispatch = useDispatch();

  // get message from server after authorization
  const { error, message, isAuthenticated } = useSelector(getAuthorizationData);

  // navigate
  const navigate = useNavigate();

  // set view message from server after auth
  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [navigate, isAuthenticated]);

  // send report and clear form
  const handleSubmit = async (values, actions) => {
    // send user data to redux thunk
    dispatch(registerUser(values));

    // reset form
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const initialValues = {
    email: '',
    fullName: '',
    userTag: '',
    password: '',
    confirmPassword: '',
    // birthDate: '',
  };

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
        autoComplete="off"
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

            {/* fullName */}
            <TextFieldWhite
              fullWidth
              id="fullName"
              name="fullName"
              label="Name"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={
                errors.fullName && touched.fullName && errors.fullName
              }
            />

            {/* userTag */}
            <TextFieldWhite
              fullWidth
              id="userTag"
              name="userTag"
              label="Tag"
              type="text"
              value={values.userTag}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.userTag && Boolean(errors.userTag)}
              helperText={errors.userTag && touched.userTag && errors.userTag}
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

            {/* confirm password */}
            <TextFieldWhite
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            {/*  birthDate */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="birthDate"
                value={values.birthDate}
                id="birthDate"
                name="birthDate"
                onChange={(date) => {
                  handleChange({ target: { name: 'birthDate', value: date } });
                }}
                onBlur={handleBlur}
                error={touched.birthDate && Boolean(errors.birthDate)}
                helperText={touched.birthDate && errors.birthDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}

            <ButtonStyled variant="outlined" type="submit">
              Sign up
            </ButtonStyled>
          </Form>
        )}
      </Formik>
      <BoxStyled>
        <BoxLiner>
          <span>OR</span>
        </BoxLiner>
      </BoxStyled>
      <Box>
        <Link to="http://localhost:8080/oauth2/authorization/google">
          <MyGoogleLoginButton />
        </Link>
      </Box>
      <Box>
        <Link to="http://localhost:8080/oauth2/authorization/facebook">
          <MyFacebookLoginButton />
        </Link>
      </Box>
    </>
  );
};
