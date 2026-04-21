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

/**
 * 🔥 NOVO PADRÃO VISUAL (AZUL + NEUTRO)
 * Sem cores gritantes → mais elegante e profissional
 */
const CATEGORY_COLORS: Record<
  Category,
  { bg: string; border: string; dot: string; label: string }
> = {
  formacao: {
    bg: "#EDF4FF",
    border: "#3A6EA5",
    dot: "#1E3A5F",
    label: "Formação",
  },
  pesquisa: {
    bg: "#F5F7FA",
    border: "#C9D6E2",
    dot: "#3A6EA5",
    label: "Pesquisa",
  },
  publicacao: {
    bg: "#F0F5FA",
    border: "#B8CDE3",
    dot: "#2F5D8C",
    label: "Publicação",
  },
  congresso: {
    bg: "#FAFBFC",
    border: "#DDE5EE",
    dot: "#4A6FA5",
    label: "Congresso",
  },
  atuacao: {
    bg: "#EEF3FF",
    border: "#9BB7D4",
    dot: "#1E3A5F",
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
      <Container className="relative py-14 md:py-20">

        {/* Título */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A5F]">
            {t("timeline.titulo")}
          </h2>
        </div>

        {/* Filtros */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className="rounded-full px-4 py-1.5 text-xs font-semibold border transition"
            style={{
              background: activeFilter === "all" ? "#1E3A5F" : "#fff",
              color: activeFilter === "all" ? "#fff" : "#1E3A5F",
              borderColor: "#1E3A5F",
            }}
          >
            {t("timeline.todos")}
          </button>

          {ALL_CATEGORIES.map((cat) => {
            const c = CATEGORY_COLORS[cat];
            const isActive = activeFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold border transition"
                style={{
                  background: isActive ? "#3A6EA5" : "#fff",
                  color: isActive ? "#fff" : "#3A6EA5",
                  borderColor: "#3A6EA5",
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[72px] top-0 bottom-0 w-px md:left-[120px] bg-[#E4E9F0]" />

          <AnimatePresence>
            <div className="flex flex-col gap-5">
              {filtered.map((m, idx) => {
                const c = CATEGORY_COLORS[m.category];

                return (
                  <motion.div
                    key={m.key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-start gap-4"
                  >
                    {/* Ano */}
                    <div className="w-[68px] md:w-[116px] text-right text-xs font-semibold text-[#8A97A8]">
                      {m.year}
                    </div>

                    {/* Dot */}
                    <div className="mt-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ background: c.dot }}
                      />
                    </div>

                    {/* Card */}
                    <div
                      className="flex-1 rounded-xl border px-4 py-3 text-sm"
                      style={{
                        background: c.bg,
                        borderColor: c.border,
                      }}
                    >
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wide"
                        style={{ color: c.dot }}
                      >
                        {c.label}
                      </span>

                      <p className="mt-1 text-[#2C2C2C]">
                        {t(m.key)}
                      </p>
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