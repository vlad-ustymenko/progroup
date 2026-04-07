import React from "react";
import styles from "./Preloader.module.css";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });
  return (
    <div className={`${styles.preloader} ${!loading ? styles.loaded : ""}`}>
      Preloader
    </div>
  );
};

export default Preloader;
