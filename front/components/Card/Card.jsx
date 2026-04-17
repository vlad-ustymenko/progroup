"use client";
import React from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import { FaCirclePlus } from "react-icons/fa6";
import { useModal } from "@/Context/ModalContext";

const Card = ({ image, title, subtitle }) => {
  const { openModal } = useModal();

  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={image}
        alt=""
        width={100}
        height={100}
      ></Image>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <FaCirclePlus
        className={styles.button}
        onClick={() =>
          openModal({
            title,
            description:
              "Ми не просто шукаємо вільну ділянку — ми прогнозуємо розвиток району на 10 років вперед. Транспортна логіка: зручний доступ до ключових артерій міста без компромісів із тишею. Інфраструктурний потенціал: наявність садочків, шкіл та парків у кроковій доступності. Екологічний контекст: пріоритет ділянкам поблизу рекреаційних зон, де місто «дихає».",
            image,
          })
        }
      />
    </div>
  );
};

export default Card;
