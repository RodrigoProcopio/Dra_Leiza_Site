// src/sections/PacientArea.tsx
// React import removed because the new JSX transform (React 17+) handles it automatically.
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";

type CardData = { titulo: string; texto: string };

// Removed unused Badge component to satisfy the TypeScript noUnusedLocals rule.

const easePremium: any = [0.2, 0.7, 0.2, 1];

function SectionCard({
  title,
  // The subtitle prop was unused; remove it to avoid TypeScript warnings.
  items,
  isOpen,
  onToggle,
}: {
  title: string;
  items: CardData[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  // ✅ Stagger nos cards internos
  const listVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easePremium } },
  };

  return (
    <motion.div
      // ✅ hover extremamente suave + “lift”
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35, ease: easePremium }}
      className="
        rounded-[28px]
        border border-slate-200/80
        bg-white/55 backdrop-blur
        shadow-[0_18px_60px_-28px_rgba(15,23,42,0.30)]
        overflow-hidden
        transition-shadow duration-300
        hover:shadow-[0_28px_90px_-45px_rgba(15,23,42,0.35)]
      "
    >
      {/* ✅ glow sutil no hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100" />

      <button
        type="button"
        onClick={onToggle}
        className="
          relative w-full
          px-6 py-5 md:px-8 md:py-7
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40
        "
        aria-expanded={isOpen}
      >
        {/* ✅ Título centralizado + botão à direita */}
        <div className="relative flex items-start justify-end">
          <h3
            className="
              pointer-events-none absolute left-1/2 top-0
              -translate-x-1/2
              font-serif text-xl md:text-2xl text-ink tracking-[-0.015em]
              text-center
              whitespace-nowrap md:whitespace-normal
            "
          >
            {title}
          </h3>

          <span
            className="
              shrink-0 inline-flex h-10 w-10 items-center justify-center
              rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur
              shadow-[0_18px_60px_-40px_rgba(15,23,42,0.18)]
              transition
              hover:bg-white/85
            "
            aria-hidden="true"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2, ease: easePremium }}
              className="text-xl leading-none text-brand-navy/80"
            >
              +
            </motion.span>
          </span>
        </div>

        {/* divider mais elegante */}
        <div className="mt-2/3 h-px w-2/3 bg-gradient-to-r from-transparent via-brand-navy/18 to-transparent" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: easePremium }}
            className="px-6 pb-6 md:px-8 md:pb-8"
          >
            {/* ✅ grid com respiro perfeito */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:grid-cols-2"
            >
              {items.map((it, idx) => (
                <motion.div
                  key={`${it.titulo}-${idx}`}
                  variants={itemVariants}
                  className="
                    relative rounded-3xl
                    border border-slate-200/80
                    bg-white/65 backdrop-blur
                    p-6
                    shadow-[0_18px_60px_-48px_rgba(15,23,42,0.16)]
                    transition-all duration-300
                    hover:-translate-y-[1px]
                    hover:shadow-[0_28px_90px_-55px_rgba(15,23,42,0.22)]
                  "
                >
                  {/* ✅ glow sutil no card interno */}
                  <div
                    className="
                      pointer-events-none absolute inset-0 rounded-3xl
                      opacity-0 transition-opacity duration-300
                      hover:opacity-100
                      ring-1 ring-brand-navy/10
                    "
                    aria-hidden="true"
                  />

                  {/* ✅ Somente o título centralizado (tipografia mais elegante) */}
                  <h4 className="text-center text-sm md:text-[15px] font-semibold tracking-tight text-slate-900">
                    {it.titulo}
                  </h4>

                  {/* Texto permanece normal */}
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {it.texto}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PacientArea() {
  const { t } = useTranslation();

  const titulo = t("paciente.titulo");

  const sections = useMemo(() => {
    const keys = [
      { id: "preop", titleKey: "paciente.preop.titulo", cardBase: "paciente.preop" },
      { id: "seguranca", titleKey: "paciente.seguranca.titulo", cardBase: "paciente.seguranca" },
      { id: "quedas", titleKey: "paciente.quedas.titulo", cardBase: "paciente.quedas" },
      { id: "higiene", titleKey: "paciente.higiene.titulo", cardBase: "paciente.higiene" },
      { id: "internacaoMed", titleKey: "paciente.internacaoMed.titulo", cardBase: "paciente.internacaoMed" },
      { id: "duvidas", titleKey: "paciente.duvidas.titulo", cardBase: "paciente.duvidas" },
    ];

    const getCards = (base: string): CardData[] => {
      const ids = ["card1", "card2", "card3", "card4"];
      return ids
        .map((c) => {
          const titulo = t(`${base}.${c}.titulo`);
          const texto = t(`${base}.${c}.texto`);
          if (!titulo || titulo === `${base}.${c}.titulo`) return null;
          if (!texto || texto === `${base}.${c}.texto`) return null;
          return { titulo, texto };
        })
        .filter(Boolean) as CardData[];
    };

    return keys.map((k) => ({
      id: k.id,
      title: t(k.titleKey),
      cards: getCards(k.cardBase),
    }));
  }, [t]);

  const quickTags = useMemo(
    () =>
      sections.map((s) => ({
        label: s.title,
        target: s.id,
      })),
    [sections]
  );

  const [openId, setOpenId] = useState<string>("");

  const scrollTo = (id: string) => {
  setOpenId(id);

  requestAnimationFrame(() => {
    const el = document.getElementById(`paciente-${id}`);
    if (!el) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // ✅ Mobile (mantém como está funcionando pra você)
    if (isMobile) {
      const header = document.querySelector("header");
      const headerH = header instanceof HTMLElement ? header.offsetHeight : 0;
      const extra = 170;

      const top =
        el.getBoundingClientRect().top + window.scrollY - headerH - extra;

      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      return;
    }

    // ✅ Desktop: NÃO “gruda” no topo (evita cortar o título da seção)
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
};

  return (
    <section id="paciente" className="relative scroll-mt-24 overflow-hidden bg-white">
      {/* Fundo premium */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: easePremium }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink md:text-4xl">
            {titulo}
          </h2>

          {/* Tags lado a lado */}
          <div className="mt-6 flex gap-2 overflow-x-auto md:overflow-visible px-4 md:px-0 scrollbar-hide whitespace-nowrap justify-start md:justify-center">
            {quickTags.map((q) => (
              <button
                key={q.target}
                type="button"
                onClick={() => scrollTo(q.target)}
                className="
                  shrink-0 inline-flex items-center rounded-full
                  border border-slate-200/80 bg-white/65 backdrop-blur
                  px-4 py-2 text-xs font-semibold
                  text-slate-800
                  shadow-[0_18px_60px_-40px_rgba(15,23,42,0.18)]
                  transition-all duration-300
                  hover:bg-white/85 hover:-translate-y-[1px]
                  hover:shadow-[0_26px_80px_-55px_rgba(15,23,42,0.24)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40
                "
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className="mt-7 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-brand-navy/18 to-transparent" />
        </motion.div>

        {/* Conteúdo */}
        <div className="mt-10 grid gap-6 md:mt-12">
          {sections.map((s) => (
            <motion.div
              key={s.id}
              id={`paciente-${s.id}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, ease: easePremium }}
              className="scroll-mt-28"
            >
              <SectionCard
                title={s.title}
                items={s.cards}
                isOpen={openId === s.id}
                onToggle={() => setOpenId((prev) => (prev === s.id ? "" : s.id))}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
