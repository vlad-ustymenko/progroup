"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import gsap from "gsap";
import styles from "./MainCarousel.module.css";
import Image from "next/image";
// import Arrow from "../Arrow/Arrow";

export default function MainCarousel({ ref, data }) {
  const [index, setIndex] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const cardsRef = useRef([]);

  // відслідковуємо ширину
  useEffect(() => {
    const updateWidth = () => setViewWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // позиції слайдів залежно від розміру
  const positions = useMemo(() => {
    const configs = {
      mobile: [
        { scale: 0.6, xPercent: -30, opacity: 0.6, zIndex: 3 },
        { scale: 1, xPercent: 0, opacity: 1, zIndex: 5 },
        { scale: 0.6, xPercent: 30, opacity: 0.6, zIndex: 4 },
      ],
      desktop: [
        { scale: 0.8, xPercent: -22, opacity: 0.4, zIndex: 4 },
        { scale: 1, xPercent: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, xPercent: 22, opacity: 0.4, zIndex: 4 },
      ],
      tablet: [
        { scale: 0.8, xPercent: -20, opacity: 0.6, zIndex: 4 },
        { scale: 1, xPercent: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, xPercent: 20, opacity: 0.6, zIndex: 4 },
      ],
    };
    return viewWidth < 768
      ? configs.mobile
      : viewWidth > 1919
        ? configs.desktop
        : configs.tablet;
  }, [viewWidth]);

  // обчислюємо позицію для слайда
  const getPosition = useCallback(
    (i) => (i - index + data.length) % data.length,
    [index, data.length],
  );

  // анімація при зміні index
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const posIndex = getPosition(i);
      const { scale, xPercent, opacity, zIndex } = positions[posIndex];

      gsap.to(card, {
        scale,
        xPercent: xPercent,
        opacity,
        duration: 0.6,
        ease: "power2.inOut",
      });
      card.style.zIndex = String(zIndex);
    });
  }, [index, positions, getPosition]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  // свайп

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel} ref={ref}>
      <div className={styles.wrapper}>
        {data.map((card, i) => (
          <div
            className={styles.card}
            key={card.id}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <Image
              className={styles.image}
              fill
              src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${card.image.url}`}
              alt=""
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
}
