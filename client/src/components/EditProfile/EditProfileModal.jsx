import { EditFormShema } from "./EditFormShema";
import { Box, Modal } from "@mui/material";
export function EditProfileModal() {
  return (
    <>
      <Modal
        hideBackdrop={true}
        open={true} //щоб відкрити модалку треба змінити на trye
        sx={{
          backgroundColor: "rgba(91, 112, 131, 0.4)",
        }}
      >
        <Box
          borderRadius={"16px"}
          sx={{
            backgroundColor: "rgba(21, 32, 43, 1)",
            width: "600px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EditFormShema />
        </Box>
      </Modal>
      {/* <div className={style.modalBg}>
        <div className={style.modalBody}>
          <EditFormShema />
          <div className="fo modal heder"></div>
          <div className="fo new foto"></div>
          <div className="fo new avatar"></div>
          <div className="inputs"></div>
          <div className="birth date"></div>
        </div>
      </div> */}
    </>
  );
}
