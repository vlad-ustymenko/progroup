import styles from "./ArrowIcon.module.css";

const ArrowIcon = ({ open, className, white }) => {
  return (
    <div className={`${styles.icon} ${className}`}>
      <span
        className={
          open ? `${styles.icon__left} ${styles.open} ` : styles.icon__left
        }
        style={white && { backgroundColor: "white" }}
      ></span>
      <span
        className={
          open ? `${styles.icon__right} ${styles.open} ` : styles.icon__right
        }
        style={white && { backgroundColor: "white" }}
      ></span>
    </div>
  );
};

export default ArrowIcon;
