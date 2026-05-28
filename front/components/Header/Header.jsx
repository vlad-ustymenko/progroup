"use client";
import React from "react";
import { gsap } from "gsap";
import { useState, useEffect, useRef } from "react";
import MenuBtn from "../MenuBtn/MenuBtn";
import Image from "next/image";
import styles from "./Header.module.css";

const Header = ({ data }) => {
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

    gsap.from(`.${styles.menuItem}`, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      delay: 3.5,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#" className={styles.logo}>
        <Image src="/logo.svg" alt="" fill></Image>
      </a>
      <div className={styles.menu}>
        {data.map((item) => (
          <a href={item.link} className={styles.menuItem} key={item.id}>
            {item.title}
          </a>
        ))}
        <MenuBtn></MenuBtn>
      </div>
    </div>
  );
};

export default Header;
