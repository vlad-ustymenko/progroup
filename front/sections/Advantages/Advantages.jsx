import React from "react";
import styles from "./Advantages.module.css";
import Card from "@/components/Card/Card";

const Advantages = ({ data }) => {
  const cards = data.new_cards;
  return (
    <div className={styles.advantages}>
      <h2 className={styles.title}>Від ідеї до введення в експлуатацію</h2>
      <p className={styles.subtitle}>
        Ми будуємо не просто площу, а міцний фундамент вашого спокою
      </p>
      <div className={styles.cards}>
        {cards.map((card) => (
          <Card
            key={card.id}
            image={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${card.image.url}`}
            title={card.title}
            subtitle={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Advantages;
