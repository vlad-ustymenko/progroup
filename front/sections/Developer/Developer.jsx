"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Developer.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImQuotesLeft } from "react-icons/im";

gsap.registerPlugin(ScrollTrigger);

const Developer = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 🔥 TITLE (зліва → вправо)
      gsap.fromTo(
        ".title",
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // 🔥 TEXTS (знизу → вгору)
      gsap.fromTo(
        ".text",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.developer} id="developer">
      <div className={styles.imageWrapper}>
        <div className={styles.image}>
          <Image src="/developer.svg" fill alt="developer" />
        </div>
      </div>

      <div className={styles.content}>
        <ImQuotesLeft className={styles.quote} color="var(--accent)" />
        <p className={`${styles.title} title`}>
          Ми будуємо квадратні метри.
          <br />
          <span>Але для нас це не просто площа</span>
        </p>

        <p className={`${styles.text} text`}>
          Це — міцний фундамент, на якому тримається ваш спокій.
        </p>

        <p className={`${styles.text} text`}>
          Це — стіни, які формують ваш комфорт щодня.
        </p>

        <p className={`${styles.text} text`}>
          Це — простір, у якому з’являється життя.
        </p>

        <p className={`${styles.text} text`}>
          Ми працюємо з тим, що можна виміряти — але створюємо те, що
          відчувається.
        </p>
      </div>
    </div>
  );
};

export default Developer;
