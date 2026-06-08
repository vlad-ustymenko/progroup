"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import IMask from "imask";
import { useForm, Controller } from "react-hook-form";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import Button from "../Button/Button";
import styles from "./ContactsForm.module.css";
import { useModal } from "@/Context/ModalContext";

const ContactsForm = ({
  departments,
  formInputs,
  inputCommentTitle,
  inputCommentPlaceholder,
  mainError,
  button,
}) => {
  const { openModal, setSending, setIsForm } = useModal();
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const [checkboxRequire, setCheckboxRequire] = useState(false);
  // const [sending, setSending] = useState(false);

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
        setValue("phoneContact", mask.value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });

      return () => mask.destroy();
    }
  }, [setValue]);

  const normalizeEmail = (value) => {
    if (!value) return "";

    return value
      .toLowerCase()
      .replace(/\s/g, "")
      .replace(/[^a-z0-9@._+-]/g, "")
      .replace(/@+/g, "@")
      .replace(/(^[^@]*@[^@]*)@.*/, "$1");
  };

  const isValidPhone = (value) =>
    /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);

  const isValidName = (value) => /^[\p{L}\s]+$/u.test(value);

  const isValidEmail = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  // const departments = [
  //   { title: "Відділ продажів", slug: "sales", mail: "sales@pro-group.ua" },
  //   {
  //     title: "Технічний відділ",
  //     slug: "technical",
  //     mail: "technical@pro-group.ua",
  //   },
  //   {
  //     title: "Бухгалтерія",
  //     slug: "accounting",
  //     mail: "accounting@pro-group.ua",
  //   },
  // ];

  const onSubmit = async (data) => {
    const selectedDepartment = departments.find(
      (item) => item.slug === data.department,
    );

    const departmentMail = selectedDepartment?.email;

    // console.log({
    //   ...data,
    //   departmentMail, // 👈 ОЦЕ ТИ І ХОТІВ
    // });

    setSending(true);
    setIsForm(true);
    openModal({ ...data, departmentMail });

    setTimeout(() => {
      setSending(false);
    }, 5000);
    reset();

    // if (!activeCheckbox) {
    //   setCheckboxRequire(true);
    //   return;
    // }

    // try {
    //   setSending(true);

    //   const response = await fetch("/api/sendMail", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       name: data.nameContact,
    //       email: data.emailContact,
    //       phone: data.phoneContact,
    //       comment: data.commentContact,
    //       department: data.department,
    //       departmentMail, // 👈 ТУТ ВЖЕ Є MAIL
    //     }),
    //   });

    //   if (response.ok) {
    //     reset();
    //     setActiveCheckbox(false);
    //     setDepartmentOpen(false);
    //   }
    // } finally {
    //   setSending(false);
    // }
  };

  const getRules = (field) => {
    const cmsError = field.error;

    switch (field.name) {
      case "nameContact":
        return {
          required: `${mainError}`,
          validate: (v) => isValidName(v) || cmsError,
        };

      case "emailContact":
        return {
          required: `${mainError}`,
          validate: (v) => isValidEmail(v) || cmsError,
        };

      case "phoneContact":
        return {
          required: `${mainError}`,
          validate: (v) => isValidPhone(v) || cmsError,
        };

      default:
        return {
          required: `${mainError}`,
        };
    }
  };

  // const formFields = useMemo(
  //   () => [
  //     {
  //       name: "nameContact",
  //       label: "ВАШЕ ІМ’Я",
  //       placeholder: "ВАШЕ ІМ’Я",
  //       pattern: /^[\p{L}\s]+$/u,
  //       error: "Тільки букви",
  //     },
  //     {
  //       name: "emailContact",
  //       label: "Email",
  //       placeholder: "Email",
  //       pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //       error: "*Невірний формат email",
  //     },
  //     {
  //       name: "phoneContact",
  //       label: "phone",
  //       placeholder: "phone",
  //       ref: phoneInputRef,
  //       pattern: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  //       error: "*Некоректний номер",
  //     },
  //   ],
  //   [],
  // );

  const sanitizeComment = (value) => {
    return value
      .replace(/[<>]/g, "") // блокує < >
      .replace(/<\/?[^>]+(>|$)/g, ""); // блокує HTML теги
  };

  return (
    <form id="form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* INPUTS */}
      {formInputs.map((input) => (
        <div key={input.id} className={styles.formWrapper}>
          <label className={styles.formLabel}>{input.label}</label>

          <div className={styles.formInputWrapper}>
            <Controller
              name={input.name}
              control={control}
              defaultValue=""
              rules={getRules(input)}
              render={({ field }) => (
                <input
                  {...field}
                  ref={
                    field.name === "phoneContact" ? phoneInputRef : undefined
                  }
                  type={field.name === "phoneContact" ? "tel" : undefined}
                  className={styles.formInputField}
                  placeholder={input.placeholder}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (field.name === "nameContact") {
                      value = value.replace(/[^\p{L}\s]/gu, "");
                    }

                    if (field.name === "emailContact") {
                      value = normalizeEmail(value);
                    }

                    field.onChange(value);
                  }}
                />
              )}
            />

            {errors[input.name] && (
              <span className={styles.requiredSpan}>
                {errors[input.name].message}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* DEPARTMENT */}
      <div className={styles.formWrapper}>
        <label className={styles.formLabel}>ВІДДІЛ</label>

        <Controller
          name="department"
          control={control}
          defaultValue=""
          rules={{ required: "*Оберіть відділ" }}
          render={({ field }) => {
            const selectedDepartment = departments.find(
              (item) => item.slug === field.value,
            );

            return (
              <div className={styles.dropdownWrapper}>
                <div
                  className={`${styles.formInputField} ${styles.dropdownInputWrapper}`}
                  onClick={() => setDepartmentOpen((prev) => !prev)}
                >
                  {selectedDepartment?.title || "Оберіть відділ"}

                  <ArrowIcon
                    open={departmentOpen}
                    className={styles.icon}
                    white
                  />
                </div>

                {departmentOpen && (
                  <div className={styles.dropdownList}>
                    {departments.map((department) => (
                      <div
                        key={department.slug}
                        className={styles.dropdownItem}
                        onClick={() => {
                          field.onChange(department.slug);
                          setDepartmentOpen(false);
                        }}
                      >
                        {department.title}
                      </div>
                    ))}
                  </div>
                )}

                {errors.department && (
                  <span className={styles.requiredSpan}>
                    {errors.department.message}
                  </span>
                )}
              </div>
            );
          }}
        />
      </div>

      {/* COMMENT */}
      <div className={styles.formWrapper}>
        <label className={styles.formLabel}>{inputCommentTitle}</label>

        <Controller
          name="commentContact"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              !/[<>]/.test(value) || "Символи < > заборонені",
          }}
          render={({ field }) => (
            <textarea
              {...field}
              className={styles.formInputField}
              placeholder={inputCommentPlaceholder}
              onChange={(e) => {
                const value = sanitizeComment(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
      </div>

      {/* BUTTON */}
      <Button title={button} primary submit className={styles.formButton} />
    </form>
  );
};

export default ContactsForm;
