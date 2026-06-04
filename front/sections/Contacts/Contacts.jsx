// import { MapPin, Mail, Phone } from "lucide-react";
import ContactsForm from "../../components/ContactsForm/ContactsForm";
// import SectionTitle from "../SectionTitle/SectionTitle";
// import { socialLinks } from "../../../assets/socialLinks/socialLinks.js";
// import { useTranslations } from "next-intl";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import styles from "./Contacts.module.css";

const Contacts = ({ data }) => {
  console.log(data);
  return (
    <section className={styles.contacts}>
      <div className={styles.container}>
        <BlockTitle title={data.blockTitle} white></BlockTitle>
        <div className={styles.contentWrapper}>
          <div>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.content}>
              <IoIosMail className={styles.icon} />
              <a href={`mailto:info@${data.email}`} className={styles.text}>
                {data.email}
              </a>
            </div>
            <div className={styles.content}>
              <AiFillPhone className={styles.icon} />
              <a href={`tel:${data.phone}`} className={styles.text}>
                {data.phone}
              </a>
            </div>
            <div className={styles.content}>
              <IoLocationSharp className={styles.icon} />
              <a
                href="https://www.google.com.ua/maps/place/PRO-GROUP/@50.433745,30.3703793,13.5z/data=!4m6!3m5!1s0x40d4cbec77bcb20d:0xbf46f52bac4ab343!8m2!3d50.4367781!4d30.3561404!16s%2Fg%2F11y3l11_hb?hl=ru&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className={styles.text}
              >
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {data.address}
                </ReactMarkdown>
              </a>
            </div>
            <div className={styles.content}>
              <MdOutlineAccessTimeFilled className={styles.icon} />
              <div className={styles.text}>{data.time}</div>
            </div>
            <div className={styles.mapWrapper}>
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
    </section>
  );
};

export default Contacts;
