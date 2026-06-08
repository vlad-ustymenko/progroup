"use client";
import { useModal } from "@/Context/ModalContext";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./Modal.module.css";
import Loader from "../Loader/Loader";

const Modal = () => {
  const { isOpen, data, closeModal, sending, isform } = useModal();
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);
  if (!isOpen || !data) return null;

  console.log(data);

  if (isform) {
    return (
      <div className={styles.modal} onClick={closeModal}>
        {sending ? (
          <Loader></Loader>
        ) : (
          <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imageWrapper}>
              {/* <Image className={styles.image} src={data.image} alt="" fill></Image> */}
            </div>
            <div className={styles.modalContent}>
              <h2 className={styles.title}>qwd</h2>
              <p className={styles.description}>qwd</p>
            </div>
            <button className={styles.closeButton} onClick={closeModal}>
              Закрити
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageWrapper}>
          {/* <Image
            className={styles.image}
            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${data.image.url}`}
            alt=""
            fill
          ></Image> */}
        </div>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.description}>{data.descriptionMore}</p>
        </div>
        <button className={styles.closeButton} onClick={closeModal}>
          Закрити
        </button>
      </div>
    </div>
  );
};

export default Modal;
