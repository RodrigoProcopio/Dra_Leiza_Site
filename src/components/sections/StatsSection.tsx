import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";

interface StatItem {
  value: number;
  suffix: string;
  labelKey: string;
}

const STATS: StatItem[] = [
  { value: 7,  suffix: "+", labelKey: "stats.experiencia" },
  { value: 10, suffix: "+", labelKey: "stats.pesquisas"   },
  { value: 5,  suffix: "+", labelKey: "stats.artigos"     },
  { value: 10, suffix: "+", labelKey: "stats.congressos"  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function runAnimation() {
      let current = 0;
      const duration = 1800;
      const steps = 50;
      const increment = value / steps;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(interval);
        } else {
          setDisplay(Math.floor(current));
        }
      }, duration / steps);
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) runAnimation(); },
      { threshold: 0.3 }
    );
    observer.observe(el);

    const loop = setInterval(runAnimation, 6000);

    return () => {
      observer.disconnect();
      clearInterval(loop);
    };
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Fundo padrão do site */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F6F8FC] to-[#EEF3FF]" />
      <div className="pointer-events-none absolute -left-44 top-10 h-[520px] w-[520px] rounded-full bg-[#0B1B3A]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-56 -top-28 h-[640px] w-[640px] rounded-full bg-[#7AA6FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-1/3 top-0 h-full w-[70%] rotate-[12deg] bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[url('/images/bg-texture.jpg')] bg-cover bg-center" />

      <Container className="relative py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: idx * 0.08 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              {/* Número em navy com acento dourado */}
              <span
                className="font-serif text-5xl font-medium md:text-6xl"
                style={{ color: "#0B1B3A" }}
              >
                <AnimatedNumber value={stat.value} suffix="" />
                <span style={{ color: "#8B7355" }}>{stat.suffix}</span>
              </span>

              {/* Divisor dourado */}
              <div
                className="h-px w-10"
                style={{ background: "linear-gradient(90deg, transparent, #8B7355, transparent)" }}
              />

              {/* Label em navy/muted */}
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#5A6475" }}
              >
                {t(stat.labelKey, { defaultValue: stat.labelKey })}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Linha SBCCV */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #8B7355)" }} />
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#8B7355" }}
          >
            {t("stats.membro", { defaultValue: "Membro da SBCCV" })}
          </span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #8B7355)" }} />
        </motion.div>
      </Container>
    </section>
  );
}