"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./Projects.module.css";
import BlockTitle from "@/components/BlockTitle/BlockTitle";

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ data, categories }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const mainSwiperRef = useRef(null);
  const cardSwiperRef = useRef({});

  // refs для анімацій
  const sectionRef = useRef(null);
  const blockTitleRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blockTitleRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blockTitleRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(titleRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(filtersRef.current?.children, {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(swiperContainerRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: swiperContainerRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(navigationRef.current, {
        y: 60,
        opacity: 0,
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

  const handleFilterChange = (category) => {
    setActiveCategory(category);
  };

  const filteredData =
    activeCategory === "all"
      ? data.projects
      : data.projects.filter(
          (item) => item.project_category?.slug === activeCategory,
        );

  return (
    <div className={styles.projects} id="projects" ref={sectionRef}>
      <div className={styles.container}>
        <div ref={blockTitleRef}>
          <BlockTitle title="Projects" white />
        </div>

        <div className={styles.titleWrapper}>
          <h2 className={styles.title} ref={titleRef}>
            Наші проєкти
          </h2>

          <div className={styles.filters} ref={filtersRef}>
            <button
              onClick={() => handleFilterChange("all")}
              className={`${styles.filter} ${
                activeCategory === "all" ? styles.activeFilter : ""
              }`}
            >
              Усі
            </button>

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
        </div>

        <div className={styles.swiperContainer} ref={swiperContainerRef}>
          <Swiper
            key={activeCategory}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            speed={800}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            className={styles.swiper}
          >
            {filteredData.map((project) => (
              <SwiperSlide key={project.id}>
                <div className={styles.card}>
                  <div className={styles.cardContent}>
                    <p className={styles.title}>{project.title}</p>

                    <ReactMarkdown
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        p: ({ children }) => (
                          <p className={styles.runk}>{children}</p>
                        ),
                        strong: ({ children }) => (
                          <span
                            style={{
                              color: "var(--accent)",
                              fontFamily: "MontserratBold, sans-serif",
                            }}
                          >
                            {children}
                          </span>
                        ),
                      }}
                    >
                      {project.rank}
                    </ReactMarkdown>

                    <ReactMarkdown
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        p: ({ children }) => (
                          <p className={styles.runk}>{children}</p>
                        ),
                      }}
                    >
                      {project.address}
                    </ReactMarkdown>

                    <div className={styles.infoWrapper}>
                      <ReactMarkdown
                        remarkPlugins={[remarkBreaks]}
                        components={{
                          p: ({ children }) => (
                            <p className={styles.text}>{children}</p>
                          ),
                          strong: ({ children }) => (
                            <span
                              style={{
                                color: "var(--accent)",
                                fontFamily: "MontserratBold, sans-serif",
                                fontSize: "3vw",
                              }}
                            >
                              {children}
                            </span>
                          ),
                        }}
                      >
                        {project.floors}
                      </ReactMarkdown>

                      <ReactMarkdown
                        remarkPlugins={[remarkBreaks]}
                        components={{
                          p: ({ children }) => (
                            <p className={styles.text}>{children}</p>
                          ),
                          strong: ({ children }) => (
                            <span
                              style={{
                                color: "var(--accent)",
                                fontFamily: "MontserratBold, sans-serif",
                                fontSize: "3vw",
                              }}
                            >
                              {children}
                            </span>
                          ),
                        }}
                      >
                        {project.apartments}
                      </ReactMarkdown>
                    </div>

                    <ReactMarkdown
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        p: ({ children }) => (
                          <p className={styles.runk}>{children}</p>
                        ),
                        strong: ({ children }) => (
                          <span
                            style={{
                              color: "var(--accent)",
                              fontFamily: "MontserratBold, sans-serif",
                              fontSize: "2vw",
                            }}
                          >
                            {children}
                          </span>
                        ),
                      }}
                    >
                      {project.year}
                    </ReactMarkdown>

                    <ReactMarkdown
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        p: ({ children }) => (
                          <p className={styles.role}>{children}</p>
                        ),
                        strong: ({ children }) => (
                          <span
                            style={{
                              color: "var(--accent)",
                              fontFamily: "MontserratBold, sans-serif",
                              fontSize: "1vw",
                            }}
                          >
                            {children}
                          </span>
                        ),
                      }}
                    >
                      {project.role}
                    </ReactMarkdown>
                  </div>

                  <Swiper
                    modules={[Pagination]}
                    slidesPerView={1}
                    loop={true}
                    speed={800}
                    onSwiper={(swiper) => {
                      cardSwiperRef.current[project.id] = swiper;
                    }}
                    className={styles.swiperCard}
                  >
                    {project.images.map((image) => (
                      <SwiperSlide key={image.documentId}>
                        <div className={styles.imageWrapper}>
                          <Image
                            className={styles.image}
                            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${image.url}`}
                            alt=""
                            fill
                          />
                        </div>
                      </SwiperSlide>
                    ))}

                    <button
                      className={`${styles.cardNav} ${styles.cardPrev}`}
                      onClick={() =>
                        cardSwiperRef.current[project.id]?.slidePrev()
                      }
                    >
                      <FaChevronLeft />
                    </button>

                    <button
                      className={`${styles.cardNav} ${styles.cardNext}`}
                      onClick={() =>
                        cardSwiperRef.current[project.id]?.slideNext()
                      }
                    >
                      <FaChevronRight />
                    </button>
                  </Swiper>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {filteredData.length > 1 && (
          <div className={styles.navigation} ref={navigationRef}>
            <FaChevronLeft
              className={styles.navBtn}
              onClick={() => mainSwiperRef.current?.slidePrev()}
            />

            <div className={`custom-pagination ${styles.pagination}`} />

            <FaChevronRight
              className={styles.navBtn}
              onClick={() => mainSwiperRef.current?.slideNext()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
