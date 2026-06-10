"use client";
import { useModal } from "@/Context/ModalContext";
import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Modal.module.css";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import Loader from "../Loader/Loader";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  BiLogoInstagramAlt,
  BiLogoFacebookSquare,
  BiLogoTelegram,
} from "react-icons/bi";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Modal = () => {
  const cardSwiperRef = useRef({});
  const { isOpen, data, closeModal, sending, isform, isProject, socialIcons } =
    useModal();
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);
  if (!isOpen || !data) return null;

  console.log(data);

  if (isform) {
    return (
      <div
        className={sending ? styles.sending : styles.modal}
        onClick={closeModal}
      >
        {sending ? (
          <Loader title={data.loaderText}></Loader>
        ) : (
          <div className={styles.formWrapper}>
            <h2 className={styles.title}>Заявку надіслано</h2>
            <p className={styles.formContent}>
              Дякуємо Вам!
              <br /> Найближчим часом наш менеджер зв'яжеться з Вами.
            </p>
            <div className={styles.socialWrapper}>
              <h3 className={styles.socialTitle}>Ми в соцмережах</h3>
              <ul className={styles.socialIcons}>
                <li>
                  <a href={data.socialIcons[0].link}>
                    <BiLogoInstagramAlt className={styles.socialLink} />
                  </a>
                </li>
                <li>
                  <a href={data.socialIcons[1].link}>
                    <BiLogoFacebookSquare className={styles.socialLink} />
                  </a>
                </li>
                <li>
                  <a href={data.socialIcons[2].link}>
                    <BiLogoTelegram className={styles.socialLink} />
                  </a>
                </li>
              </ul>
            </div>
            <IoClose className={styles.closeButton} onClick={closeModal} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageWrapper}>
          {!isProject ? (
            <Image
              className={styles.image}
              src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${data.image.url}`}
              alt=""
              fill
            ></Image>
          ) : (
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              loop={true}
              speed={800}
              onSwiper={(swiper) => {
                cardSwiperRef.current[data.id] = swiper;
              }}
              className={styles.swiperCard}
            >
              {data.images.map((image) => (
                <SwiperSlide key={image.documentId}>
                  <Image
                    className={styles.image}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${image.url}`}
                    alt=""
                    fill
                  />
                </SwiperSlide>
              ))}

              <button
                className={`${styles.cardNav} ${styles.cardPrev}`}
                onClick={() => cardSwiperRef.current[data.id]?.slidePrev()}
              >
                <FaChevronLeft
                  className={`${styles.icon} ${styles.iconLeft}`}
                />
              </button>

              <button
                className={`${styles.cardNav} ${styles.cardNext}`}
                onClick={() => cardSwiperRef.current[data.id]?.slideNext()}
              >
                <FaChevronRight
                  className={`${styles.icon} ${styles.iconRight}`}
                />
              </button>
            </Swiper>
          )}
        </div>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>{data.title}</h2>
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            components={{
              p: ({ children }) => (
                <p className={styles.description}>{children}</p>
              ),
              strong: ({ children }) => (
                <span className={styles.strong}>{children}</span>
              ),
            }}
          >
            {data.descriptionMore}
          </ReactMarkdown>
        </div>
        <IoClose className={styles.closeButton} onClick={closeModal} />
      </div>
    </div>
  );
};

export default Modal;
