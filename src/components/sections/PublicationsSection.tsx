import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Download, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../layout/Container";
import { easePremium } from "../../types";
import type { Article } from "../../types";

function ArticleCard({
  article,
  onClick,
  valveClubText,
  bookFooterText,
  leiaMaisText,
}: {
  article: Article;
  onClick: () => void;
  valveClubText: string;
  bookFooterText: string;
  leiaMaisText: string;
}) {
  const isBook = article?.id === "livro";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35, ease: easePremium }}
      className="rounded-[28px] border border-slate-200/80 bg-white/55 backdrop-blur shadow-[0_18px_60px_-28px_rgba(15,23,42,0.30)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_28px_90px_-45px_rgba(15,23,42,0.35)] cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="font-serif text-xl md:text-2xl text-ink tracking-[-0.015em] mb-2">
              {article.titulo}
            </h3>
            {article.subtitulo && (
              <p className="text-sm text-brand-navy/70 italic mb-2">
                {article.subtitulo}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-navy/20 shadow-md">
              <img
                src="/images/dra-leiza-publi.jpg"
                alt="Dra. Leiza Hollas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 mb-4 line-clamp-3">
          {article.resumo}
        </p>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-600">
              {isBook ? bookFooterText : valveClubText}
            </p>
            <span className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-brand-navy hover:text-brand-teal transition">
              {leiaMaisText}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy/10">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const isBook = article?.id === "livro";
  const isValveClub = article?.publisher === "the-valve-club";
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);

  const downloadHref =
    article?.downloadLink ||
    article?.download ||
    article?.download_url ||
    (isBook ? (t("publicacoes.livro.downloadLink") as string) : null);

  const paragraphs = String(article.conteudo || "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // Escape + scroll lock + foco no botão fechar
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Foca no botão fechar ao abrir
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap — mantém foco dentro do modal
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/60 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={article.titulo}
    >
      <motion.article
        ref={modalRef}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: easePremium }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-[0_32px_120px_-40px_rgba(15,23,42,0.40)] my-8"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 md:p-8 bg-white/95 backdrop-blur-sm border-b border-slate-100 rounded-t-[32px]">
          <div className="flex-1">
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-ink tracking-[-0.015em] leading-tight">
              {article.titulo}
            </h1>
            {article.subtitulo && (
              <p className="mt-2 text-lg text-brand-navy/70 italic">
                {article.subtitulo}
              </p>
            )}
            {article.data && (
              <p className="mt-2 text-sm text-brand-teal font-medium">
                {article.data}
              </p>
            )}
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur shadow-sm transition hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40"
            aria-label={t("publicacoes.fechar")}
          >
            <X className="h-5 w-5 text-brand-navy" />
          </button>
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-navy/30">
              <img
                src="/images/dra-leiza-publi.jpg"
                alt={t("publicacoes.autoraNome")}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-slate-900">
                {t("publicacoes.autoraNome")}
              </p>
              <p className="text-sm text-slate-600">
                {t("publicacoes.autoraEspecialidade")}
              </p>
            </div>
          </div>

          {!isBook && isValveClub && (
            <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/90 p-5 md:p-6">
              <div className="flex items-center gap-4">
                <img
                  src="/images/logo-the-valve.png"
                  alt="The Valve Club"
                  className="h-12 w-auto object-contain shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t("publicacoes.theValveClub.titulo")}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("publicacoes.theValveClub.assinatura")}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {t("publicacoes.theValveClub.descricao")}
              </p>
            </div>
          )}

          {isBook && (
            <div className="mb-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="md:w-56 shrink-0">
                  <img
                    src="/images/livro-dra-leiza.png"
                    alt={article.titulo}
                    className="w-full rounded-2xl shadow-lg border border-slate-200"
                  />
                </div>
                <div className="flex-1 rounded-2xl bg-slate-50 border border-slate-200 p-7">
                  <h3 className="font-serif text-lg text-brand-navy mb-3">
                    {t("publicacoes.informacoesTecnicas")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {article.isbn && (
                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-1">ISBN</p>
                        <p className="text-sm text-slate-700">{article.isbn}</p>
                      </div>
                    )}
                    {article.doi && (
                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-1">DOI</p>
                        <p className="text-sm text-slate-700">{article.doi}</p>
                      </div>
                    )}
                    {article.ano && (
                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-1">
                          {t("publicacoes.ano", { defaultValue: "Ano" })}
                        </p>
                        <p className="text-sm text-slate-700">{article.ano}</p>
                      </div>
                    )}
                    {article.paginas && (
                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-1">
                          {t("publicacoes.paginas", { defaultValue: "Páginas" })}
                        </p>
                        <p className="text-sm text-slate-700">{article.paginas}</p>
                      </div>
                    )}
                  </div>
                  {article.palavrasChave && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-600">{article.palavrasChave}</p>
                      {isBook && downloadHref && (
                        <div className="mt-4 flex justify-center">
                          <a
                            href={downloadHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md bg-gray-800/80 px-6 py-3 text-sm font-medium text-white shadow transition-colors duration-200 hover:bg-gray-800"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            <span>{t("publicacoes.downloadLivro")}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isBook && article.imagem && (
            <div className="mb-8">
              <img
                src={article.imagem}
                alt={article.titulo}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          )}

          {article.resumo && !isBook && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-brand-navy/5 via-brand-teal/5 to-transparent border border-brand-navy/10">
              <h2 className="font-serif text-lg md:text-xl text-brand-navy mb-3">
                {t("publicacoes.resumoLabel")}
              </h2>
              <p className="text-slate-700 leading-relaxed">{article.resumo}</p>
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            {paragraphs.map((p: string, idx: number) => (
              <p key={idx} className="text-slate-700 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>

          {!isBook && article.link && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-navy text-white font-medium text-sm transition hover:bg-brand-navy2 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40 focus-visible:ring-offset-2"
              >
                <span>{t("publicacoes.verArtigo")}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function PublicationsSection() {
  const { t } = useTranslation();

  const titulo = t("publicacoes.titulo");
  const valveClubText = t("publicacoes.theValveClub.curto");
  const bookFooterText = t("publicacoes.livroCard.rodape");
  const leiaMaisText = t("publicacoes.leiaMais");

  const artigos =
    (t("publicacoes.artigos", { returnObjects: true }) as Article[]) || [];

  const livroRaw = t("publicacoes.livro", { returnObjects: true }) as Article;

  const livroComoArtigo = livroRaw
    ? {
        id: "livro",
        titulo: livroRaw.titulo,
        subtitulo: livroRaw.data,
        resumo: livroRaw.resumo,
        conteudo: livroRaw.conteudo,
        downloadLink: livroRaw.downloadLink,
        data: livroRaw.data,
        imagem: livroRaw.imagem,
        isbn: livroRaw.isbn,
        doi: livroRaw.doi,
        ano: livroRaw.ano,
        paginas: livroRaw.paginas,
        palavrasChave: livroRaw.palavrasChave,
      }
    : null;

  const listaFinal = livroComoArtigo ? [livroComoArtigo, ...artigos] : artigos;

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="publicacoes" className="relative scroll-mt-24 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F6F8FC] to-[#EEF3FF]" />
      <div className="pointer-events-none absolute -left-44 top-10 h-[520px] w-[520px] rounded-full bg-brand-navy/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-56 -top-28 h-[640px] w-[640px] rounded-full bg-[#7AA6FF]/10 blur-3xl" />

      <Container className="relative py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: easePremium }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink md:text-4xl text-center">
            {titulo}
          </h2>
          <div className="mt-4 h-px w-32 bg-gradient-to-r from-brand-navy via-brand-teal to-transparent mx-auto" />
        </motion.div>

        <div className="space-y-6">
          {listaFinal.map((art, idx) => (
            <motion.div
              key={art?.id ?? idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easePremium, delay: idx * 0.06 }}
            >
              <ArticleCard
                article={art}
                onClick={() => setSelectedArticle(art)}
                valveClubText={valveClubText}
                bookFooterText={bookFooterText}
                leiaMaisText={leiaMaisText}
              />
            </motion.div>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}