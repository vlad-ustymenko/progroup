"use client";

import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

const Preloader = ({ setReady, ready }) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // 🔥 lock scroll одразу
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    window.scrollTo(0, 0);

    // 🔥 імітація завантаження (можеш замінити на video onEnded)
    const timer = setTimeout(() => {
      html.style.overflow = "";
      body.style.overflow = "";

      setReady(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      html.style.overflow = "";
      body.style.overflow = "";
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
