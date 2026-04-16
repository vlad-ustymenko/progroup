"use client";
import styles from "./MainScreen.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import Preloader from "@/components/Preloader/Preloader";

const MainScreen = ({ data }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    // 🔹 reset scroll
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "smooth";

    const ctx = gsap.context(() => {
      const START_DELAY = 3.5;

      const tl = gsap.timeline({
        delay: START_DELAY,
      });

      // 🔹 IMAGE
      gsap.from(imageWrapperRef.current, {
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
        delay: START_DELAY - 0.5,
      });

      // 🔹 TEXT ANIMATION
      tl.from(titleRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "<", // одночасно з title
        )
        .from(
          textRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6", // трохи пізніше
        );
    }, containerRef);

    return () => ctx.revert(); // 🔥 cleanup
  }, []);

  return (
    <div ref={containerRef} className={styles.main} id="main">
      <Preloader />
      <Header />

      {/* 🔥 обгортка для анімації */}

      <Image
        src="/main.jpg"
        fill
        alt="main"
        className={styles.image}
        priority
        ref={imageWrapperRef}
      />

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          {data.companyName}
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          {data.companySubname}
        </p>

        <p ref={textRef} className={styles.text}>
          {data.text}
        </p>
      </div>
    </div>
  );
};

export default MainScreen;
