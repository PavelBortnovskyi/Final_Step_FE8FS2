import style from "src/styles/EditProfile.module.scss";
export function EditFormHeder() {
  return (
    <div className={style.EditFormHeder}>
      <div>x</div>
      <p>Edit profile</p>
      <button
        type="submit"
        // disabled={props.isSubmitting}
      >
        Save
      </button>
    </div>
  );
}
