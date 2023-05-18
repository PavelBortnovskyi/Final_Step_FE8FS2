import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Snackbar, TextField } from '@mui/material';

import { loginUser } from 'src/redux/thunk/loginUser';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

import styles from 'src/styles/Forms.module.scss';

// structure data for form
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('invalid email address').required('required field'),
  password: Yup.string()
    .min(8, 'must be more than 8 characters')
    .required('required field'),
});

// Formik form
export const FormLogin = () => {
  const dispatch = useDispatch();

  // get message from server after authorization
  const { error, message, isAuthenticated } = useSelector(getAuthorizationData);

  // navigate
  const navigate = useNavigate();

  // set view message from server after auth
  // useEffect(() => {
  //   // if (message) <Alert severity="success">{message}</Alert>;
  //   // if (error) <Alert severity="error">{error}</Alert>;
  //   if (isAuthenticated) navigate('/');
  // }, [navigate, isAuthenticated]);

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
    email: 'test@test.com',
    password: '12345678',
  };
  // const initialValues = {
  //   email: '',
  //   password: '',
  // };

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
            <div className={styles.actions}>
              <Button variant="outlined" color="black" type="submit">
                Log in
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
