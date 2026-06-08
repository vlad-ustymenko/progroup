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
  const infoRefs = useRef([]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

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
        delay: 0.5,
      });

      gsap.from(btn2Ref.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        delay: 0.8,
      });

      gsap.from(imageWrapperRef.current, {
        scale: 1.1,
        opacity: 0,
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

      gsap.from(infoRefs.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.2,
      });
    }, containerRef);

    window.scrollTo(0, 0);

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
      <Preloader setReady={setReady} ready={ready} />

      <Header data={data.header} />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.grid}>
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
              <Button
                title={data.buttons[0].title}
                href={data.buttons[0].link}
                ref={btn1Ref}
              />
              <Button
                title={data.buttons[1].title}
                href={data.buttons[1].link}
                primary
                ref={btn2Ref}
              />
            </div>
          </div>

          <MainCarousel ref={imageWrapperRef} data={data.carousel} />
        </div>

        <div className={styles.infoWrapper}>
          {data.info.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (infoRefs.current[i] = el)}
              className={styles.info}
            >
              <span className={styles.infoTitle}>{item.title}</span>
              <span className={styles.infoSymbol}>{item.symbol}</span>
              <p className={styles.infoText}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
