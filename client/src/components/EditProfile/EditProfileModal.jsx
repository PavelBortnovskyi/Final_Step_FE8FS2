import style from "src/styles/EditProfile.module.scss";
import { EditFormShema } from "./EditFormShema";
export function EditProfileModal() {
  return (
    <>
      <div className={style.modalBg}>
        <div className={style.modalBody}>
          <EditFormShema />
          <div className="fo modal heder"></div>
          <div className="fo new foto"></div>
          <div className="fo new avatar"></div>
          <div className="inputs"></div>
          <div className="birth date"></div>
        </div>
      </div>
    </>
  );
}
