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

const CATEGORY_STYLES: Record<Category, { dot: string; badge: string; badgeText: string; cardBorder: string; cardBg: string; label: string }> = {
  formacao:   { dot: "#185FA5", badge: "rgba(55,138,221,0.12)",  badgeText: "#185FA5", cardBorder: "rgba(55,138,221,0.20)",  cardBg: "rgba(230,241,251,0.55)", label: "Formação"   },
  pesquisa:   { dot: "#3B6D11", badge: "rgba(99,153,34,0.12)",   badgeText: "#3B6D11", cardBorder: "rgba(99,153,34,0.20)",   cardBg: "rgba(234,243,222,0.55)", label: "Pesquisa"   },
  publicacao: { dot: "#854F0B", badge: "rgba(186,117,23,0.12)",  badgeText: "#854F0B", cardBorder: "rgba(139,115,85,0.28)",  cardBg: "rgba(250,238,218,0.55)", label: "Publicação" },
  congresso:  { dot: "#5F5E5A", badge: "rgba(136,135,128,0.12)", badgeText: "#5F5E5A", cardBorder: "rgba(136,135,128,0.22)", cardBg: "rgba(241,239,232,0.55)", label: "Congresso"  },
  atuacao:    { dot: "#993556", badge: "rgba(212,83,126,0.12)",  badgeText: "#993556", cardBorder: "rgba(212,83,126,0.20)",  cardBg: "rgba(251,234,240,0.55)", label: "Atuação"    },
};

const ALL_CATEGORIES: Category[] = ["formacao", "pesquisa", "publicacao", "congresso", "atuacao"];
const VISIBLE = 4; // quantos itens visíveis ao mesmo tempo

export default function TimelineSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const [startIdx, setStartIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const filtered = activeFilter === "all"
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === activeFilter);

  const canUp = startIdx > 0;
  const canDown = startIdx + VISIBLE < filtered.length;
  const visible = filtered.slice(startIdx, startIdx + VISIBLE);

  function goUp() {
    if (!canUp) return;
    setDirection(-1);
    setStartIdx((i) => Math.max(0, i - 1));
  }

  function goDown() {
    if (!canDown) return;
    setDirection(1);
    setStartIdx((i) => Math.min(filtered.length - VISIBLE, i + 1));
  }

  // Reset ao trocar filtro
  function setFilter(cat: Category | "all") {
    setActiveFilter(cat);
    setStartIdx(0);
  }

  const cardVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
  };

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
            onClick={() => setFilter("all")}
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
                onClick={() => setFilter(cat)}
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

        {/* Layout principal */}
        <div className="grid gap-8 md:grid-cols-[1fr_320px] md:gap-12 items-center">

          {/* Coluna esquerda — carrossel vertical */}
          <div className="relative">

            {/* Botão cima */}
            <div className="flex justify-center mb-3">
              <button
                onClick={goUp}
                disabled={!canUp}
                className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border transition-all"
                style={{
                  background: canUp ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.35)",
                  borderColor: canUp ? "rgba(139,115,85,0.30)" : "rgba(139,115,85,0.12)",
                  color: canUp ? "#8B7355" : "rgba(139,115,85,0.3)",
                  cursor: canUp ? "pointer" : "default",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Linha contínua + itens */}
            <div className="relative">
              {/* Linha vertical contínua — cobre toda a altura dos itens */}
              <div
                className="absolute left-[72px] top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, rgba(139,115,85,0.15), #8B7355 15%, #8B7355 85%, rgba(139,115,85,0.15))" }}
              />

              {/* Contador */}
              <div className="mb-3 text-center text-[11px]" style={{ color: "rgba(139,115,85,0.6)" }}>
                {startIdx + 1}–{Math.min(startIdx + VISIBLE, filtered.length)} de {filtered.length}
              </div>

              <div className="flex flex-col gap-3" style={{ minHeight: "380px" }}>
                <AnimatePresence mode="popLayout" custom={direction}>
                  {visible.map((m) => {
                    const s = CATEGORY_STYLES[m.category];
                    return (
                      <motion.div
                        key={m.key}
                        custom={direction}
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                        className="flex items-start gap-3"
                      >
                        {/* Ano */}
                        <div className="w-[68px] shrink-0 pt-2.5 text-right">
                          <span className="text-[11px] font-semibold tabular-nums" style={{ color: "#8B7355" }}>
                            {m.year}
                          </span>
                        </div>

                        {/* Ponto */}
                        <div className="relative z-10 mt-[10px] shrink-0">
                          <div
                            className="h-3 w-3 rounded-full border-2"
                            style={{ backgroundColor: s.dot, borderColor: "#F6F8FC" }}
                          />
                        </div>

                        {/* Card */}
                        <div
                          className="flex-1 rounded-2xl border px-4 py-3"
                          style={{ background: s.cardBg, borderColor: s.cardBorder, backdropFilter: "blur(10px)" }}
                        >
                          <span
                            className="mb-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
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
                </AnimatePresence>
              </div>
            </div>

            {/* Botão baixo */}
            <div className="flex justify-center mt-3">
              <button
                onClick={goDown}
                disabled={!canDown}
                className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border transition-all"
                style={{
                  background: canDown ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.35)",
                  borderColor: canDown ? "rgba(139,115,85,0.30)" : "rgba(139,115,85,0.12)",
                  color: canDown ? "#8B7355" : "rgba(139,115,85,0.3)",
                  cursor: canDown ? "pointer" : "default",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Coluna direita — card da foto padrão hero */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
            className="hidden md:block relative"
          >
            {/* Card premium — mesmo padrão do Hero e About */}
            <div
              className="relative overflow-hidden rounded-[28px] border shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)]"
              style={{
                borderColor: "rgba(203,213,225,0.8)",
                background: "rgba(255,255,255,0.55)",
                height: "480px",
              }}
            >
              <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[70%] w-[140%] -translate-x-1/2 rounded-full bg-white/30 blur-2xl z-10" />
              <img
                src="/images/dra-leiza-secao.jpg"
                alt={t("sobre.altImagem", { defaultValue: "Dra. Leiza Hollas" })}
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                style={{ imageRendering: "auto" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-white/10" />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/55" />
            </div>

            {/* Logo embaixo — igual ao Hero e About */}
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/30 backdrop-blur-md shadow-[0_18px_60px_-35px_rgba(15,23,42,0.45)]"
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

        </div>
      </Container>
    </section>
  );
}