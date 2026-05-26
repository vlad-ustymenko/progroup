"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import ArrowIcon from "@/components/ArrowIcon/ArrowIcon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockTitle from "@/components/BlockTitle/BlockTitle";
import Button from "@/components/Button/Button";
import styles from "./FAQ.module.css";

gsap.registerPlugin(ScrollTrigger);

const FAQ = ({ data, categories }) => {
  const [activeId, setActiveId] = useState(null);

  const [activeCategory, setActiveCategory] = useState(
    data.faq_list?.[0]?.faq_category?.slug || "all",
  );

  const sectionRef = useRef(null);

  // 🔥 NEW REFS
  const blockTitleRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const tabsRef = useRef(null);
  const buttonBlockRef = useRef(null);

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
  // STATIC ANIMATION
  // =========================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        blockTitleRef.current,
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blockTitleRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

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

      gsap.fromTo(
        buttonBlockRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: buttonBlockRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =========================
  // DYNAMIC TABS ANIMATION
  // =========================
  useEffect(() => {
    if (!tabsRef.current) return;

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
  }, [activeCategory]);

  return (
    <div ref={sectionRef} className={styles.faq}>
      <div className={styles.container}>
        <BlockTitle ref={blockTitleRef} title={data.blockTitle}></BlockTitle>

        <h2 ref={titleRef} className={styles.title}>
          {data.sectionTitle}
        </h2>

        <div ref={filtersRef} className={styles.filters}>
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFilterChange(item.slug)}
              className={`${styles.filter} ${
                activeCategory === item.slug ? styles.activeFilter : ""
              }`}
              data-content={item.title}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div ref={tabsRef}>
          {filteredData.map((item) => (
            <div
              key={item.id}
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
              >
                <p className={styles.tabContent}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div ref={buttonBlockRef} className={styles.buttonBlock}>
          <div className={styles.textWrapper}>
            <p className={styles.textTitle}>{data.infoTitle}</p>
            <p className={styles.textDescription}>{data.infoText}</p>
          </div>

          <Button
            primary
            title={data.button.title}
            href={data.button.link}
            className={styles.button}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
