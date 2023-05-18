// import { TextField } from "@mui/material";

import { useState } from "react";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function BirthdayInput() {
  const [editBirthDate] = useState();
  return (
    <>{editBirthDate && <input name="birthDate" type="date" />}</>

    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DatePicker
    //     id="birthday"
    //     value="12.12.2012"
    //     // value={values.birthday}
    //     onChange={(date) => {
    //       handleChange({ target: { name: "birthday", value: date } });
    //     }}
    //     renderInput={(params) => (
    //       <TextField
    //         {...params}
    //         sx={{
    //           border: "1px solid white",
    //           borderRadius: "4px",
    //         }}
    //       />
    //     )}
    //   />
    // </LocalizationProvider>
  );
}
