"use client";

import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

const Preloader = ({ setReady, ready }) => {
  useEffect(() => {
    const body = document.body;

    const timer = setTimeout(() => {
      setReady(true);
      document.body.classList.add("unlocked");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <video
      autoPlay
      muted
      playsInline
      className={`${styles.preloader} ${ready ? styles.loaded : ""}`}
    >
      <source src="/video/preloader.mp4" type="video/mp4" />
    </video>
  );
};

export default Preloader;
