// Import only the hooks and types needed. React itself is not required for the new JSX transform.
import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";

function Badge({ children }: { children: ReactNode }) {
  return (
    <span
      className="
        inline-flex items-center rounded-full
        border border-slate-200/80 bg-white/65 backdrop-blur
        px-3 py-1 text-xs font-semibold
        text-slate-700
        shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)]
      "
    >
      {children}
    </span>
  );
}

export default function AboutSection() {
  const { t } = useTranslation();

  const aboutText = t("sobre.texto");
const { paragraphs } = useMemo(() => {
  const raw = String(aboutText ?? "").trim();

  const paragraphs = raw
    .split(/\n\s*\n/g)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);

  return { paragraphs };
}, [aboutText]);

  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-hidden bg-white">
      {/* ===== Fundo premium (igual linguagem do Hero) ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F6F8FC] to-[#EEF3FF]" />
      <div className="pointer-events-none absolute -left-44 top-10 h-[520px] w-[520px] rounded-full bg-brand-navy/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-56 -top-28 h-[640px] w-[640px] rounded-full bg-[#7AA6FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-220px] bottom-[-260px] h-[720px] w-[720px] rounded-full bg-[#B8E2FF]/12 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-1/3 top-0 h-full w-[70%] rotate-[12deg] bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[url('/images/bg-texture.jpg')] bg-cover bg-center" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('/images/grain.png')] bg-repeat" />

      <Container className="relative py-16 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          {/* ===== Foto (IGUAL ao print: object-cover, mais “perto”) ===== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative mx-auto w-full max-w-[520px] md:mx-0"
          >
            {/* Card da foto */}
            <div
              className="
                relative overflow-hidden rounded-[28px]
                border border-slate-200/80 bg-white/55 backdrop-blur
                shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)]
              "
            >
              {/* Mantém proporção parecida com o print */}
              <div className="relative aspect-[4/5] w-full">
                {/* brilho topo */}
                <div className="pointer-events-none absolute -top-1/2 left-1/2 z-10 h-[70%] w-[140%] -translate-x-1/2 rounded-full bg-white/30 blur-2xl" />

                <img
                  src="/images/leiza.webp"
                  alt={t("sobre.altImagem")}
                  className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                  loading="lazy"
                  decoding="async"
                />

                {/* vinheta sutil */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-white/10" />
                {/* contorno interno */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/55" />
              </div>
            </div>

            {/* ✅ Selo/logo no canto inferior esquerdo (como no print) */}
            <div
              className="
                pointer-events-none absolute -bottom-6 -left-6
                h-24 w-24 overflow-hidden rounded-3xl
                border border-slate-200/70
                bg-white/30 backdrop-blur-md
                shadow-[0_18px_60px_-35px_rgba(15,23,42,0.45)]
                md:block
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-white/25" />
              <img
                src="/images/logo-horizontal.png"
                alt=""
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 w-14 -translate-x-1/2 -translate-y-1/2 opacity-95"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/60" />
            </div>
          </motion.div>

          {/* ===== Conteúdo ===== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex flex-col justify-start"
          >

            {/* ✅ Título ajustado */}
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink md:text-4xl">
              Sobre a Dra. Leiza Hollas
            </h2>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>{t("hero.crm")}</Badge>
              <Badge>{t("hero.rqe")}</Badge>
            </div>
            {/* Texto do sobre: alinhado e premium */}
            <div className="mt-8 space-y-5 text-[15px] leading-[1.9] text-slate-700 md:text-base">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 h-px w-2/3 bg-gradient-to-r from-brand-navy/20 via-brand-navy/10 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
