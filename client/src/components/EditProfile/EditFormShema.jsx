import { Formik } from "formik";
import * as Yup from "yup";
import { EditForm } from "./EditForm";

export function EditFormShema() {
  return (
    <Formik
      initialValues={{
        foto: "",
        logo: "",
        name: "",
        bio: "",
        location: "",
        website: "",
        birthDate: "",
      }}
      validationSchema={Yup.object({
        foto: Yup.array().max(1, "select at least 1 file"),
        logo: Yup.array().max(1, "select at least 1 file"),
        name: Yup.string()
          .min(1, "Must be 1 characters or less")
          .required("Required"),
        bio: Yup.string().max(160),
        location: Yup.string().max(30),
        website: Yup.string().max(100),
        birthDate: Yup.date(),
      })}
      onSubmit={(values, { setSubmitting }) => {}}
      component={EditForm}
    />
  );
}
