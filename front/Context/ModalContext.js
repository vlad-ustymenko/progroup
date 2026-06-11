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
  const [isform, setIsForm] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isPolicy, setIsPolicy] = useState(false);
  const [sending, setSending] = useState(false);

  const openModal = (modalData) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(null);
    setIsForm(false);
    setSending(false);
    setIsProject(false);
    setIsPolicy(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        setSending,
        setIsForm,
        setIsProject,
        setIsPolicy,
        isProject,
        isPolicy,
        data,
        isOpen,
        sending,
        isform,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
