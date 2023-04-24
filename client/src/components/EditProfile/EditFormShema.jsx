import { Formik } from "formik";
import * as Yup from "yup";
import { EditForm } from "./EditForm";

export function EditFormShema() {
  return (
    <Formik
      initialValues={{ foto: "", name: "" }}
      validationSchema={Yup.object({
        foto: Yup.array().max(1, "select at least 1 file"),
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
      component={EditForm}
    />
  );
}
