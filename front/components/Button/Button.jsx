import React from "react";
import styles from "./Button.module.css";

const Button = ({ title, primary, href, className }) => {
  if (primary) {
    return (
      <a href="#" className={`${styles.button} ${styles.primary} ${className}`}>
        {title}
      </a>
    );
  } else {
    return (
      <a href={href} className={`${styles.button} ${className}`}>
        {title}
      </a>
    );
  }
};

export default Button;
