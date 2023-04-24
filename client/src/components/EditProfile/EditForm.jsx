import { Field, Form, ErrorMessage } from "formik";
import { EditFormHeder } from "./EditFormHeder";
import { UserPageFoto } from "../User/UserPageFoto";
import { UserPageAvatar } from "../User/UserPageAvatar";

export function EditForm() {
  return (
    <Form>
      <EditFormHeder />
      <UserPageFoto />
      <UserPageAvatar />
      <label htmlFor="name">First Name</label>
      <Field name="name" type="text" />
      <ErrorMessage name="name" />

      {/* <Field
        name="email"
        type="email"
        label="email address"
        component={Input}
      />
      <ErrorMessage name="email" />

      <Field name="phone" type="phone" label="Phone" component={Input} />
      <ErrorMessage name="phone" />

      <label htmlFor="message">Message</label>
      <Field name="message" type="textarea" />
      <ErrorMessage name="message" /> */}
    </Form>
  );
}
