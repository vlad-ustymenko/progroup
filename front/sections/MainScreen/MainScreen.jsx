"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./MainScreen.module.css";
import { gsap } from "gsap";

import Preloader from "@/components/Preloader/Preloader";
import Header from "@/components/Header/Header";
import ReviewsCarousel from "@/components/ReviewsCarousel/ReviewsCarousel";
import Button from "@/components/Button/Button";

const MainScreen = ({ data }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapperRef = useRef(null);

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

      <div className={styles.container}>
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

          <div className={styles.buttonsWrapper}>
            <Button title="Проекти" href="#" />
            <Button title="Консультація" href="#" primary />
          </div>
        </div>

        <ReviewsCarousel ref={imageWrapperRef} />
        <div className={styles.overlay} />
      </div>
    </div>
  );
};

export default MainScreen;
