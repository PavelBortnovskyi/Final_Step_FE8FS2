import { Formik } from "formik";
import * as Yup from "yup";
import { EditForm } from "./EditForm";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "src/redux/thunk/editUser";

export function EditFormShema() {
  const teg = useSelector((state) => state.user.user.userTag);
  const name = useSelector((state) => state.user.user.fullName);
  const bio = useSelector((state) => state.user.user.bio) || "";
  const location = useSelector((state) => state.user.user.location) || "";
  // const birthDate = useSelector((state) => state.auth.birthDate);
  // console.log(birthDate);
  // const birthDate = new Date(getBirthDate);
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
        userTag: teg,
        // foto: "",
        // logo: "",
        fullName: name,
        bio: bio,
        location: location,
        // website: "",
        birthDate: "",
      }}
      validationSchema={Yup.object({
        // foto: Yup.array().max(1, "select at least 1 file"),
        // logo: Yup.array().max(1, "select at least 1 file"),
        fullName: Yup.string()
          .min(1, "Must be 1 characters or less")
          .required("Required"),
        bio: Yup.string().max(160),
        location: Yup.string().max(30),
        // website: Yup.string().max(100),
        birthDate: Yup.date(),
      })}
      onSubmit={handleSubmit}
      component={EditForm}
    />
  );
}
