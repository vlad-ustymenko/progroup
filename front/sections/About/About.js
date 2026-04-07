"use client";
import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!aboutRef.current || !imageRef.current || !lineRef.current) return;

    // pin
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: imageRef.current,
      scrub: true,
    });

    // анімація лінії
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center", // 🔥 ключовий момент
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          end: "90% bottom",
          scrub: true,
          markers: true,
        },
      },
    );
  }, []);

  return (
    <div ref={aboutRef} className={styles.about} id="about">
      <div className={styles.wrapper} ref={imageRef}>
        <Image src="/dna2.png" alt="about" fill className={styles.image} />
        <div className={styles.overlay}></div>
        <span className={styles.line} ref={lineRef}></span>
      </div>
    </div>
  );
};

export default About;
