import style from "src/styles/User.module.scss";

export function UserNick() {
  return <span className={style.nick}>@nickname</span>;
}
