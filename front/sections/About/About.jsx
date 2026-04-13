"use client";
import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    const INNER_DELAY = 0.12; // 🔥 ТУТ ТИ КОНТРОЛЮЄШ ЗАТРИМКУ

    const ctx = gsap.context(() => {
      // 🔹 PIN
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".wrapper",
      });

      // 🔹 LINE (scrub лишаємо)
      gsap.fromTo(
        ".line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "5% top",
            end: "90% bottom",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        ".title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power5.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
      gsap.fromTo(
        ".subtitle",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          delay: 0.3,
          ease: "power5.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // 🔥 POINTS CONFIG
      const points = [
        {
          inner: ".dot1 .dotInner",
          outer: ".dot1 .dotOut",
          text: ".text1",
          year: ".year1",
          start: "5% center",
        },
        {
          inner: ".dot2 .dotInner",
          outer: ".dot2 .dotOut",
          text: ".text2",
          year: ".year2",
          start: "39% top",
        },
        {
          inner: ".dot3 .dotInner",
          outer: ".dot3 .dotOut",
          text: ".text3",
          year: ".year3",
          start: "73% top",
        },
      ];

      points.forEach((point) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: point.start,
            toggleActions: "play reverse play reverse",
          },
        });

        // 🔸 OUTER DOT (одразу)
        tl.fromTo(
          point.outer,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          },
        );

        // 🔸 INNER DOT (ЗАТРИМКА КОНТРОЛЬОВАНА)
        tl.fromTo(
          point.inner,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          INNER_DELAY, // 🔥 ОЦЕ ЗАМІНА delay
        );

        // 🔥 TEXT
        tl.fromTo(
          point.text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          INNER_DELAY,
        );

        // 🔥 YEAR
        tl.fromTo(
          point.year,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          INNER_DELAY,
        );
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={aboutRef} className={styles.about} id="about">
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.titleWrapper}>
          <h2 className={`${styles.title} title`}>
            Ми пройшли шлях від кожної цеглини до цілих кварталів.
          </h2>
          <h3 className={`${styles.subtitle} subtitle`}>
            Досвід, який формує проєкти
          </h3>
        </div>

        <Image src="/dna2.png" alt="about" fill className={styles.image} />
        <div className={styles.overlay}></div>

        <span className={`${styles.line} line`}></span>

        {/* YEARS */}
        <div className={styles.yearsWrapper}>
          <p className={`${styles.year} year1`}>2015 рік</p>
          <p className={`${styles.year} year2`}>2016 рік</p>
          <p className={`${styles.year} year3`}>2025 рік</p>
        </div>

        {/* CONTENT */}
        <div className={styles.contentWrapper}>
          <div className={`${styles.text} text1`}>
            <p>Підрядник</p>
            <p>
              реалізація різних об’єктів, що дозволило сформувати глибоке
              розуміння будівельних процесів, технологій та управління проєктами
            </p>
          </div>

          <div className={`${styles.text} text2`}>
            <p>Забудовник</p>
            <p>
              реалізація власних проєктів, зокрема житлові комплекси та
              таунхауси
            </p>
          </div>

          <div className={`${styles.text} text3`}>
            <p>Девелопер</p>
            <p>
              реалізація об’єктів у Києві та Київській області, а також - в
              Ужгороді, поєднуємо досвід будівництва з системним підходом до
              створення житлових проєктів
            </p>
          </div>
        </div>

        {/* DOTS */}
        <div className={styles.dotsWrapper}>
          <div className={`${styles.dot} dot1`}>
            <span className={`${styles.dotInner} dotInner`}></span>
            <span className={`${styles.dotOut} dotOut`}></span>
          </div>

          <div className={`${styles.dot} dot2`}>
            <span className={`${styles.dotInner} dotInner`}></span>
            <span className={`${styles.dotOut} dotOut`}></span>
          </div>

          <div className={`${styles.dot} dot3`}>
            <span className={`${styles.dotInner} dotInner`}></span>
            <span className={`${styles.dotOut} dotOut`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
