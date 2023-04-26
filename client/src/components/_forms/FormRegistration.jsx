import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Snackbar, TextField } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { checkIsAuth } from 'src/redux/reducers/authSlice';
import { registerUser } from 'src/redux/thunk/registerUser';
import { getMessageAuthorization } from 'src/redux/selectors/selectors';

import styles from 'src/styles/Forms.module.scss';

// structure data for form
const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(4, 'must be more than 3 characters')
    .max(20, 'must be no more than 20 characters')
    .matches(/^[0-9a-zA-Z_\-/.]+$/, 'only English letters and numbers')
    .required('required field'),
  password: Yup.string()
    .min(4, 'must be more than 3 characters')
    .required('required field'),
  email: Yup.string().email('invalid email address').required('required field'),
  birthday: Yup.date()
    .max(new Date(), 'Date cannot be greater than current')
    .required('required field'),
});

// Formik form
export const FormRegistration = () => {
  const dispatch = useDispatch();

  // get message from server after authorization
  const { error, message } = useSelector(getMessageAuthorization);

  // get state authorization
  const isAuth = useSelector(checkIsAuth);

  // navigate
  const navigate = useNavigate();

  // set view message from server after auth
  useEffect(() => {
    // if (message) toast.success(message);
    // if (error) toast.error(error);
    if (isAuth) navigate('/');
  }, [navigate, isAuth]);

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

  // default value for form
  const initialValues = {
    login: '',
    password: '',
    email: '',
    birthday: new Date(),
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
      >
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form className={styles.FormBody} autoComplete="off">
            {/* login */}
            <TextField
              fullWidth
              id="login"
              name="login"
              label="Login"
              type="text"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.login && Boolean(errors.login)}
              helperText={errors.login && touched.login && errors.login}
            />

            {/* password */}
            <TextField
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

            {/* email */}
            <TextField
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

            {/*  Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birthday"
                value={values.birthday}
                onChange={(date) => {
                  handleChange({ target: { name: 'birthday', value: date } });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <div className={styles.actions}>
              <Button variant="outlined" color="black" type="submit">
                Sign up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
