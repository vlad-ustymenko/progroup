import React from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import { FaCirclePlus } from "react-icons/fa6";

const Card = ({ image, title, subtitle }) => {
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
      <FaCirclePlus className={styles.button} />
    </div>
  );
};

export default Card;
