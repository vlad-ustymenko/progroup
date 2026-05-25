"use client";

import { forwardRef } from "react";
import styles from "./BlockTitle.module.css";

const BlockTitle = forwardRef(function BlockTitle({ title }, ref) {
  return (
    <div className={styles.titleWrapper} ref={ref}>
      <span className={styles.line}></span>
      <span className={styles.title}>{title}</span>
    </div>
  );
});

export default BlockTitle;
