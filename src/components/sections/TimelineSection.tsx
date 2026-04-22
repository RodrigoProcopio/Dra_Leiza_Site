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
  { year: "2007–2011", category: "formacao",    key: "timeline.tecnico"        },
  { year: "2012–2018", category: "formacao",    key: "timeline.medicina"       },
  { year: "2015–2016", category: "pesquisa",    key: "timeline.erica1"         },
  { year: "2015–2016", category: "formacao",    key: "timeline.liga_cardio"    },
  { year: "2015",      category: "formacao",    key: "timeline.liga_cardio2"   },
  { year: "2016",      category: "pesquisa",    key: "timeline.futebol"        },
  { year: "2016–2017", category: "pesquisa",    key: "timeline.hdl"            },
  { year: "2016–2017", category: "pesquisa",    key: "timeline.ecoca"          },
  { year: "2016",      category: "congresso",   key: "timeline.congresso2016"  },
  { year: "2017",      category: "congresso",   key: "timeline.congresso2017"  },
  { year: "2018",      category: "publicacao",  key: "timeline.sincope"        },
  { year: "2018",      category: "congresso",   key: "timeline.congresso2018"  },
  { year: "2019–2024", category: "formacao",    key: "timeline.residencia"     },
  { year: "2019–2020", category: "pesquisa",    key: "timeline.rmmi"           },
  { year: "2019–2020", category: "pesquisa",    key: "timeline.plastia"        },
  { year: "2019–2020", category: "pesquisa",    key: "timeline.tronco"         },
  { year: "2019",      category: "atuacao",     key: "timeline.atuacao_cvb"    },
  { year: "2020",      category: "pesquisa",    key: "timeline.simulacao"      },
  { year: "2020",      category: "publicacao",  key: "timeline.pub_simulacao"  },
  { year: "2020",      category: "formacao",    key: "timeline.curso_cardio"   },
  { year: "2020",      category: "congresso",   key: "timeline.congresso2020"  },
  { year: "2021",      category: "formacao",    key: "timeline.curso_fios"     },
  { year: "2021",      category: "congresso",   key: "timeline.congresso2021"  },
  { year: "2022",      category: "congresso",   key: "timeline.congresso2022"  },
  { year: "2022–2024", category: "pesquisa",    key: "timeline.revascular"     },
  { year: "2023",      category: "publicacao",  key: "timeline.livro"          },
  { year: "2023",      category: "publicacao",  key: "timeline.valve_club"     },
  { year: "2023",      category: "congresso",   key: "timeline.congresso2023"  },
  { year: "2024",      category: "formacao",    key: "timeline.jackson"        },
  { year: "2024",      category: "congresso",   key: "timeline.congresso2024"  },
  { year: "2024–2025", category: "pesquisa",    key: "timeline.erica2"         },
  { year: "2025",      category: "publicacao",  key: "timeline.pub_erica"      },
  { year: "2025",      category: "formacao",    key: "timeline.titulo_sbccv"   },
];

// Estilos visuais por categoria — sem label hardcoded
const CATEGORY_BASE: Record<Category, { dot: string; badge: string; badgeText: string; cardBorder: string; cardBg: string }> = {
  formacao:   { dot: "#0B1B3A", badge: "rgba(11,27,58,0.08)",   badgeText: "#0B1B3A", cardBorder: "rgba(11,27,58,0.14)",   cardBg: "rgba(11,27,58,0.04)"   },
  pesquisa:   { dot: "#185FA5", badge: "rgba(24,95,165,0.10)",  badgeText: "#185FA5", cardBorder: "rgba(24,95,165,0.18)",  cardBg: "rgba(24,95,165,0.05)"  },
  publicacao: { dot: "#8B7355", badge: "rgba(139,115,85,0.12)", badgeText: "#7A6040", cardBorder: "rgba(139,115,85,0.22)", cardBg: "rgba(139,115,85,0.06)" },
  congresso:  { dot: "#6B4F2A", badge: "rgba(107,79,42,0.10)",  badgeText: "#6B4F2A", cardBorder: "rgba(107,79,42,0.18)",  cardBg: "rgba(107,79,42,0.05)"  },
  atuacao:    { dot: "#C4993A", badge: "rgba(196,153,58,0.12)", badgeText: "#9A7520", cardBorder: "rgba(196,153,58,0.22)", cardBg: "rgba(196,153,58,0.06)" },
};

const ALL_CATEGORIES: Category[] = ["formacao", "pesquisa", "publicacao", "congresso", "atuacao"];

export default function TimelineSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

  // Labels traduzidos dinamicamente
  const categoryLabels: Record<Category, string> = {
    formacao:   t("timeline.categorias.formacao",   { defaultValue: "Formação"   }),
    pesquisa:   t("timeline.categorias.pesquisa",   { defaultValue: "Pesquisa"   }),
    publicacao: t("timeline.categorias.publicacao", { defaultValue: "Publicação" }),
    congresso:  t("timeline.categorias.congresso",  { defaultValue: "Congresso"  }),
    atuacao:    t("timeline.categorias.atuacao",    { defaultValue: "Atuação"    }),
  };

  const filtered = activeFilter === "all"
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === activeFilter);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F6F8FC] to-[#EEF3FF]" />
      <div className="pointer-events-none absolute -left-44 top-10 h-[520px] w-[520px] rounded-full bg-[#0B1B3A]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-56 -top-28 h-[640px] w-[640px] rounded-full bg-[#7AA6FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-1/3 top-0 h-full w-[70%] rotate-[12deg] bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
      </div>

      <Container className="relative py-14 md:py-20">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-8 text-center"
        >
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl" style={{ color: "#0B1220" }}>
            {t("timeline.titulo", { defaultValue: "Trajetória" })}
          </h2>
          <div className="mt-4 mx-auto h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #8B7355, transparent)" }} />
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          <button
            onClick={() => setActiveFilter("all")}
            className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all border"
            style={{
              background: activeFilter === "all" ? "#0B1B3A" : "rgba(255,255,255,0.75)",
              color: activeFilter === "all" ? "#fff" : "#5A6475",
              borderColor: activeFilter === "all" ? "#0B1B3A" : "rgba(139,115,85,0.25)",
            }}
          >
            {t("timeline.todos", { defaultValue: "Todos" })}
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const s = CATEGORY_BASE[cat];
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all border"
                style={{
                  background: isActive ? s.dot : "rgba(255,255,255,0.75)",
                  color: isActive ? "#fff" : s.badgeText,
                  borderColor: isActive ? s.dot : s.cardBorder,
                }}
              >
                {categoryLabels[cat]}
              </button>
            );
          })}
        </motion.div>

        {/* Timeline coluna única */}
        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-[68px] top-0 bottom-0 w-px md:left-[116px]"
            style={{ background: "linear-gradient(to bottom, transparent, #8B7355 3%, #8B7355 97%, transparent)" }}
          />

          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-4">
              {filtered.map((m, idx) => {
                const s = CATEGORY_BASE[m.category];
                const label = categoryLabels[m.category];
                return (
                  <motion.div
                    key={m.key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1], delay: idx * 0.02 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-[64px] md:w-[112px] shrink-0 pt-3 text-right">
                      <span className="text-[11px] font-semibold tabular-nums" style={{ color: "#8B7355" }}>
                        {m.year}
                      </span>
                    </div>

                    <div className="relative z-10 mt-[14px] shrink-0">
                      <div
                        className="h-2.5 w-2.5 rounded-full border-2"
                        style={{ backgroundColor: s.dot, borderColor: "#F6F8FC" }}
                      />
                    </div>

                    <div
                      className="flex-1 rounded-2xl border px-4 py-3"
                      style={{ background: s.cardBg, borderColor: s.cardBorder, backdropFilter: "blur(10px)" }}
                    >
                      <span
                        className="mb-0.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                        style={{ background: s.badge, color: s.badgeText }}
                      >
                        {label}
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "#0B1220" }}>
                        {t(m.key, { defaultValue: m.key })}
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