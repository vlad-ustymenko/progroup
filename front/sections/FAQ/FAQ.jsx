"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import ArrowIcon from "@/components/ArrowIcon/ArrowIcon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FAQ.module.css";

gsap.registerPlugin(ScrollTrigger);

const FAQ = ({ data, categories }) => {
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(
    data.faq_list?.[0]?.faq_category?.slug || "all",
  );

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const tabsRef = useRef(null);

  const toggleTab = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handleFilterChange = (category) => {
    setActiveCategory(category);
    setActiveId(null);
  };

  const filteredData =
    activeCategory === "all"
      ? data.faq_list
      : data.faq_list.filter(
          (item) => item.faq_category?.slug === activeCategory,
        );

  // =========================
  // STATIC ANIMATION (1 раз)
  // =========================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        filtersRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =========================
  // DYNAMIC TABS ANIMATION
  // (тільки при зміні категорії)
  // =========================
  useEffect(() => {
    if (!tabsRef.current) return;

    // прибираємо старі анімації
    gsap.killTweensOf(tabsRef.current.children);

    gsap.fromTo(
      tabsRef.current.children,
      {
        x: (i) => (i % 2 === 0 ? -100 : 100),
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  }, [activeCategory]); // 🔥 тільки зміна категорії

  return (
    <div ref={sectionRef} className={styles.faq}>
      {/* TITLE */}
      <h2 ref={titleRef} className={styles.title}>
        {data.sectionTitle}
      </h2>

      {/* FILTERS */}
      <div ref={filtersRef} className={styles.filters}>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => handleFilterChange(item.slug)}
            className={`${styles.filter} ${
              activeCategory === item.slug ? styles.activeFilter : ""
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* TABS */}
      <div ref={tabsRef}>
        {filteredData.map((item) => (
          <div
            key={item.id}
            className={styles.tabWrapper}
            onClick={() => toggleTab(item.id)} // ❌ GSAP це ігнорує
          >
            <div className={styles.tabTitleWrapper}>
              <p
                className={`${styles.tabTitle} ${
                  activeId === item.id ? styles.activeTab : ""
                }`}
              >
                {item.title}
              </p>

              <ArrowIcon open={activeId === item.id} />
            </div>

            <div
              className={`${styles.tabDescription} ${
                activeId === item.id ? styles.open : ""
              }`}
              style={{ marginBottom: activeId === item.id ? "1.5vw" : "0px" }}
            >
              <p className={styles.tabContent}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
