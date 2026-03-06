import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const easePremium: any = [0.2, 0.7, 0.2, 1];

interface ArticleDetailProps {
  article: any;
  onClose: () => void;
}

export default function ArticleDetail({ article, onClose }: ArticleDetailProps) {

  // Split content into paragraphs
  const paragraphs: string[] = String(article.conteudo ?? "")
    .trim()
    .split(/\n\n+/g)
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/60 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: easePremium }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-[0_32px_120px_-40px_rgba(15,23,42,0.40)] my-8"
      >
        {/* Header with close button */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 md:p-8 bg-white/95 backdrop-blur-sm border-b border-slate-100 rounded-t-[32px]">
          <div className="flex-1">
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-ink tracking-[-0.015em] leading-tight">
              {article.titulo}
            </h1>
            {article.data && (
              <p className="mt-2 text-sm text-slate-600">{article.data}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur shadow-sm transition hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40"
            aria-label="Fechar"
          >
            <X className="h-5 w-5 text-brand-navy" />
          </button>
        </div>

        {/* Article content */}
        <div className="p-6 md:p-8 lg:p-10">
          {/* Summary section */}
          {article.resumo && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-brand-navy/5 via-brand-teal/5 to-transparent border border-brand-navy/10">
              <h2 className="font-serif text-lg md:text-xl text-brand-navy mb-3">
                Resumo
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {article.resumo}
              </p>
            </div>
          )}

          {/* Main content */}
          <div className="prose prose-slate max-w-none">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-slate-700 leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Link to original article */}
          {article.link && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-navy text-white font-medium text-sm transition hover:bg-brand-navy2 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40 focus-visible:ring-offset-2"
              >
                <span>Leia o artigo completo</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}
