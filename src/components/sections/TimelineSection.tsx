import { useState, useRef } from "react";
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

// Cores sutis por categoria — tons do site
const CATEGORY_STYLES: Record<Category, { dot: string; badge: string; badgeText: string; cardBorder: string; cardBg: string; label: string }> = {
  formacao:   { dot: "#185FA5", badge: "rgba(55,138,221,0.12)", badgeText: "#185FA5", cardBorder: "rgba(55,138,221,0.18)", cardBg: "rgba(230,241,251,0.45)", label: "Formação"   },
  pesquisa:   { dot: "#3B6D11", badge: "rgba(99,153,34,0.12)",  badgeText: "#3B6D11", cardBorder: "rgba(99,153,34,0.18)",  cardBg: "rgba(234,243,222,0.45)", label: "Pesquisa"   },
  publicacao: { dot: "#854F0B", badge: "rgba(186,117,23,0.12)", badgeText: "#854F0B", cardBorder: "rgba(139,115,85,0.25)", cardBg: "rgba(250,238,218,0.45)", label: "Publicação" },
  congresso:  { dot: "#5F5E5A", badge: "rgba(136,135,128,0.12)",badgeText: "#5F5E5A", cardBorder: "rgba(136,135,128,0.2)", cardBg: "rgba(241,239,232,0.45)", label: "Congresso"  },
  atuacao:    { dot: "#993556", badge: "rgba(212,83,126,0.12)", badgeText: "#993556", cardBorder: "rgba(212,83,126,0.18)", cardBg: "rgba(251,234,240,0.45)", label: "Atuação"    },
};

const ALL_CATEGORIES: Category[] = ["formacao", "pesquisa", "publicacao", "congresso", "atuacao"];

export default function TimelineSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const scrollRef = useRef<HTMLDivElement>(null);

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

        {/* Título centralizado */}
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

        {/* Filtros centralizados */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-8 flex flex-wrap justify-center gap-2"
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
            const s = CATEGORY_STYLES[cat];
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
                {s.label}
              </button>
            );
          })}
        </motion.div>

        {/* Layout: timeline à esquerda, foto à direita */}
        <div className="grid gap-8 md:grid-cols-[1fr_340px] md:gap-12 items-start">

          {/* Timeline scrollável — altura fixa igual ao card da foto */}
          <div
            ref={scrollRef}
            className="relative overflow-y-auto pr-2"
            style={{ maxHeight: "580px", scrollbarWidth: "thin", scrollbarColor: "#8B7355 transparent" }}
          >
            {/* Linha vertical */}
            <div
              className="absolute left-[68px] top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, #8B7355 3%, #8B7355 97%, transparent)" }}
            />

            <AnimatePresence mode="popLayout">
              <div className="flex flex-col gap-3 pb-4">
                {filtered.map((m, idx) => {
                  const s = CATEGORY_STYLES[m.category];
                  return (
                    <motion.div
                      key={m.key}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1], delay: idx * 0.02 }}
                      className="flex items-start gap-3"
                    >
                      {/* Ano */}
                      <div className="w-[64px] shrink-0 pt-2.5 text-right">
                        <span className="text-[10px] font-semibold tabular-nums" style={{ color: "#8B7355" }}>
                          {m.year}
                        </span>
                      </div>

                      {/* Ponto colorido por categoria */}
                      <div className="relative z-10 mt-[10px] shrink-0">
                        <div className="h-2.5 w-2.5 rounded-full border-2" style={{ backgroundColor: s.dot, borderColor: "rgba(246,248,252,0.9)" }} />
                      </div>

                      {/* Card colorido por categoria */}
                      <div
                        className="flex-1 rounded-2xl border px-3 py-2.5"
                        style={{ background: s.cardBg, borderColor: s.cardBorder, backdropFilter: "blur(10px)" }}
                      >
                        <span
                          className="mb-0.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                          style={{ background: s.badge, color: s.badgeText }}
                        >
                          {s.label}
                        </span>
                        <p className="text-[13px] leading-snug" style={{ color: "#0B1220" }}>
                          {t(m.key, { defaultValue: m.key })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          </div>

          {/* Foto à direita — card premium sticky */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
            className="md:sticky md:top-28 hidden md:block"
          >
            <div
              className="relative overflow-hidden rounded-[28px] border shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)]"
              style={{ borderColor: "rgba(203,213,225,0.8)", background: "rgba(255,255,255,0.55)", height: "580px" }}
            >
              <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[70%] w-[140%] -translate-x-1/2 rounded-full bg-white/30 blur-2xl z-10" />
              <img
                src="/images/dra-leiza-secao.jpg"
                alt={t("sobre.altImagem", { defaultValue: "Dra. Leiza Hollas" })}
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/10" />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/55" />

              {/* Badge no canto inferior */}
              <div
                className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 backdrop-blur-md border z-10"
                style={{ background: "rgba(255,255,255,0.80)", borderColor: "rgba(139,115,85,0.20)" }}
              >
                <p className="font-serif text-sm" style={{ color: "#0B1220" }}>Dra. Leiza Loiane Hollas</p>
                <p className="text-xs mt-0.5" style={{ color: "#8B7355" }}>Cirurgiã Cardiovascular · SBCCV</p>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}