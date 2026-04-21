import { Helmet } from "@dr.pogodin/react-helmet";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://www.draleizahollas.com.br";

const LANG_MAP: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export default function Seo() {
  const { t, i18n } = useTranslation();

  const lang = (i18n.language || "pt").split("-")[0];
  const htmlLang = LANG_MAP[lang] ?? "pt-BR";

  const title = t("seo.title");
  const description = t("seo.description");
  const ogImage = `${BASE_URL}/og.jpg`;
  const canonical = BASE_URL + "/";

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang — sinaliza ao Google as versões por idioma */}
      <link rel="alternate" hrefLang="pt-BR" href={BASE_URL + "/"} />
      <link rel="alternate" hrefLang="en" href={BASE_URL + "/"} />
      <link rel="alternate" hrefLang="es" href={BASE_URL + "/"} />
      <link rel="alternate" hrefLang="x-default" href={BASE_URL + "/"} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={htmlLang} />
      <meta property="og:site_name" content="Dra. Leiza Hollas" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Extras de qualidade */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0B1B3A" />
    </Helmet>
  );
}