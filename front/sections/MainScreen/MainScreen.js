"use client";
import styles from "./MainScreen.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import Preloader from "@/components/Preloader/Preloader";

const MainScreen = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // тимчасово відключаємо плавний скрол
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // після скидання включаємо плавний скрол назад
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    gsap.from(titleRef.current, {
      x: -50,
      opacity: 0,
      duration: 2,
      delay: 3.5,
      ease: "power5.out",
    });
    gsap.from(subtitleRef.current, {
      x: 50,
      opacity: 0,
      duration: 2,
      delay: 3.5,
      ease: "power5.out",
    });
    gsap.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 2,
      delay: 3.5,
      ease: "power5.out",
    });
  }, []);

  return (
    <div className={styles.main} id="main">
      <Preloader />
      <Header />
      <Image
        src="/main.jpg"
        fill
        alt="main"
        className={styles.image}
        priority
      />

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          ProGroup
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          девелопер з будівельним ДНК
        </p>
        <p ref={textRef} className={styles.text}>
          Ми знаємо процес — тому керуємо результатом. Створюємо житло, де
          якість можна виміряти, а комфорт — відчути.
        </p>
      </div>
    </div>
  );
};

export default MainScreen;
