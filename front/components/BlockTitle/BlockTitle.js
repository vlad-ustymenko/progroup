"use client";

import { forwardRef } from "react";
import styles from "./BlockTitle.module.css";

const BlockTitle = forwardRef(function BlockTitle({ title, white }, ref) {
  return (
    <div className={styles.titleWrapper} ref={ref}>
      <span
        className={styles.line}
        style={white ? { backgroundColor: "var(--accent)" } : {}}
      ></span>
      <span
        className={styles.title}
        style={white ? { color: "var(--accent)" } : {}}
      >
        {title}
      </span>
    </div>
  );
});

export default BlockTitle;
