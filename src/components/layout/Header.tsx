import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";
import EcgUnderline from "./EcgUnderline";

type SectionKey = "home" | "about" | "pacient" | "publications" | "contact";

const SECTION_IDS: Record<SectionKey, string> = {
  home: "home",
  about: "sobre",
  pacient: "paciente",
  publications: "publicacoes",
  contact: "contato",
};

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<SectionKey>("home");

  const links = useMemo(
    () =>
      (Object.keys(SECTION_IDS) as SectionKey[]).map((key) => ({
        key,
        href: `#${SECTION_IDS[key]}`,
        label: t(`nav.${key}`),
      })),
    [t]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const keys = Object.keys(SECTION_IDS) as SectionKey[];
    const els = keys
      .map((k) => document.getElementById(SECTION_IDS[k]))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible?.target?.id) return;
        const hit = keys.find((k) => SECTION_IDS[k] === visible.target.id);
        if (hit) setActive(hit);
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, key: SectionKey, href: string) {
    e.preventDefault();
    setMobileOpen(false);
    setActive(key);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Skip link — acessibilidade */}
      <a
        href="#home"
        className="
          sr-only focus:not-sr-only
          fixed top-2 left-2 z-[100]
          bg-brand-navy text-white
          px-4 py-2 rounded-xl text-sm font-semibold
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
        "
      >
        {t("acessibilidade.skipLink", { defaultValue: "Pular para o conteúdo" })}
      </a>

      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition",
          scrolled
            ? "border-b border-slate-200 bg-white/90 backdrop-blur"
            : "bg-transparent",
        ].join(" ")}
      >
        <Container className="py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home", "#home")}
              className="group inline-flex items-center gap-3 rounded-xl px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
              aria-label="Dra. Leiza Hollas — Início"
            >
              <img
                src="/images/logo-horizontal.png"
                alt="Dra. Leiza Hollas"
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-3 md:flex" aria-label="Navegação principal">
              {links.map((l) => {
                const isActive = active === l.key;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.key, l.href)}
                    className={[
                      "relative px-3 py-2 text-sm font-semibold transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy",
                      isActive
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {l.label}
                    <EcgUnderline active={isActive} />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />

              {/* Mobile toggle */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={t("nav.menu")}
              >
                {t("nav.menu")}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div
              id="mobile-menu"
              className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:hidden"
            >
              <nav aria-label="Navegação mobile">
                {links.map((l) => {
                  const isActive = active === l.key;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => handleNavClick(e, l.key, l.href)}
                      className={[
                        "relative flex px-4 py-3 text-left text-sm font-semibold transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy",
                        isActive
                          ? "text-slate-900"
                          : "text-slate-800 hover:bg-slate-50",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="relative inline-block">
                        {l.label}
                        <span
                          className={[
                            "absolute left-0 -bottom-1 h-[2px] w-full origin-left rounded-full bg-[#8B7355] transition-transform duration-300",
                            isActive ? "scale-x-100" : "scale-x-0",
                          ].join(" ")}
                        />
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </Container>
      </header>
    </>
  );
}