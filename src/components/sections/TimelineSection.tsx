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

const CATEGORY_LABELS: Record<Category, string> = {
  formacao:   "Formação",
  pesquisa:   "Pesquisa",
  publicacao: "Publicação",
  congresso:  "Congresso",
  atuacao:    "Atuação",
};

const ALL_CATEGORIES: Category[] = ["formacao", "pesquisa", "publicacao", "congresso", "atuacao"];

export default function TimelineSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

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
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[url('/images/bg-texture.jpg')] bg-cover bg-center" />

      <Container className="relative py-14 md:py-20">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl" style={{ color: "#0B1220" }}>
            {t("timeline.titulo", { defaultValue: "Trajetória" })}
          </h2>
          <div className="mt-4 mx-auto h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #8B7355, transparent)" }} />
        </motion.div>

        {/* Filtros — estilo discreto, padrão do site */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {(["all", ...ALL_CATEGORIES] as const).map((cat) => {
            const isActive = activeFilter === cat;
            const label = cat === "all"
              ? t("timeline.todos", { defaultValue: "Todos" })
              : CATEGORY_LABELS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all border"
                style={{
                  background: isActive ? "#0B1B3A" : "rgba(255,255,255,0.65)",
                  color: isActive ? "#fff" : "#5A6475",
                  borderColor: isActive ? "#0B1B3A" : "rgba(139,115,85,0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Linha vertical dourada */}
          <div
            className="absolute left-[72px] top-0 bottom-0 w-px md:left-[120px]"
            style={{ background: "linear-gradient(to bottom, transparent, #8B7355 5%, #8B7355 95%, transparent)" }}
          />

          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-4">
              {filtered.map((m, idx) => (
                <motion.div
                  key={m.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1], delay: idx * 0.02 }}
                  className="flex items-start gap-4"
                >
                  {/* Ano */}
                  <div className="w-[68px] md:w-[116px] shrink-0 pt-3 text-right">
                    <span className="text-[11px] font-semibold tabular-nums" style={{ color: "#8B7355" }}>
                      {m.year}
                    </span>
                  </div>

                  {/* Ponto dourado */}
                  <div className="relative z-10 mt-[14px] shrink-0">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: "#8B7355" }}
                    />
                  </div>

                  {/* Card — estilo padrão do site */}
                  <div
                    className="flex-1 rounded-[20px] border px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.60)",
                      borderColor: "rgba(139,115,85,0.18)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Badge de categoria sutil */}
                    <span
                      className="mb-1 inline-block text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "#8B7355" }}
                    >
                      {CATEGORY_LABELS[m.category]}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "#0B1220" }}>
                      {t(m.key, { defaultValue: m.key })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}