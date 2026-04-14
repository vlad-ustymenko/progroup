"use client";
import { useModal } from "@/Context/ModalContext";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./Modal.module.css";

const Modal = () => {
  const { isOpen, data, closeModal } = useModal();
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);
  if (!isOpen || !data) return null;

  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageWrapper}>
          <Image className={styles.image} src={data.image} alt="" fill></Image>
        </div>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.description}>{data.description}</p>
        </div>
        <button className={styles.closeButton} onClick={closeModal}>
          Закрити
        </button>
      </div>
    </div>
  );
};

export default Modal;
