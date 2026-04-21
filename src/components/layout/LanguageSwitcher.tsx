import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "pt", label: "PT", full: "Português" },
  { code: "en", label: "EN", full: "English" },
  { code: "es", label: "ES", full: "Español" },
] as const;

function langToHtmlLang(code: string) {
  if (code === "pt") return "pt-BR";
  if (code === "en") return "en";
  return "es";
}

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = langToHtmlLang(i18n.language || "pt");
  }, [i18n.language]);

  function setLang(code: string) {
  i18n.changeLanguage(code);
  localStorage.setItem("lang", code);
  setOpen(false);

  // Fade suave no conteúdo
  const root = document.getElementById("root");
  if (root) {
    root.classList.remove("lang-fade");
    void root.offsetWidth; // força reflow
    root.classList.add("lang-fade");
  }
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
        aria-label={t("acessibilidade.selecionarIdioma", { defaultValue: "Selecionar idioma" })}
      >
        <span aria-hidden="true">{(current || "pt").toUpperCase()}</span>
        <span aria-hidden="true" className="text-slate-500">▾</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 cursor-default"
            onClick={() => setOpen(false)}
            aria-label={t("acessibilidade.fecharIdioma", { defaultValue: "Fechar menu de idiomas" })}
            tabIndex={-1}
          />

          <div
            role="menu"
            aria-label={t("acessibilidade.selecionarIdioma", { defaultValue: "Selecionar idioma" })}
            className="absolute right-0 mt-2 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
          >
            {LANGS.map((l) => {
              const isActive = current === l.code;
              return (
                <button
                  key={l.code}
                  role="menuitem"
                  type="button"
                  onClick={() => setLang(l.code)}
                  aria-current={isActive ? true : undefined}
                  aria-label={l.full}
                  className={[
                    "w-full px-3 py-2 text-left text-xs font-semibold transition",
                    isActive
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