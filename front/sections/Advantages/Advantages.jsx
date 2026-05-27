"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Advantages.module.css";
import Card from "@/components/Card/Card";
import BlockTitle from "@/components/BlockTitle/BlockTitle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Advantages = ({ data }) => {
  const cards = data.advantages_cards;
  const [activeCard, setActiveCard] = useState(null);

  const sectionRef = useRef(null);
  const blockTitleRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blockTitleRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blockTitleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(titleRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(subtitleRef.current, {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray(`.${styles.cardItem}`).forEach((el) => {
        gsap.from(el, {
          x: -60,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.advantages}>
      <div className={styles.container}>
        <BlockTitle ref={blockTitleRef} title="Наш підхід" />

        <div className={styles.titleWrapper}>
          <h2 ref={titleRef} className={styles.title}>
            Від ідеї до введення в експлуатацію
          </h2>

          <p ref={subtitleRef} className={styles.subtitle}>
            Ми будуємо не просто площу, а міцний фундамент вашого спокою
          </p>
        </div>

        <div className={styles.cards}>
          {cards.map((card) => (
            <div key={card.id} className={styles.cardItem}>
              <Card
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
                cardNumber={card.cardNumber}
                active={activeCard === card.id}
                onClick={() =>
                  setActiveCard((prev) => (prev === card.id ? null : card.id))
                }
                backCardList={card.advantCardDetail}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advantages;
