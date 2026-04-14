"use client";
import React, { useState } from "react";
import ArrowIcon from "@/components/ArrowIcon/ArrowIcon";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleTab = (index) => {
    // якщо клік по відкритому — закриваємо
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const data = [
    {
      title: "Чи можна купити квартиру дистанційно?",
      content:
        "Так, ми забезпечуємо повний супровід віддалених угод для інвесторів із Закарпаття, інших регіонів чи з-за кордону. Оформлення документів можливе через електронний підпис (ЕЦП) або за нотаріальною довіреністю. Ми надаємо відеоогляди будівництва та онлайн-консультації на кожному етапі.",
    },
    {
      title: "Як забронювати квартиру в новобудовах?",
      content:
        "Щоб забронювати житло в наших проєктах у Києві, передмісті або Ужгороді, достатньо залишити заявку на сайті. Після консультації ми підписуємо договір бронювання, який фіксує за вами обране планування та ціну на визначений термін. Це гарантує, що квартира не буде продана іншим покупцям, поки ви готуєте документи.",
    },
    {
      title: "Які документи підтверджують надійність будівництва ProGroup? ",
      content:
        "Як девелопер із власним будівельним ресурсом, ми забезпечуємо повну юридичну прозорість. На кожен наш об'єкт у Києві та Закарпатті наявний повний пакет дозвільної документації: право на землю, дозвіл на будівництво та технічні умови на підключення комунікацій. Ознайомитися з документами можна у відділах продажу наших ЖК.",
    },
  ];

  return (
    <div className={styles.faq}>
      <h2 className={styles.title}>Питання та відповіді (FAQ)</h2>

      {data.map((item, index) => (
        <div
          key={index}
          className={styles.tabWrapper}
          onClick={() => toggleTab(index)}
        >
          <div className={styles.tabTitleWrapper}>
            <p
              className={`${styles.tabTitle} ${activeIndex === index ? styles.activeTab : ""}`}
              style={{ paddingBottom: activeIndex == index ? "1.5vw" : "0px" }}
            >
              {item.title}
            </p>
            <ArrowIcon open={activeIndex === index} />
          </div>

          <div
            className={`${styles.tabDescription} ${
              activeIndex === index ? styles.open : ""
            }`}
          >
            <p className={styles.tabContent}>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
