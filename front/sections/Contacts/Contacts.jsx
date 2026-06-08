"use client";

import ContactsForm from "../../components/ContactsForm/ContactsForm";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contacts.module.css";

gsap.registerPlugin(ScrollTrigger);

const Contacts = ({ data }) => {
  const sectionRef = useRef(null);

  const blockTitleRef = useRef(null);
  const titleRef = useRef(null);
  const mapRef = useRef(null);
  const formRef = useRef(null);
  const contentRefs = useRef([]);

  const addToContentRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      gsap.from(blockTitleRef.current, {
        opacity: 0,
        x: -80,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blockTitleRef.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        x: -80,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      contentRefs.current.forEach((el) => {
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
              start: "top 100%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.from(mapRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      gsap.from(formRef.current, {
        opacity: 0,
        x: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section id="contacts" ref={sectionRef} className={styles.contacts}>
      <div className={styles.container}>
        <div ref={blockTitleRef}>
          <BlockTitle title={data.blockTitle} white />
        </div>

        <div className={styles.contentWrapper}>
          <div>
            <div ref={titleRef} className={styles.title}>
              {data.title}
            </div>

            <div className={styles.content} ref={addToContentRefs}>
              <IoIosMail className={styles.icon} />
              <a href={`mailto:info@${data.email}`} className={styles.text}>
                {data.email}
              </a>
            </div>

            <div ref={addToContentRefs} className={styles.content}>
              <AiFillPhone className={styles.icon} />
              <a href={`tel:${data.phone}`} className={styles.text}>
                {data.phone}
              </a>
            </div>

            <div ref={addToContentRefs} className={styles.content}>
              <IoLocationSharp className={styles.icon} />
              <a
                href="https://www.google.com.ua/maps/place/PRO-GROUP/@50.433745,30.3703793,13.5z/data=!4m6!3m5!1s0x40d4cbec77bcb20d:0xbf46f52bac4ab343!8m2!3d50.4367781!4d30.3561404!16s%2Fg%2F11y3l11_hb?hl=ru&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.text}
              >
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {data.address}
                </ReactMarkdown>
              </a>
            </div>

            <div
              ref={addToContentRefs}
              className={`${styles.content} ${styles.last}`}
            >
              <MdOutlineAccessTimeFilled className={styles.icon} />
              <div className={styles.text}>{data.time}</div>
            </div>

            <div ref={mapRef} className={styles.mapWrapper}>
              <a
                href="https://www.google.com/maps/place/PRO-GROUP/@50.4367781,30.3561404,17z"
                target="_blank"
                rel="noopener noreferrer"
              >
                <iframe
                  src="https://www.google.com/maps?q=PRO-GROUP,+вулиця+Соборна,+2В,+Петропавлівська+Борщагівка&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
          </div>

          <div ref={formRef}>
            <ContactsForm
              departments={data.department}
              formInputs={data.formInput}
              inputCommentTitle={data.inputCommentTitle}
              inputCommentPlaceholder={data.inputCommentPlaceholder}
              mainError={data.mainError}
              button={data.button}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
