import { Formik } from 'formik';
import * as Yup from 'yup';
import { EditForm } from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from 'src/redux/thunk/editUser';

export function EditFormShema() {
  const user = useSelector((state) => state.user.user) || {};

  const dispatch = useDispatch();
  const handleSubmit = async (values, actions) => {
    // send user data to redux thunk
    dispatch(editUser(values));

    // reset form
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        userTag: user.userTag || '',
        fullName: user.fullName || '',
        bio: user.bio || '',
        location: user.location || '',
        birthDate: user.birthDate || '',
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .min(2, 'Must be 2 character or less')
          .required('Required'),
        bio: Yup.string().max(160),
        location: Yup.string().max(30),
        birthDate: Yup.date().max(new Date()),
      })}
      onSubmit={handleSubmit}
      component={EditForm}
    />
  );
}
