import { useTranslation } from "react-i18next";

const LINKS = [
  { href: "#home", key: "nav.home" },
  { href: "#sobre", key: "nav.about" },
  { href: "#paciente", key: "nav.pacient" },
  { href: "#publicacoes", key: "nav.publications" },
  { href: "#contato", key: "nav.contact" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Coluna 1 — Identidade */}
          <div className="flex flex-col gap-4">
            <img
              src="/images/logo-horizontal.png"
              alt="Dra. Leiza Hollas"
              className="h-8 w-auto object-contain"
              loading="lazy"
            />
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("hero.especialidade")}
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-400">{t("hero.crm")}</span>
              <span className="text-xs text-slate-400">{t("hero.rqe")}</span>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t("footer.navegacao", { defaultValue: "Navegação" })}
            </p>
            <nav aria-label="Rodapé">
              <ul className="flex flex-col gap-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-600 hover:text-brand-navy transition-colors"
                    >
                      {t(l.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Coluna 3 — Redes e contato */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t("footer.links", { defaultValue: "Links" })}
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/leizahollas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-navy transition-colors"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="http://lattes.cnpq.br/9787111741881317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-navy transition-colors"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                  Currículo Lattes
                </a>
              </li>
              <li>
                <a
                  href="tel:+554130166622"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-navy transition-colors"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  (41) 3016-6622
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Dra. Leiza Hollas. {t("footer.direitos", { defaultValue: "Todos os direitos reservados." })}
          </p>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            {t("footer.lgpd", { defaultValue: "Este site não coleta dados sensíveis. As informações de contato são usadas exclusivamente para retorno, conforme a LGPD." })}
          </p>
        </div>
      </div>
    </footer>
  );
}