"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./MainScreen.module.css";
import { gsap } from "gsap";

import Preloader from "@/components/Preloader/Preloader";
import Header from "@/components/Header/Header";
import MainCarousel from "@/components/MainCarousel/MainCarousel";
import Button from "@/components/Button/Button";

const MainScreen = ({ data }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  const [ready, setReady] = useState(false);

  // 🔥 disable native scroll restore (ВАЖЛИВО)
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // 🔥 STEP 2-3-4 GSAP pipeline
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      gsap.from(btn1Ref.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
      });

      gsap.from(btn2Ref.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        delay: 0.3,
      });

      gsap.from(imageWrapperRef.current, {
        scale: 1.1,
        duration: 1,
      });

      tl.from(titleRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.5,
      })
        .from(
          subtitleRef.current,
          {
            x: 60,
            opacity: 0,
            duration: 1.5,
          },
          "<",
        )
        .from(
          textRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1.5,
          },
          "-=0.6",
        );
    }, containerRef);

    // 🔥 scroll reset ПІСЛЯ preloader
    window.scrollTo(0, 0);

    // 🔥 ensure ScrollTrigger correct layout
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      });
    });

    return () => ctx.revert();
  }, [ready]);

  return (
    <div ref={containerRef} className={styles.main}>
      {/* 🔥 PRELOADER */}
      <Preloader setReady={setReady} ready={ready} />

      <Header />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.grid}><div className={styles.content}>
          <h1 ref={titleRef} className={styles.title}>
            {data.companyName}
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            {data.companySubname}
          </p>

          <p ref={textRef} className={styles.text}>
            {data.text}
          </p>

          <div className={styles.buttonsWrapper}>
            <Button title="Переглянути проети" href="#" ref={btn1Ref} />
            <Button
              title="Отримати консультацію"
              href="#"
              primary
              ref={btn2Ref}
            />
          </div>
        </div>

        <MainCarousel ref={imageWrapperRef} /></div>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <span className={styles.infoTitle}>10</span>
            <span className={styles.infoSymbol}>+</span>
            <p className={styles.infoText}>років досвіду</p>
          </div>
          <div className={styles.info}>
            <span className={styles.infoTitle}>2</span>
            <p className={styles.infoText}>міста</p>
          </div>
          <div className={styles.info}>
            <span className={styles.infoTitle}>100</span>
            <span className={styles.infoSymbol}>%</span>
            <p className={styles.infoText}>власний будресурс</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
