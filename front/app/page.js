import qs from "qs";
import { notFound } from "next/navigation";
// import { setRequestLocale } from "next-intl/server";
import styles from "./page.module.css";

async function getData(path) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify(
    {
      locale: "uk",
      populate: {
        blocks: {
          on: {
            "blocks.main-screen": {
              populate: "*",
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  console.log(query);

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
  } catch {
    console.error("Fetch failed:", err.message);
  }
}

// ===== Рендер блоку =====

function blockRendered(block) {
  switch (block.__component) {
    case "blocks.main-screen":
      return <h1>ok</h1>;
  }
}

// ===== Компонент Home =====

export default async function Home({ params }) {
  // const { locale } = params;
  const strapiData = await getData(process.env.HOME_URL);

  if (!strapiData) {
    notFound();
  }

  const { blocks } = strapiData;

  console.log(strapiData);

  return (
    <>
      {blocks.map((block) => blockRendered(block))}
      {/* <Advantages /> */}
    </>
  );
}
