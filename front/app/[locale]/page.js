import qs from "qs";
import { notFound } from "next/navigation";
// import { setRequestLocale } from "next-intl/server";
import styles from "./page.module.css";
import MainScreen from "@/sections/MainScreen/MainScreen";
import About from "@/sections/About/About";
import Developer from "@/sections/Developer/Developer";
import Advantages from "@/sections/Advantages/Advantages";
import FAQ from "@/sections/FAQ/FAQ";
import { FiEdit } from "react-icons/fi";

async function getData(path, locale) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        blocks: {
          on: {
            "blocks.main-screen": {
              populate: "*",
            },
            "blocks.about": { populate: "*" },
            "blocks.developer": {
              fields: ["title", "description"],
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
            "blocks.advantages": {
              populate: {
                new_cards: {
                  populate: {
                    image: {
                      fields: ["url"],
                    },
                  },
                },
              },
            },
            // "blocks.reviews": { populate: "*" },
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

// ===== Рендер блоку =====

function blockRendered(block) {
  switch (block.__component) {
    case "blocks.main-screen":
      return <MainScreen key={block.id} data={block} />;
    case "blocks.about":
      return <About key={block.id} data={block} />;
    case "blocks.developer":
      return <Developer key={block.id} data={block} />;
    case "blocks.advantages":
      return <Advantages key={block.id} data={block} />;
    // case "blocks.faq":
    // 	return <FAQ key={block.id} data={block} />;
  }
}

// ===== Компонент Home =====

export default async function Home({ params }) {
  const { locale } = await params;
  const strapiData = await getData(process.env.HOME_URL, locale);

  if (!strapiData) {
    notFound();
  }

  const { blocks } = strapiData;

  console.log(blocks);

  return (
    <>
      {blocks.map((block) => blockRendered(block))}
      {/* <Advantages /> */}
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
