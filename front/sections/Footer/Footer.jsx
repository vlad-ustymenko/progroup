"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import React from "react";
import FullLogo from "@/components/FullLogo/FullLogo";
import {
  BiLogoInstagramAlt,
  BiLogoFacebookSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { useModal } from "@/Context/ModalContext";
import styles from "./Footer.module.css";

const Footer = ({ data }) => {
  const { openModal, setIsPolicy } = useModal();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.developerInfo}>
            <a href="#" className={styles.logo}>
              <FullLogo className={styles.image}></FullLogo>
            </a>
            <address className={styles.address}>
              <a
                href={data.addressLink}
                className={`${styles.text} ${styles.address}`}
                target="_blank"
              >
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {data.address}
                </ReactMarkdown>
              </a>
            </address>
            <p className={styles.time}>{data.time}</p>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.developer}>
              <p className={styles.title}>{data.developerTitle}</p>
              {data.developerInfo?.map((info, index) => (
                <a key={index} href={info.link} className={styles.text}>
                  {info.title}
                </a>
              ))}
            </div>
            <div className={styles.faq}>
              <p className={styles.title}>{data.faqTitle}</p>
              {data.faqInfo?.map((info) =>
                info.title === "Політика конфіденційності" ? (
                  <div
                    key={info.id}
                    className={styles.text}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsPolicy(true);
                      openModal(data.policy);
                    }}
                  >
                    {info.title}
                  </div>
                ) : (
                  <a key={info.id} href={info.link} className={styles.text}>
                    {info.title}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
        <div className={styles.copyrightWrapper}>
          <p className={styles.copyright}>{data.copyright}</p>
          <div className={styles.socialsWrapper}>
            <a href={data.instagramLink} target="_blank">
              <BiLogoInstagramAlt className={styles.social} />
            </a>
            <a href={data.facebookLink} target="_blank">
              <BiLogoFacebookSquare className={styles.social} />
            </a>
            <a href={data.youTubeLink} target="_blank">
              <BiLogoYoutube className={styles.social} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
