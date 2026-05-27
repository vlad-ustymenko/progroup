"use client";
import React from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useModal } from "@/Context/ModalContext";
import { BsDiamond } from "react-icons/bs";
import { BsDiamondHalf } from "react-icons/bs";
import { BsDiamondFill } from "react-icons/bs";

const Card = ({
  title,
  subtitle,
  icon,
  cardNumber,
  backCardList,
  active,
  onClick,
}) => {
  const { openModal } = useModal();

  return (
    <div
      className={`${styles.card} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <div className={`${styles.cardFace} ${styles.front}`}>
        <div className={styles.cardHeaderWrapper}>
          {icon == "diamond" ? (
            <BsDiamond className={styles.icon} />
          ) : icon == "diamondHalf" ? (
            <BsDiamondHalf className={styles.icon} />
          ) : (
            <BsDiamondFill className={styles.icon} />
          )}
          <div className={styles.cardHeaderNumber}>{cardNumber}</div>
        </div>

        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>

        <AiOutlinePlusCircle
          className={styles.button}
          // onClick={() =>
          //   openModal({
          //     title,
          //     description:
          //       "Ми не просто шукаємо вільну ділянку — ми прогнозуємо розвиток району на 10 років вперед. Транспортна логіка: зручний доступ до ключових артерій міста без компромісів із тишею. Інфраструктурний потенціал: наявність садочків, шкіл та парків у кроковій доступності. Екологічний контекст: пріоритет ділянкам поблизу рекреаційних зон, де місто «дихає».",
          //     image,
          //   })
          // }
        />
      </div>
      <div className={`${styles.cardFace} ${styles.back}`}>
        {backCardList.map((item) => (
          <div key={item.id} className={styles.backContent}>
            <div className={styles.backTitle}>{item.title}</div>
            <div className={styles.backText}>{item.text}</div>
          </div>
        ))}
        <AiOutlineMinusCircle className={styles.backButton} />
      </div>
    </div>
  );
};

export default Card;
