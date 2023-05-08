import Button from "@mui/material/Button";

export function SaveButton() {
  return (
    <Button
      variant="plain"
      type="submit"
      sx={{
        color: "rgb(0 0 0)",
        background: "white",
        border: "1px solid",
        textTransform: "none",
        width: "106px",
        height: "34px",
        padding: "0 15px",
        borderRadius: "9999px",
        "&:hover": {
          backgroundColor: "#ffffffcf",
        },
      }}
    >
      Save
    </Button>
  );
}
