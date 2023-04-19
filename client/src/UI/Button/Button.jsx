import styles from 'src/styles/Button.module.scss';

export const Button = ({ text, onClick }) => {
  return (
    <button className={styles.MyButton} onClick={onClick}>
      {text}
    </button>
  );
};
