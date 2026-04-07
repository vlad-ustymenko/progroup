"use client";
import React from "react";
import { gsap } from "gsap";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const newsRef = useRef(null);
  const contactsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" },
      delay: 3.5,
    });

    tl.from(aboutRef.current, { y: 50, opacity: 0 })
      .from(projectsRef.current, { y: 50, opacity: 0 }, "-=0.6")
      .from(newsRef.current, { y: 50, opacity: 0 }, "-=0.6")
      .from(contactsRef.current, { y: 50, opacity: 0 }, "-=0.6");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>logo</div>
      <div className={styles.menu}>
        <a href="#about" className={styles.menuItem} ref={aboutRef}>
          Про девелопера
        </a>
        <a href="#main" className={styles.menuItem} ref={projectsRef}>
          Проєкти
        </a>
        <a href="#" className={styles.menuItem} ref={newsRef}>
          Новини
        </a>
        <a href="#" className={styles.menuItem} ref={contactsRef}>
          Контакти
        </a>
      </div>
    </div>
  );
};

export default Header;
