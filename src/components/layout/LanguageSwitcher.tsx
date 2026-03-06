import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const;

function langToHtmlLang(code: string) {
  if (code === "pt") return "pt-BR";
  if (code === "en") return "en";
  return "es";
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = langToHtmlLang(i18n.language || "pt");
  }, [i18n.language]);

  function setLang(code: string) {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  }

  const current = (i18n.language || "pt").split("-")[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>{(current || "pt").toUpperCase()}</span>
        <span aria-hidden="true" className="text-slate-500">
          ▾
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu de idiomas"
          />

          <div
            role="menu"
            className="absolute right-0 mt-2 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
          >
            {LANGS.map((l) => {
              const active = current === l.code;
              return (
                <button
                  key={l.code}
                  role="menuitem"
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={[
                    "w-full px-3 py-2 text-left text-xs font-semibold transition",
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-900 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
