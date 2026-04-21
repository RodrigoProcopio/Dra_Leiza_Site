import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";

type Category = "formacao" | "pesquisa" | "publicacao" | "congresso" | "atuacao";

interface Milestone {
  year: string;
  category: Category;
  key: string;
}

const MILESTONES: Milestone[] = [
  { year: "2007–2011", category: "formacao", key: "timeline.tecnico" },
  { year: "2012–2018", category: "formacao", key: "timeline.medicina" },
  { year: "2015–2016", category: "pesquisa", key: "timeline.erica1" },
  { year: "2015–2016", category: "formacao", key: "timeline.liga_cardio" },
  { year: "2015", category: "formacao", key: "timeline.liga_cardio2" },
  { year: "2016", category: "pesquisa", key: "timeline.futebol" },
  { year: "2016–2017", category: "pesquisa", key: "timeline.hdl" },
  { year: "2016–2017", category: "pesquisa", key: "timeline.ecoca" },
  { year: "2016", category: "congresso", key: "timeline.congresso2016" },
  { year: "2017", category: "congresso", key: "timeline.congresso2017" },
  { year: "2018", category: "publicacao", key: "timeline.sincope" },
  { year: "2018", category: "congresso", key: "timeline.congresso2018" },
  { year: "2019–2024", category: "formacao", key: "timeline.residencia" },
  { year: "2019–2020", category: "pesquisa", key: "timeline.rmmi" },
  { year: "2019–2020", category: "pesquisa", key: "timeline.plastia" },
  { year: "2019–2020", category: "pesquisa", key: "timeline.tronco" },
  { year: "2019", category: "atuacao", key: "timeline.atuacao_cvb" },
  { year: "2020", category: "pesquisa", key: "timeline.simulacao" },
  { year: "2020", category: "publicacao", key: "timeline.pub_simulacao" },
  { year: "2020", category: "formacao", key: "timeline.curso_cardio" },
  { year: "2020", category: "congresso", key: "timeline.congresso2020" },
  { year: "2021", category: "formacao", key: "timeline.curso_fios" },
  { year: "2021", category: "congresso", key: "timeline.congresso2021" },
  { year: "2022", category: "congresso", key: "timeline.congresso2022" },
  { year: "2022–2024", category: "pesquisa", key: "timeline.revascular" },
  { year: "2023", category: "publicacao", key: "timeline.livro" },
  { year: "2023", category: "publicacao", key: "timeline.valve_club" },
  { year: "2023", category: "congresso", key: "timeline.congresso2023" },
  { year: "2024", category: "formacao", key: "timeline.jackson" },
  { year: "2024", category: "congresso", key: "timeline.congresso2024" },
  { year: "2024–2025", category: "pesquisa", key: "timeline.erica2" },
  { year: "2025", category: "publicacao", key: "timeline.pub_erica" },
  { year: "2025", category: "formacao", key: "timeline.titulo_sbccv" },
];

const CATEGORY_COLORS: Record<
  Category,
  { bg: string; border: string; dot: string; badgeBg: string; label: string }
> = {
  formacao: {
    bg: "#EEF4FA",
    border: "#A9BED3",
    dot: "#2F5D7E",
    badgeBg: "#DCE8F3",
    label: "Formação",
  },
  pesquisa: {
    bg: "#F4F7FA",
    border: "#C2CEDA",
    dot: "#5A748C",
    badgeBg: "#E7EEF5",
    label: "Pesquisa",
  },
  publicacao: {
    bg: "#FAF5EA",
    border: "#D8C08E",
    dot: "#A8822A",
    badgeBg: "#F2E7C7",
    label: "Publicação",
  },
  congresso: {
    bg: "#F7F2EC",
    border: "#C7A98B",
    dot: "#8B6A4E",
    badgeBg: "#EADCCE",
    label: "Congresso",
  },
  atuacao: {
    bg: "#F1F4F8",
    border: "#8FA4B8",
    dot: "#3F5F7A",
    badgeBg: "#DFE8F0",
    label: "Atuação",
  },
};

const ALL_CATEGORIES: Category[] = [
  "formacao",
  "pesquisa",
  "publicacao",
  "congresso",
  "atuacao",
];

export default function TimelineSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

  const filtered =
    activeFilter === "all"
      ? MILESTONES
      : MILESTONES.filter((m) => m.category === activeFilter);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8F6F2] to-[#EEF3F8]" />
      <div className="pointer-events-none absolute -left-44 top-10 h-[520px] w-[520px] rounded-full bg-[#8B6A4E]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-56 -top-28 h-[640px] w-[640px] rounded-full bg-[#2F5D7E]/[0.07] blur-3xl" />

      <Container className="relative py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-10 text-center"
        >
          <h2
            className="font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl"
            style={{ color: "#2A2A2A" }}
          >
            {t("timeline.titulo", { defaultValue: "Trajetória" })}
          </h2>

          <div
            className="mx-auto mt-4 h-px w-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, #A8822A, #8B6A4E, transparent)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          <button
            onClick={() => setActiveFilter("all")}
            className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-all"
            style={{
              background: activeFilter === "all" ? "#2F5D7E" : "rgba(255,255,255,0.88)",
              color: activeFilter === "all" ? "#fff" : "#5C6773",
              borderColor: activeFilter === "all" ? "#2F5D7E" : "rgba(139,106,78,0.22)",
            }}
          >
            {t("timeline.todos", { defaultValue: "Todos" })}
          </button>

          {ALL_CATEGORIES.map((cat) => {
            const c = CATEGORY_COLORS[cat];
            const isActive = activeFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-all"
                style={{
                  background: isActive ? c.dot : "rgba(255,255,255,0.88)",
                  color: isActive ? "#fff" : c.dot,
                  borderColor: isActive ? c.dot : c.border,
                }}
              >
                {c.label}
              </button>
            );
          })}
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-0 top-0 left-[72px] w-px md:left-[120px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #C7A98B 8%, #A9BED3 50%, #C7A98B 92%, transparent)",
            }}
          />

          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-5">
              {filtered.map((m, idx) => {
                const c = CATEGORY_COLORS[m.category];

                return (
                  <motion.div
                    key={m.key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.2, 0.7, 0.2, 1],
                      delay: idx * 0.03,
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-[68px] shrink-0 pt-2.5 text-right md:w-[116px]">
                      <span
                        className="text-[11px] font-semibold tabular-nums"
                        style={{ color: "#8B6A4E" }}
                      >
                        {m.year}
                      </span>
                    </div>

                    <div className="relative z-10 mt-3 shrink-0">
                      <div
                        className="h-3 w-3 rounded-full border-2"
                        style={{
                          backgroundColor: c.dot,
                          borderColor: "#F8F6F2",
                          boxShadow: "0 0 0 4px rgba(255,255,255,0.65)",
                        }}
                      />
                    </div>

                    <div
                      className="flex-1 rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-[0_8px_30px_rgba(25,35,52,0.04)]"
                      style={{
                        background: c.bg,
                        borderColor: c.border,
                        color: "#2A2A2A",
                      }}
                    >
                      <span
                        className="mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background: c.badgeBg,
                          color: c.dot,
                        }}
                      >
                        {c.label}
                      </span>

                      <p className="mt-0.5">{t(m.key, { defaultValue: m.key })}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}