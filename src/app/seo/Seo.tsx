import { Helmet } from "@dr.pogodin/react-helmet";
import { useTranslation } from "react-i18next";

export default function Seo() {
  const { t, i18n } = useTranslation();

  const baseUrl = "https://www.draleizahollas.com.br";
  const canonical = baseUrl + "/";

  const title = t("seo.title");
  const description = t("seo.description");

  // Se você tiver uma imagem OG fixa em /public/og.jpg:
  const ogImage = baseUrl + "/og.jpg";

  return (
    <Helmet>
      <html lang={i18n.language === "pt" ? "pt-BR" : i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
