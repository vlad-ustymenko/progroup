"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (modalData) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, data, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
