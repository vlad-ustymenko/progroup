"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import IMask from "imask";
// import {
//   Check,
//   Mail,
//   Phone,
//   CircleUserRound,
//   MessageCircleMore,
// } from "lucide-react";
// import { useModalContext } from "@/context/ModalContext";
import { useForm, Controller } from "react-hook-form";
import styles from "./ContactsForm.module.css";

const ContactsForm = () => {
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const [checkboxRequire, setCheckboxRequire] = useState(false);
  const [sending, setSending] = useState(false);
  // const { setActiveModal, setLoading } = useModalContext();
  const phoneInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (phoneInputRef.current) {
      const mask = IMask(phoneInputRef.current, {
        mask: "+38 (000) 000-00-00",
      });

      mask.on("accept", () => {
        setValue("phoneContact", mask.value, { shouldValidate: true });
      });

      return () => mask.destroy();
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!activeCheckbox) {
      setCheckboxRequire(true);
      return;
    }

    try {
      setActiveModal(true);
      setLoading(true);
      setSending(true);
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.nameContact,
          email: data.emailContact,
          phone: data.phoneContact,
          comment: data.commentContact,
        }),
      });

      if (response.ok) {
        reset();
        setActiveCheckbox(false);
      } else {
        alert(t("error"));
        setSending(false);
        setLoading(false);
      }
    } catch (error) {
      alert("Щось пішло не так. Спробуйте пізніше.");
    } finally {
      setLoading(false);
      setSending(false);
    }
  };

  const formFields = useMemo(
    () => [
      {
        name: "nameContact",
        label: "ВАШЕ ІМ’Я",
        placeholder: "ВАШЕ ІМ’Я",
        // icon: CircleUserRound,
        pattern: /^[\p{L}\s]+$/u,
        error: "",
      },
      {
        name: "emailContact",
        label: "Email",
        placeholder: "Email",
        // icon: Mail,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        error: "email",
      },
      {
        name: "phoneContact",
        label: "phone",
        placeholder: "phone",
        // icon: Phone,
        ref: phoneInputRef,
        pattern: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        error: "format",
      },
    ],
    [],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {formFields.map(
        ({ name, placeholder, label, icon: Icon, pattern, error, ref }) => (
          <div key={name} className={styles.formWrapper}>
            <label htmlFor={name} className={styles.formLabel}>
              {label}
            </label>
            <div className={styles.formInputWrapper}>
              <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={{
                  required: "required",
                  pattern: { value: pattern, message: error },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id={name}
                    ref={ref}
                    className={`${styles.formInputField} ${styles.formInputField}`}
                    placeholder={placeholder}
                  />
                )}
              />
              {errors[name] && (
                <span className={styles.requiredSpan}>
                  {errors[name].message}
                </span>
              )}
              {/* <Icon className={styles.formIcon} /> */}
            </div>
          </div>
        ),
      )}

      <div className={styles.formWrapper}>
        <label htmlFor="commentContact" className={styles.formLabel}>
          comment
        </label>
        <div className={styles.formInputWrapper}>
          <Controller
            name="commentContact"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  id="commentContact"
                  className={styles.formInputField}
                  placeholder="comment"
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(
                      /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s.,!*()?'"-]/g,
                      "",
                    );
                    field.onChange(sanitizedValue);
                  }}
                />
                {errors.commentContact && (
                  <span className={styles.requiredSpan}>
                    {errors.commentContact.message}
                  </span>
                )}
              </>
            )}
          />
          {/* <MessageCircleMore className={styles.formIcon} /> */}
        </div>
      </div>

      <div className={styles.personalDataWrapper}>
        <div
          className={`${styles.personalDataCheckbox} ${
            activeCheckbox && styles.active
          } ${checkboxRequire && styles.checkboxRequire}`}
          onClick={() => {
            setActiveCheckbox(!activeCheckbox);
            setCheckboxRequire(false);
          }}
        >
          {activeCheckbox && <Check className={styles.checked} />}
        </div>
        <p
          className={`${styles.personalDataText} ${
            checkboxRequire && styles.textRequire
          }`}
        >
          check
          <a href="#" className={styles.personalDataLink}>
            privacy
          </a>
        </p>
      </div>

      <button
        aria-label="submit"
        type="submit"
        className={styles.formButton}
        disabled={sending}
        style={{ backgroundColor: sending ? "gray" : "" }}
      >
        {sending ? "sendingText" : "buttonText"}
      </button>
    </form>
  );
};

export default ContactsForm;
