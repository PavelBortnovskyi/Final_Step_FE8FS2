import { Form } from "formik";
import { EditFormHeder } from "./EditFormHeder";
import { UserPageFoto } from "../User/UserPageFoto";
import { UserPageAvatar } from "../User/UserPageAvatar";
import { TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    color: "white",
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "transparent",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "& label": {
      color: "white",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export function EditForm() {
  return (
    <Form>
      <EditFormHeder />
      <UserPageFoto />
      <UserPageAvatar />

      <Box
        sx={{
          padding: "14px",
          "& div": {
            width: "100%",
          },
          "& label": { color: "white" },
        }}
      >
        <RedditTextField
          label="Name"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <RedditTextField
          label="Bio"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <RedditTextField
          label="Location"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <RedditTextField
          label="Website"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <Box>
          <Typography>Birth date</Typography>
          <Typography>Birth date</Typography>
        </Box>
      </Box>

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
