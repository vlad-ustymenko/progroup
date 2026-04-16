"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Developer.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import ReactMarkdown from "react-markdown";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImQuotesLeft } from "react-icons/im";
import remarkBreaks from "remark-breaks";
gsap.registerPlugin(ScrollTrigger);

const Developer = ({ data }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 🔥 TITLE (зліва → вправо)
      gsap.fromTo(
        ".title",
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // 🔥 TEXTS (знизу → вгору)
      gsap.fromTo(
        ".text",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.developer} id="developer">
      <div className={styles.imageWrapper}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${data.image.url}`}
            fill
            alt="developer"
          />
        </div>
      </div>

      <div className={styles.content}>
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          components={{
            p: ({ children }) => (
              <p className={`${styles.title} title`}>{children}</p>
            ),
            strong: ({ children }) => (
              <span style={{ color: "var(--accent)" }}>{children}</span>
            ),
          }}
        >
          {data.title}
        </ReactMarkdown>

        <ImQuotesLeft className={styles.quote} color="var(--accent)" />
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          components={{
            p: ({ children }) => (
              <p className={`${styles.text} text`}>{children}</p>
            ),
            li: ({ children }) => (
              <li className={`${styles.text} text`}>{children}</li>
            ),
          }}
        >
          {data.description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Developer;
