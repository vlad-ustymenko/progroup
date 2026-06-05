"use client";
import { useEffect } from "react";
import { useMenuContext } from "../../Context/MenuContext";
import styles from "./Menu.module.css";

const Menu = ({ data }) => {
  const { activeMenu, setActiveMenu } = useMenuContext();
  useEffect(() => {
    if (activeMenu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [activeMenu]);

  return (
    <nav className={activeMenu ? `${styles.nav} ${styles.active}` : styles.nav}>
      <ul className={styles.navList}>
        {data.map((item) => (
          <li key={item.id} onClick={() => setActiveMenu(false)}>
            <a href={item.link} className={styles.navLink}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <a href="tel:+38 (095) 319-57-58" className={styles.telephone}>
        +38 (095) 319-57-58
      </a>
    </nav>
  );
};

export default Menu;
