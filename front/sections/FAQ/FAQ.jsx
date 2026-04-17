"use client";
import React, { useState } from "react";
import ArrowIcon from "@/components/ArrowIcon/ArrowIcon";
import styles from "./FAQ.module.css";

const FAQ = ({ data, categories }) => {
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(
    data.faq_list[0].faq_category.slug,
  );

  const toggleTab = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleFilterChange = (category) => {
    setActiveCategory(category);
    setActiveId(null); // закриваємо відкритий таб при зміні фільтра
  };

  const filteredData =
    activeCategory === "all"
      ? data
      : data.faq_list.filter(
          (item) => item.faq_category.slug === activeCategory,
        );

  console.log(data);

  return (
    <div className={styles.faq}>
      <h2 className={styles.title}>{data.sectionTitle}</h2>

      {/* ФІЛЬТРИ */}
      <div className={styles.filters}>
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

      {/* СПИСОК */}
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
            style={{
              marginBottom: activeId === item.id ? "1.5vw" : "0px",
            }}
          >
            <p className={styles.tabContent}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
