"use client";

import React, { useRef, useEffect } from "react";
import BlockTitle from "@/components/BlockTitle/BlockTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from "next/image";
import styles from "./News.module.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const cards = [
    {
      image: "/dna2.png",
      cardTitle: "Будинок майбутнього з ProGroup",
      cardDescription:
        "Для нас проєкт не закінчується на порозі під’їзду. Ми створюємо екосистему, де кожен метр працює на ваш комфорт",
    },
    {
      image: "/dna2.png",
      cardTitle: "Будинок майбутнього з ProGroup",
      cardDescription:
        "Для нас проєкт не закінчується на порозі під’їзду. Ми створюємо екосистему, де кожен метр працює на ваш комфорт",
    },
    {
      image: "/dna2.png",
      cardTitle: "Будинок майбутнього з ProGroup",
      cardDescription:
        "Для нас проєкт не закінчується на порозі під’їзду. Ми створюємо екосистему, де кожен метр працює на ваш комфорт",
    },
    {
      image: "/dna2.png",
      cardTitle: "Будинок майбутнього з ProGroup",
      cardDescription:
        "Для нас проєкт не закінчується на порозі під’їзду. Ми створюємо екосистему, де кожен метр працює на ваш комфорт",
    },
    {
      image: "/dna2.png",
      cardTitle: "Будинок майбутнього з ProGroup",
      cardDescription:
        "Для нас проєкт не закінчується на порозі під’їзду. Ми створюємо екосистему, де кожен метр працює на ваш комфорт",
    },
  ];

  const mainSwiperRef = useRef(null);

  // refs для анімацій
  const sectionRef = useRef(null);
  const blockTitleRef = useRef(null);
  const titleRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const navigationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blockTitleRef.current, {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blockTitleRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        x: -80,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cardsRef.current.filter(Boolean), {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: swiperContainerRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(navigationRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: navigationRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.news} ref={sectionRef}>
      <div className={styles.container}>
        <div ref={blockTitleRef}>
          <BlockTitle title="Новини" />
        </div>

        <div ref={titleRef} className={styles.title}>
          Будь в курсі подій та пропозицій
        </div>

        <div className={styles.swiperContainer} ref={swiperContainerRef}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            speed={800}
            pagination={{
              clickable: true,
              el: ".custom-pagination2",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1025: {
                slidesPerView: 3,
              },
            }}
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            className={styles.swiper}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div
                  className={styles.card}
                  ref={(el) => (cardsRef.current[index] = el)}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      className={styles.image}
                      src={card.image}
                      alt=""
                      fill
                    />
                  </div>

                  <div className={styles.contentWrapper}>
                    <div className={styles.cardTitle}>{card.cardTitle}</div>

                    <div className={styles.cardDescription}>
                      {card.cardDescription}
                    </div>

                    <div className={styles.button}>більше</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.navigation} ref={navigationRef}>
          <FaChevronLeft
            className={styles.navBtn}
            onClick={() => mainSwiperRef.current?.slidePrev()}
          />

          <div className={`custom-pagination2 ${styles.pagination}`} />

          <FaChevronRight
            className={styles.navBtn}
            onClick={() => mainSwiperRef.current?.slideNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default News;
