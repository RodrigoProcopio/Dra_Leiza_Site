import { useTranslation } from "react-i18next";
import Container from "../layout/Container";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Hospital, MapPin } from "lucide-react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const { t } = useTranslation();
  const contact = t("contato", { returnObjects: true }) as Record<string, string>;

  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      setStatus("loading");

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      formRef.current.reset();

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setStatus("error");
    }
  }

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F6F8FC] to-[#EEF3FF]" />
      <div className="pointer-events-none absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-brand-navy/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-44 -top-20 h-[520px] w-[520px] rounded-full bg-[#7AA6FF]/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-[-200px] h-[620px] w-[620px] rounded-full bg-[#B8E2FF]/14 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-1/3 top-0 h-full w-[70%] rotate-[12deg] bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[url('/images/bg-texture.jpg')] bg-cover bg-center" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('/images/grain.png')] bg-repeat" />

      <Container className="relative py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink md:text-4xl text-center"
        >
          {contact.titulo}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-4 max-w-2xl mx-auto text-center text-[15px] leading-[1.8] text-slate-700 md:text-base"
        >
          {contact.descricao}
        </motion.p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Telefone clicável */}
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 shrink-0 text-brand-navy" />
              <a
                href="tel:+554130166622"
                className="font-medium text-slate-700 hover:text-brand-navy transition-colors"
              >
                {contact.telefone}
              </a>
            </div>

            <div className="flex items-start gap-4">
              <Hospital className="h-6 w-6 shrink-0 text-brand-navy" />
              <span className="font-medium text-slate-700">
                {contact.hospital}
              </span>
            </div>

            {/* Endereço clicável para Google Maps */}
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 shrink-0 text-brand-navy" />
              <a
                href="https://maps.google.com/?q=Av.+Vicente+Machado+1280+Batel+Curitiba+PR"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 hover:text-brand-navy transition-colors"
              >
                {contact.endereco}
              </a>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-slate-700"
              >
                {contact.nome}
              </label>
              <input
                type="text"
                id="nome"
                name="from_name"
                required
                disabled={status === "loading"}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-800 shadow-sm focus:border-brand-navy focus:ring-brand-navy disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                {contact.email}
              </label>
              <input
                type="email"
                id="email"
                name="from_email"
                required
                disabled={status === "loading"}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-800 shadow-sm focus:border-brand-navy focus:ring-brand-navy disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="block text-sm font-medium text-slate-700"
              >
                {contact.mensagem}
              </label>
              <textarea
                id="mensagem"
                name="message"
                rows={5}
                required
                disabled={status === "loading"}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-800 shadow-sm focus:border-brand-navy focus:ring-brand-navy disabled:opacity-60"
              />
            </div>

            {/* Aviso LGPD */}
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("contato.lgpd")}
            </p>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-800/80 px-6 py-3 text-sm font-medium text-white shadow transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" && (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {status === "loading" ? t("contato.enviando") : contact.enviar}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-600">{contact.sucesso}</p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-600">{contact.erro}</p>
            )}
          </motion.form>
        </div>

        <div className="mt-12 h-px w-2/3 bg-gradient-to-r from-brand-navy/20 via-brand-navy/10 to-transparent" />
      </Container>
    </section>
  );
}