import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { checkIsAuth } from 'src/redux/reducers/authSlice';
import { registerUser } from 'src/redux/thunk/registerUser';
import { getMessageAuthorization } from 'src/redux/selectors/selectors';

import styles from 'src/styles/Form.module.scss';

// structure data for form
const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(4, 'має бути більше 3 символів')
    .max(20, 'має бути не більше 20 символів')
    .matches(/^[0-9a-zA-Z_\-/.]+$/, 'тільки англійські літери та цифри')
    .required("обов'язкове поле"),
  password: Yup.string()
    .min(4, 'має бути більше 3 символів')
    .required("обов'язкове поле"),
  email: Yup.string()
    .email('недійсна електронна адреса')
    .required("обов'язкове поле"),
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
    if (message) toast.success(message);
    if (error) toast.error(error);
    if (isAuth) navigate('/');
  }, [message, error, navigate, isAuth]);

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
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.FormBody} autoComplete="off">
            {/* login */}
            <div className={styles.FieldContainer}>
              <Field
                className={
                  errors.login && touched.login ? `${styles.inputError}` : ''
                }
                type="text"
                name="login"
                placeholder="Логін"
              />
              {errors.login && touched.login ? (
                <div className={styles.messageError}>{errors.login}</div>
              ) : null}
            </div>

            {/* password */}
            <div className={styles.FieldContainer}>
              <Field
                className={
                  errors.password && touched.password
                    ? `${styles.inputError}`
                    : ''
                }
                type="password"
                name="password"
                placeholder="Пароль"
              />
              {errors.password && touched.password ? (
                <div className={styles.messageError}>{errors.password}</div>
              ) : null}
            </div>

            {/* email */}
            <div className={styles.FieldContainer}>
              <Field
                className={
                  errors.email && touched.email ? `${styles.inputError}` : ''
                }
                type="text"
                name="email"
                placeholder="Поштова адреса"
              />
              {errors.email && touched.email ? (
                <div className={styles.messageError}>{errors.email}</div>
              ) : null}
            </div>

            <button className={styles.FormSubmit} type="submit">
              Реєстрація
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
