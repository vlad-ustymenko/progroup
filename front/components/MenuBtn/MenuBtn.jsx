import { useMenuContext } from "../../Context/MenuContext";
import { memo } from "react";
import styles from "./MenuBtn.module.css";

const MenuBtn = () => {
  const { activeMenu, setActiveMenu } = useMenuContext();

  return (
    <button
      className={
        activeMenu ? `${styles.menuBtn} ${styles.active}` : styles.menuBtn
      }
      title="Button to open and close the menu"
      onClick={() => setActiveMenu(!activeMenu)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default memo(MenuBtn);
