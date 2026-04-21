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
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const steps = 40;
          const increment = value / steps;
          let current = 0;
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
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-brand-navy py-14 md:py-20">
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#7AA6FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#02C39A]/10 blur-3xl" />

      <Container className="relative">
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
              transition={{
                duration: 0.5,
                ease: [0.2, 0.7, 0.2, 1],
                delay: idx * 0.08,
              }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="font-serif text-5xl font-medium text-white md:text-6xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                {t(stat.labelKey, { defaultValue: stat.labelKey })}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Linha decorativa SBCCV */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-xs text-white/40 tracking-widest uppercase">
            {t("stats.membro", { defaultValue: "Membro da SBCCV" })}
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </Container>
    </section>
  );
}