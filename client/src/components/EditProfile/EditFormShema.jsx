import { Formik } from 'formik';
import * as Yup from 'yup';
import { EditForm } from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from 'src/redux/thunk/editUser';

export function EditFormShema() {
  const teg = useSelector((state) => state.user.user) || '';
  const name = useSelector((state) => state.user.user) || '';
  const bio = useSelector((state) => state.user.user) || '';
  const location = useSelector((state) => state.user.user) || '';

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
        userTag: teg.userTag,

        fullName: name.fullName,
        bio: bio.bio || '',
        location: location.location || '',

        birthDate: '',
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .min(1, 'Must be 1 characters or less')
          .required('Required'),
        bio: Yup.string().max(160),
        location: Yup.string().max(30),

        birthDate: Yup.date(),
      })}
      onSubmit={handleSubmit}
      component={EditForm}
    />
  );
}
