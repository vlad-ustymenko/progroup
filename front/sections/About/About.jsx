"use client";
import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockTitle from "@/components/BlockTitle/BlockTitle";

gsap.registerPlugin(ScrollTrigger);

const About = ({ data }) => {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    const INNER_DELAY = 0.12;

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
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "5% top",
            end: "90% bottom",
            scrub: true,
          },
        },
      );

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
          start: "29% top",
        },
        {
          inner: ".dot3 .dotInner",
          outer: ".dot3 .dotOut",
          text: ".text3",
          year: ".year3",
          start: "55% top",
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
      <div className={`${styles.container} wrapper`}>
        <div className={styles.content}>
          <BlockTitle title="Досвід, який формує проєкти" white></BlockTitle>
          <h2 className={`${styles.title} title`}>{data.sectionTitle}</h2>

          <div className={styles.contentWrapper}>
            <span className={`${styles.line} line`}></span>

            <div className={`${styles.dot} dot1`}>
              <span className={`${styles.dotInner} dotInner`}></span>
              <span className={`${styles.dotOut} dotOut`}></span>
            </div>
            <div className={`${styles.textWrapper} text1`}>
              <p className={styles.year}>2015</p>
              <p className={styles.role}>{data.role1}</p>
              <p className={styles.text}>{data.role1text}</p>
            </div>
            <div className={`${styles.dot} dot2`}>
              <span className={`${styles.dotInner} dotInner`}></span>
              <span className={`${styles.dotOut} dotOut`}></span>
            </div>
            <div className={`${styles.textWrapper} text2`}>
              <p className={styles.year}>2025</p>
              <p className={styles.role}>{data.role2}</p>
              <p className={styles.text}>{data.role2text}</p>
            </div>
            <div className={`${styles.dot} dot3`}>
              <span className={`${styles.dotInner} dotInner`}></span>
              <span className={`${styles.dotOut} dotOut`}></span>
            </div>
            <div className={`${styles.textWrapper} text3`}>
              <p className={styles.year}>2026</p>
              <p className={styles.role}>{data.role3}</p>
              <p className={styles.text}>{data.role3text}</p>
            </div>

            {/* DOTS */}
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <Image
              src="/dna.jpg"
              fill
              alt="developer"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
