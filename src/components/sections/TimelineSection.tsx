import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";

const MILESTONES = [
  { year: "2012–2018", key: "timeline.medicina"     },
  { year: "2015–2016", key: "timeline.liga"         },
  { year: "2020",      key: "timeline.simulacao"    },
  { year: "2022–2024", key: "timeline.revascular"   },
  { year: "2023",      key: "timeline.livro"        },
  { year: "2024",      key: "timeline.residencia"   },
  { year: "2024",      key: "timeline.congresso"    },
];

export default function TimelineSection() {
  const { t } = useTranslation();

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
          className="mb-12 text-center"
        >
          <h2
            className="font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl"
            style={{ color: "#0B1220" }}
          >
            {t("timeline.titulo", { defaultValue: "Trajetória" })}
          </h2>
          <div className="mt-4 mx-auto h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #8B7355, transparent)" }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-2xl">
          {/* Linha central */}
          <div
            className="absolute left-[88px] top-0 bottom-0 w-px md:left-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, #8B7355 10%, #8B7355 90%, transparent)" }}
          />

          <div className="flex flex-col gap-8">
            {MILESTONES.map((m, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={m.key}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: idx * 0.06 }}
                  className="relative flex items-center gap-4 md:gap-0"
                >
                  {/* Mobile layout */}
                  <div className="flex items-center gap-4 md:hidden w-full pl-2">
                    {/* Ano */}
                    <span
                      className="w-20 shrink-0 text-right text-xs font-semibold tabular-nums"
                      style={{ color: "#8B7355" }}
                    >
                      {m.year}
                    </span>

                    {/* Ponto */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className="h-3 w-3 rounded-full border-2"
                        style={{ backgroundColor: "#8B7355", borderColor: "#F6F8FC" }}
                      />
                    </div>

                    {/* Texto */}
                    <div
                      className="flex-1 rounded-2xl border px-4 py-3 text-sm leading-relaxed"
                      style={{
                        background: "rgba(255,255,255,0.65)",
                        borderColor: "rgba(139,115,85,0.18)",
                        color: "#0B1220",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {t(m.key, { defaultValue: m.key })}
                    </div>
                  </div>

                  {/* Desktop layout — alternado esquerda/direita */}
                  <div className="hidden md:flex w-full items-center">
                    {/* Lado esquerdo */}
                    <div className={`w-1/2 pr-8 ${isLeft ? "flex justify-end" : ""}`}>
                      {isLeft && (
                        <div
                          className="max-w-[260px] rounded-2xl border px-4 py-3 text-sm leading-relaxed text-right"
                          style={{
                            background: "rgba(255,255,255,0.65)",
                            borderColor: "rgba(139,115,85,0.18)",
                            color: "#0B1220",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {t(m.key, { defaultValue: m.key })}
                        </div>
                      )}
                      {!isLeft && (
                        <span
                          className="ml-auto text-xs font-semibold tabular-nums"
                          style={{ color: "#8B7355" }}
                        >
                          {m.year}
                        </span>
                      )}
                    </div>

                    {/* Ponto central */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className="h-3 w-3 rounded-full border-2"
                        style={{ backgroundColor: "#8B7355", borderColor: "#F6F8FC" }}
                      />
                    </div>

                    {/* Lado direito */}
                    <div className={`w-1/2 pl-8 ${!isLeft ? "flex" : ""}`}>
                      {!isLeft && (
                        <div
                          className="max-w-[260px] rounded-2xl border px-4 py-3 text-sm leading-relaxed"
                          style={{
                            background: "rgba(255,255,255,0.65)",
                            borderColor: "rgba(139,115,85,0.18)",
                            color: "#0B1220",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {t(m.key, { defaultValue: m.key })}
                        </div>
                      )}
                      {isLeft && (
                        <span
                          className="text-xs font-semibold tabular-nums"
                          style={{ color: "#8B7355" }}
                        >
                          {m.year}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}