import Button from "@mui/material/Button";

export function ButtonEditProfile() {
  return (
    <Button
      variant="plain"
      sx={{
        border: "1px solid",
        textTransform: "none",
        width: "106px",
        height: "34px",
        padding: "0 15px",
        borderRadius: "9999px",
        "&:hover": {
          backgroundColor: "#b3b3b32b",
        },
      }}
    >
      Edit profile
    </Button>
  );
}
