import style from "src/styles/EditProfile.module.scss";
import { SaveButton } from "./SaveButton";
export function EditFormHeder() {
  return (
    <div className={style.EditFormHeder}>
      <div>x</div>
      <p>Edit profile</p>
      <SaveButton />
      {/* <button
        type="submit"
        // disabled={props.isSubmitting}
      >
        Save
      </button> */}
    </div>
  );
}
