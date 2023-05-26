import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Snackbar, TextField } from '@mui/material';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { registerUser } from 'src/redux/thunk/registerUser';
import { getAuthorizationData } from 'src/redux/selectors/selectors';

import styles from 'src/styles/Forms.module.scss';

// structure data for form
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('invalid email address').required('required field'),
  fullName: Yup.string()
    .min(2, 'must be more than 2 characters')
    .max(20, 'must be no more than 20 characters')
    .required('required field'),
  userTag: Yup.string()
    .min(2, 'must be more than 2 characters')
    .max(20, 'must be no more than 20 characters')
    .matches(/^[0-9a-zA-Z_\-/.]+$/, 'only English letters and numbers')
    .required('required field'),
  password: Yup.string()
    .min(8, 'must be more than 8 characters')
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
    // if (message) toast.success(message);
    // if (error) toast.error(error);
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

  // default value for form
  // const initialValues = {
  //   email: 'test@test.com',
  //   fullName: 'Семен Семенович',
  //   userTag: 'semen',
  //   password: '12345678',
  // };
  const initialValues = {
    email: '',
    fullName: '',
    userTag: '',
    password: '',
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

            {/* fullName */}
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="fullName"
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
            <TextField
              fullWidth
              id="userTag"
              name="userTag"
              label="userTag"
              type="text"
              value={values.userTag}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.userTag && Boolean(errors.userTag)}
              helperText={errors.userTag && touched.userTag && errors.userTag}
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
