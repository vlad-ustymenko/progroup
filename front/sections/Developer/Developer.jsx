"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Developer.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import ReactMarkdown from "react-markdown";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImQuotesLeft } from "react-icons/im";
import remarkBreaks from "remark-breaks";
import BlockTitle from "@/components/BlockTitle/BlockTitle";

gsap.registerPlugin(ScrollTrigger);

const Developer = ({ data }) => {
  const blockTitleRef = useRef(null);
  const imageRef = useRef(null);

  const titleRefs = useRef([]);
  const textRefs = useRef([]);

  // helpers
  const addToTitleRefs = (el) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔥 IMAGE
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // 🔥 BLOCK TITLE
      gsap.fromTo(
        blockTitleRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blockTitleRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // 🔥 TITLES (ReactMarkdown)
      titleRefs.current.forEach((el) => {
        gsap.fromTo(
          el,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });

      // 🔥 TEXTS
      textRefs.current.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      titleRefs.current = [];
      textRefs.current = [];
    };
  }, []);

  return (
    <div className={styles.developer} id="developer">
      <div className={styles.container}>
        <div className={styles.imageWrapper} ref={imageRef}>
          <div className={styles.image}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${data.image.url}`}
              fill
              alt="developer"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className={styles.content}>
          <BlockTitle title={data.blockTitle} ref={blockTitleRef} />

          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            components={{
              p: ({ children }) => (
                <p ref={addToTitleRefs} className={styles.title}>
                  {children}
                </p>
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
                <p ref={addToTextRefs} className={styles.text}>
                  {children}
                </p>
              ),
              li: ({ children }) => (
                <li ref={addToTextRefs} className={styles.text}>
                  {children}
                </li>
              ),
            }}
          >
            {data.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Developer;
