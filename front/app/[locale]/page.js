import qs from "qs";
import { notFound } from "next/navigation";
// import { setRequestLocale } from "next-intl/server";
import styles from "./page.module.css";
import MainScreen from "@/sections/MainScreen/MainScreen";
import About from "@/sections/About/About";
import Developer from "@/sections/Developer/Developer";
import Advantages from "@/sections/Advantages/Advantages";
import FAQ from "@/sections/FAQ/FAQ";
import Projects from "@/sections/Projects/Projects";
import News from "@/sections/News/News";
import Footer from "@/sections/Footer/Footer";
import Menu from "@/components/Menu/Menu";
import Contacts from "@/sections/Contacts/Contacts";

async function getData(path, locale) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        blocks: {
          on: {
            "blocks.main-screen": {
              populate: {
                header: { populate: "*" },
                menu: { populate: "*" },
                buttons: { populate: "*" },
                info: {
                  populate: "*",
                },
                carousel: {
                  populate: {
                    image: {
                      fields: ["url"],
                    },
                  },
                },
              },
            },
            "blocks.about": {
              fields: "*",
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
            "blocks.developer": {
              fields: ["title", "description", "blockTitle"],
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
            "blocks.advantages": {
              populate: {
                advantages_cards: {
                  populate: {
                    advantCardDetail: {
                      populate: "*",
                    },
                  },
                },
              },
            },
            "blocks.faq": {
              populate: {
                faq_list: {
                  populate: {
                    fields: ["title", "description"],
                    faq_category: {
                      fields: ["title", "slug"],
                    },
                  },
                },
                button: { populate: "*" },
              },
            },
            "blocks.projects": {
              populate: {
                projects: {
                  fields: [
                    "title",
                    "rank",
                    "address",
                    "floors",
                    "apartments",
                    "year",
                    "role",
                    "descriptionMore",
                  ],
                  populate: {
                    images: {
                      fields: ["url"],
                    },
                    project_category: {
                      fields: ["title", "slug"],
                    },
                  },
                },
                // button: { populate: "*" },
              },
            },
            "blocks.news": {
              populate: {
                news_cards: {
                  fields: [
                    "title",
                    "description",
                    "titleMore",
                    "descriptionMore",
                  ],
                  populate: {
                    image: {
                      fields: ["url"],
                    },
                  },
                },
                // button: { populate: "*" },
              },
            },
            "blocks.footer": {
              populate: {
                developerInfo: {
                  populate: "*",
                },
                faqInfo: {
                  populate: "*",
                },
              },
            },

            "blocks.contacts": {
              populate: {
                formInput: {
                  populate: "*",
                },
                department: {
                  populate: "*",
                },
                socialIcons: { populate: "*" },
              },
            },
            // "blocks.roadmap": { populate: "*" },
            // "blocks.menu": { populate: "*" },
            // "blocks.modal": { populate: "*" },
            // "blocks.footer": { populate: "*" },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const url = new URL(path, baseUrl);

  url.search = query;

  try {
    const res = await fetch(url.href, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Strapi error: ${res.status} ${res.statusText}`);
      return;
    }

    const data = await res.json();
    return data.data;
  } catch {}
}

async function getCategories(path, locale) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify(
    {
      locale: locale,
      populate: "*",
    },
    { encodeValuesOnly: true },
  );

  const url = new URL(path, baseUrl);

  url.search = query;

  try {
    const res = await fetch(url.href, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Strapi error: ${res.status} ${res.statusText}`);
      return;
    }

    const data = await res.json();
    return data.data;
  } catch {}
}

// ===== Рендер блоку =====

function blockRendered(block, faqCategories, projectCategories) {
  switch (block.__component) {
    case "blocks.main-screen":
      return <MainScreen key={block.id} data={block} />;
    case "blocks.about":
      return <About key={block.id} data={block} />;
    case "blocks.developer":
      return <Developer key={block.id} data={block} />;
    case "blocks.advantages":
      return <Advantages key={block.id} data={block} />;
    case "blocks.faq":
      return <FAQ key={block.id} data={block} categories={faqCategories} />;
    case "blocks.projects":
      return (
        <Projects key={block.id} data={block} categories={projectCategories} />
      );
    case "blocks.news":
      return <News key={block.id} data={block} />;
    case "blocks.contacts":
      return <Contacts key={block.id} data={block} />;
    case "blocks.footer":
      return <Footer key={block.id} data={block} />;
  }
}

// ===== Компонент Home =====

export default async function Home({ params }) {
  const { locale } = await params;
  const strapiData = await getData(process.env.HOME_URL, locale);
  const faqCategories = await getCategories(
    process.env.FAQ_CATEGORIES_URL,
    locale,
  );

  const projectCategories = await getCategories(
    process.env.PROJECT_CATEGORIES_URL,
    locale,
  );

  if (!strapiData) {
    notFound();
  }

  const { blocks } = strapiData;

  const menuData = strapiData.blocks.find(
    (item) => item.__component === "blocks.main-screen",
  )?.menu;

  return (
    <>
      {blocks.map((block) =>
        blockRendered(block, faqCategories, projectCategories),
      )}

      <Menu data={menuData}></Menu>

      {/* <Contacts></Contacts> */}
    </>
    // <>
    //   <MainScreen />
    //   <About />
    //   <Developer />
    //   <Advantages />
    //   <FAQ />
    // </>
  );
}
