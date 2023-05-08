import { Button } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

export function ImgInputAvatar() {
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
      <input name="logo" type="file" hidden />
    </Button>
  );
}
