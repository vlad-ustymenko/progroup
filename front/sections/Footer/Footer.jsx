import Image from "next/image";
import React from "react";
import FullLogo from "@/components/FullLogo/FullLogo";
import {
  BiLogoInstagramAlt,
  BiLogoFacebookSquare,
  BiLogoTelegram,
} from "react-icons/bi";
import styles from "./Footer.module.css";

const Footer = () => {
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
                href="https://www.google.com.ua/maps/place/PRO-GROUP/@50.433745,30.3703793,13.5z/data=!4m6!3m5!1s0x40d4cbec77bcb20d:0xbf46f52bac4ab343!8m2!3d50.4367781!4d30.3561404!16s%2Fg%2F11y3l11_hb?hl=ru&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                className={`${styles.text} ${styles.address}`}
                target="_blank"
              >
                Київська обл., 5км. від Києва с. Софіївська Борщагівка,
                вул.Свободи, 1с
              </a>
            </address>
            <p className={styles.time}>Пн-Нд: 09:00-19:00</p>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.developer}>
              <p className={styles.title}>Девелопер</p>
              <a href="#" className={styles.text}>
                Про нас
              </a>
              <a href="#" className={styles.text}>
                Засновник
              </a>
              <a href="#" className={styles.text}>
                Проєкти
              </a>
              <a href="#" className={styles.text}>
                Новини
              </a>
            </div>
            <div className={styles.faq}>
              <p className={styles.title}>Питання та відповіді</p>
              <a href="#" className={styles.text}>
                Питання та відповіді
              </a>
              <a href="#" className={styles.text}>
                Контакти
              </a>
              <a href="#" className={styles.text}>
                Політика конфіденційності
              </a>
            </div>
          </div>
        </div>
        <div className={styles.copyrightWrapper}>
          <p className={styles.copyright}>
            © 2015 PRO-GROUP. Всі права захищені.
          </p>
          <div className={styles.socialsWrapper}>
            <a href="#">
              <BiLogoInstagramAlt className={styles.social} />
            </a>
            <a href="#">
              <BiLogoFacebookSquare className={styles.social} />
            </a>
            <a href="#">
              <BiLogoTelegram className={styles.social} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
