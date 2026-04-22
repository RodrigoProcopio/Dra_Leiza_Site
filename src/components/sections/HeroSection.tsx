import { motion } from "framer-motion";
import Container from "../layout/Container";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.getElementById("contato");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F7FAFF]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F6F8FC] to-[#EEF3FF]" />
      <div className="pointer-events-none absolute -left-40 -top-44 h-[520px] w-[520px] rounded-full bg-brand-navy/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-44 -top-24 h-[520px] w-[520px] rounded-full bg-[#7AA6FF]/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-[-220px] h-[620px] w-[620px] rounded-full bg-[#B8E2FF]/14 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-1/3 top-0 h-full w-[70%] rotate-[12deg] bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
      </div>

      <svg
        className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gridFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(10, 37, 64, 0.28)" />
            <stop offset="1" stopColor="rgba(10, 37, 64, 0)" />
          </linearGradient>
        </defs>
        <path d="M0 200 C 360 120, 720 260, 1440 140" fill="none" stroke="url(#gridFade)" strokeWidth="1.2" />
        <path d="M0 380 C 420 300, 780 480, 1440 320" fill="none" stroke="url(#gridFade)" strokeWidth="1.2" />
        <path d="M0 560 C 420 480, 780 660, 1440 500" fill="none" stroke="url(#gridFade)" strokeWidth="1.2" />
      </svg>

      <Container className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">

          {/* Coluna da imagem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
            className="
              relative self-stretch order-2 md:order-1
              min-h-[380px] sm:min-h-[460px]
              md:min-h-[520px] lg:min-h-[600px]
            "
          >
            <div className="
              relative h-full overflow-hidden rounded-[28px]
              border border-slate-200/80 bg-white/55 backdrop-blur
              shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)]
            ">
              <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[70%] w-[140%] -translate-x-1/2 rounded-full bg-white/35 blur-2xl" />
              <img
                src="/images/dra-leiza.webp"
                alt="Dra. Leiza Loiane Hollas"
                className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-white/10" />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/55" />
            </div>

            <div className="
              pointer-events-none absolute -bottom-6 -right-6
              h-24 w-24 overflow-hidden rounded-3xl
              border border-slate-200/70
              bg-white/30
              shadow-[0_18px_60px_-35px_rgba(15,23,42,0.45)]
              md:block
            ">
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-white/20" />
              <img
                src="/images/logo-horizontal.png"
                alt=""
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2 opacity-90"
                loading="lazy"
                decoding="async"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/55" />
            </div>
          </motion.div>

          {/* Coluna do texto */}
          <motion.div
            className="order-1 md:order-2 flex flex-col justify-center h-full max-w-xl space-y-6"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="
                inline-flex items-center rounded-full
                border border-slate-200/80 bg-white/65 backdrop-blur
                px-4 py-2 text-[11px] md:text-xs
                font-semibold tracking-[0.22em] uppercase
                text-brand-navy/80
                shadow-[0_18px_60px_-35px_rgba(15,23,42,0.30)]
              ">
                {t("hero.especialidade")}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-brand-navy/25 via-brand-navy/10 to-transparent" />
            </div>

            <h1 className="
              font-serif font-medium
              text-5xl leading-[1.04] tracking-[-0.02em]
              text-ink
              md:text-7xl
            ">
              {t("hero.nome")}
            </h1>

            <p className="text-base leading-relaxed text-ink-muted md:text-lg">
              {t("hero.crm")} • {t("hero.rqe")}
            </p>

            <div className="h-px w-2/3 bg-gradient-to-r from-brand-navy/20 via-brand-navy/10 to-transparent" />

            {/* CTA */}
            <div>
              <a
                href="#contato"
                onClick={scrollToContact}
                className="
                  btn-shimmer
                  inline-flex items-center gap-2
                  rounded-2xl border-2 border-brand-navy
                  px-7 py-3
                  text-sm font-semibold text-brand-navy
                  transition-all duration-300
                  hover:bg-brand-navy hover:text-white
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2
                "
              >
                {t("hero.cta", { defaultValue: "Agendar Consulta" })}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}