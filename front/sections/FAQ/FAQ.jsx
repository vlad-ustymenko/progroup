"use client";
import React, { useState, useRef, useEffect } from "react";
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

  // refs
  const titleRef = useRef(null);
  const filtersContainerRef = useRef(null);
  const filtersRef = useRef([]);
  const tabsContainerRef = useRef(null);
  const tabsRef = useRef([]);

  const toggleTab = (id) => {
    setActiveId(activeId === id ? null : id);
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

  // 🔥 GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // TITLE (окремий trigger)
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // FILTERS (один trigger + stagger)
      gsap.fromTo(
        filtersRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filtersContainerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // TABS (один trigger + stagger + чергування)
      gsap.fromTo(
        tabsRef.current,
        {
          x: (i) => (i % 2 === 0 ? -100 : 100),
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tabsContainerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [filteredData]);

  return (
    <div className={styles.faq}>
      {/* TITLE */}
      <h2 ref={titleRef} className={styles.title}>
        {data.sectionTitle}
      </h2>

      {/* FILTERS */}
      <div ref={filtersContainerRef} className={styles.filters}>
        {categories.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => (filtersRef.current[index] = el)}
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
      <div ref={tabsContainerRef}>
        {filteredData.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (tabsRef.current[index] = el)}
            className={styles.tabWrapper}
            onClick={() => toggleTab(item.id)}
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
              style={{
                marginBottom: activeId === item.id ? "1.5vw" : "0px",
              }}
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
