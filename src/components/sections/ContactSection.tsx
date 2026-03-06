// Import hooks and utilities only as needed. Note: React import is unnecessary for the new JSX transform.
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";
import { motion } from "framer-motion";
import { useState } from "react";

// Import icons from lucide-react
import { Phone, Hospital, MapPin } from "lucide-react";

/**
 * ContactSection renders a contact form alongside contact details. The form
 * posts to Netlify using the built-in form handling (`data-netlify="true"`).
 * When the user submits the form, a simple success message is displayed
 * without preventing the default behaviour, allowing Netlify to process the
 * submission. The contact details are pulled from the translation file via
 * `useTranslation` with `returnObjects: true`.
 */
export default function ContactSection() {
  const { t } = useTranslation();
  // Retrieve all fields for the contact section from the translation file.
  const contact = t("contato", { returnObjects: true }) as Record<string, any>;
  // Track whether the form has been submitted locally so we can show a
  // confirmation message. This does not interfere with Netlify form submission.
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden bg-white"
    >
      {/* Background layers to match the premium aesthetic used throughout the site */}
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
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink md:text-4xl text-center"
        >
          {contact.titulo}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-4 max-w-2xl mx-auto text-center text-[15px] leading-[1.8] text-slate-700 md:text-base"
        >
          {contact.descricao}
        </motion.p>

        {/* Grid containing contact details (left) and form (right) */}
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {/* ✅ Contact details LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-brand-navy" />
              <span className="font-medium text-slate-700">
                {contact.telefone}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <Hospital className="h-6 w-6 text-brand-navy" />
              <span className="font-medium text-slate-700">
                {contact.hospital}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-brand-navy" />
              <span className="font-medium text-slate-700">
                {contact.endereco}
              </span>
            </div>
          </motion.div>

          {/* ✅ Contact form RIGHT */}
          <motion.form
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            name="contato"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={() => setSubmitted(true)}
            className="space-y-4"
          >
            {/* Hidden input to identify the form to Netlify */}
            <input type="hidden" name="form-name" value="contato" />

            {/* Honeypot field for spam bots; hidden from users */}
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

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
                name="nome"
                required
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-800 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
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
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-800 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
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
                name="mensagem"
                rows={5}
                required
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-800 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-gray-800/80 px-6 py-3 text-sm font-medium text-white shadow transition-colors duration-200 hover:bg-gray-800"
            >
              {contact.enviar}
            </button>

            {submitted && (
              <p className="text-sm text-green-600">{contact.sucesso}</p>
            )}
          </motion.form>
        </div>

        {/* Divider line at bottom */}
        <div className="mt-12 h-px w-2/3 bg-gradient-to-r from-brand-navy/20 via-brand-navy/10 to-transparent" />
      </Container>
    </section>
  );
}