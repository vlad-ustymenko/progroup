import React from "react";
import styles from "./Advantages.module.css";
import Card from "@/components/Card/Card";

const Advantages = () => {
  return (
    <div className={styles.advantages}>
      <h2 className={styles.title}>Від ідеї до введення в експлуатацію</h2>
      <p className={styles.subtitle}>
        Ми будуємо не просто площу, а міцний фундамент вашого спокою
      </p>
      <div className={styles.cards}>
        <Card
          image={"/dna2.png"}
          title="Як ми обираємо локацію"
          subtitle="Ми не просто шукаємо вільну ділянку — ми прогнозуємо розвиток району на 10 років вперед."
        />
        <Card
          image={"/dna2.png"}
          title="Як вибираємо будівельні матеріали"
          subtitle="Наше будівельне ДНК не дозволяє економити на тому, що сховано в стінах"
        />
        <Card
          image={"/dna2.png"}
          title="Як проєктуємо благоустрій"
          subtitle="Для нас проєкт не закінчується на порозі під’їзду. Ми створюємо екосистему, де кожен метр працює на ваш комфорт"
        />
      </div>
    </div>
  );
};

export default Advantages;
