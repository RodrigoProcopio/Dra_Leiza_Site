import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ScrollToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          onClick={scrollToTop}
          aria-label={t("acessibilidade.voltarTopo", { defaultValue: "Voltar ao topo" })}
          className="
            fixed bottom-6 right-6 z-50
            inline-flex h-11 w-11 items-center justify-center
            rounded-2xl border border-slate-200/80
            bg-white/80 backdrop-blur
            shadow-[0_8px_30px_-8px_rgba(15,23,42,0.25)]
            text-brand-navy
            transition-all duration-300
            hover:bg-brand-navy hover:text-white hover:border-brand-navy
            hover:-translate-y-1
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy
          "
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}