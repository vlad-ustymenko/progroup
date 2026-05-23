"use client";

import { forwardRef } from "react";
import styles from "./Button.module.css";

const Button = forwardRef(function Button(
  { title, primary, href, className = "" },
  ref,
) {
  return (
    <a
      ref={ref}
      href={href}
      className={`
        ${styles.button}
        ${primary ? styles.primary : ""}
        ${className}
      `}
    >
      {title}
    </a>
  );
});

export default Button;
