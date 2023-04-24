import style from "src/styles/User.module.scss";

export function UserFolower() {
  return (
    <div className={style.folowersBlock}>
      <p>
        0<span className={style.folowerGre}>foloving</span>
      </p>
      <p>
        0<span className={style.folowerGre}>folovers</span>
      </p>
    </div>
  );
}
