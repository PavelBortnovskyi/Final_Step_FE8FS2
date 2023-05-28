import { Button } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
export function UserPageFotoInput() {
  return (
    <Button
      variant="conteined"
      component="label"
      sx={{
        borderRadius: "999px",
        background: "rgb(37 37 37 / 50%)",
        padding: "22px",
        "&:hover": {
          background: "rgb(37 37 37 / 30%)",
        },
      }}
    >
      <AddAPhotoOutlinedIcon sx={{ fontSize: "18px" }} />
      <input name="foto" type="file" hidden />
    </Button>
  );
}
