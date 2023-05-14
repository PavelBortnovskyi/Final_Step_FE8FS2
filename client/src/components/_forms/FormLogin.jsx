import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Snackbar, TextField } from '@mui/material';

import { checkIsAuth } from 'src/redux/reducers/authSlice';
import { loginUser } from 'src/redux/thunk/loginUser';
import { getMessageAuthorization } from 'src/redux/selectors/selectors';

import styles from 'src/styles/Forms.module.scss';

// structure data for form
const SignupSchema = Yup.object().shape({
  // login: Yup.string()
  //   .min(4, 'must be more than 3 characters')
  //   .max(20, 'must be no more than 20 characters')
  //   .matches(/^[0-9a-zA-Z_\-/.]+$/, 'only English letters and numbers')
  //   .required('required field'),
  password: Yup.string()
    .min(4, 'must be more than 3 characters')
    .required('required field'),
});

// Formik form
export const FormLogin = () => {
  const dispatch = useDispatch();

  // get message from server after authorization
  const { error, message, isAuthenticated } = useSelector(
    getMessageAuthorization
  );

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
    dispatch(
      loginUser({
        email: values.login,
        password: values.password,
      })
    );

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
