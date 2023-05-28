import { TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

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
export function EditInput({ field, ...props }) {
  return (
    <>
      <RedditTextField
        // name="fullName"
        // label="Name"
        // defaultValue="12"
        // id="fullName"
        variant="filled"
        style={{ marginTop: 11 }}
        {...field}
        {...props}
        placeholder={props.label}
      />
    </>
  );
}
