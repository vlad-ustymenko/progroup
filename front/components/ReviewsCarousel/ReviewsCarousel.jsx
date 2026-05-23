"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import gsap from "gsap";
import styles from "./ReviewsCarousel.module.css";
import Image from "next/image";
// import Arrow from "../Arrow/Arrow";

export default function ReviewsCarousel({ ref }) {
  const [index, setIndex] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const cardsRef = useRef([]);
  const startX = useRef(null);
  const endX = useRef(null);

  const list = [
    { image: "/dna.jpg" },
    { image: "/dna2.png" },
    { image: "/main.jpg" },
  ];
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
        { scale: 0.6, x: -100, opacity: 0, zIndex: 3 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 60, opacity: 0.6, zIndex: 4 },
      ],
      desktop: [
        { scale: 0.8, x: -250, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 250, opacity: 0.6, zIndex: 4 },
      ],
      tablet: [
        { scale: 0.8, x: -200, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 200, opacity: 0.6, zIndex: 4 },
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
    (i) => (i - index + list.length) % list.length,
    [index, list.length],
  );

  // анімація при зміні index
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const posIndex = getPosition(i);
      const { scale, x, opacity, zIndex } = positions[posIndex];

      gsap.to(card, {
        scale,
        x,
        opacity,
        duration: 0.6,
        ease: "power2.inOut",
      });
      card.style.zIndex = String(zIndex);
    });
  }, [index, positions, getPosition]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  // свайп
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;
    if (startX.current !== null && endX.current !== null) {
      const diff = startX.current - endX.current;
      if (diff > 70) {
        handleNext(); // свайп вліво
      } else if (diff < -70) {
        handlePrev(); // свайп вправо
      }
    }
    startX.current = null;
    endX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel} ref={ref}>
      {list.map((card, i) => (
        <div
          className={styles.card}
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
        >
          <Image className={styles.image} fill src={card.image} alt=""></Image>
        </div>
      ))}
      {/* 
        <Arrow direction="left" onClick={handlePrev} className={styles.prev} />
        <Arrow direction="right" onClick={handleNext} className={styles.next} /> */}
    </div>
  );
}
