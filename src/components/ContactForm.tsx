"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { siteConfig, socialLinks } from "@/lib/site";
import type { ContactInquiry } from "@/types/menu";

interface ContactFormProps {
  presetItem?: string;
}

const emptyForm: ContactInquiry = {
  name: "",
  email: "",
  phone: "",
  occasion: "",
  frosting: "not-sure",
  message: "",
};

export function ContactForm({ presetItem }: ContactFormProps) {
  const searchParams = useSearchParams();
  const itemFromUrl = searchParams.get("item") ?? presetItem;
  const initial = useMemo<ContactInquiry>(
    () => ({
      ...emptyForm,
      message: itemFromUrl
        ? `Hi Sue, I’d love to order the ${itemFromUrl}. `
        : "",
      occasion: itemFromUrl ?? "",
    }),
    [itemFromUrl],
  );

  const [form, setForm] = useState<ContactInquiry>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus("success");
        setForm(emptyForm);
        return;
      }
    } catch {
      // Static hosts have no API route — fall through to WhatsApp.
    }
    const whatsapp = new URL(siteConfig.whatsappHref);
    whatsapp.searchParams.set(
      "text",
      `Order from ${form.name}\n${form.email}\n${form.phone}\n${form.occasion}\nFrosting: ${form.frosting}\n${form.message}`,
    );
    window.open(whatsapp.toString(), "_blank", "noopener,noreferrer");
    setStatus("success");
    setForm(emptyForm);
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-accent2 bg-card p-8 text-center"
      >
        <p className="font-display text-2xl text-fg">Thank you.</p>
        <p className="mt-3 text-sm text-muted">
          We’ll reply with availability. WhatsApp is faster if you need to lock a date.
        </p>
        <a
          href={siteConfig.whatsappHref}
          className="mt-6 inline-flex rounded-full bg-invert px-5 py-2 text-xs tracking-[0.16em] text-on-invert uppercase"
        >
          Open WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-xs tracking-[0.14em] text-fg/60 uppercase">
          Name
          <input
            required
            name="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </label>
        <label className="block text-xs tracking-[0.14em] text-fg/60 uppercase">
          Email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </label>
        <label className="block text-xs tracking-[0.14em] text-fg/60 uppercase">
          Phone
          <input
            required
            name="phone"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </label>
        <label className="block text-xs tracking-[0.14em] text-fg/60 uppercase">
          Occasion / cake
          <input
            name="occasion"
            value={form.occasion}
            onChange={(event) => setForm({ ...form, occasion: event.target.value })}
            placeholder="Birthday, half-cake, floral…"
            className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </label>
      </div>
      <fieldset>
        <legend className="text-xs tracking-[0.14em] text-fg/60 uppercase">
          Frosting preference
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["whipped", "Whipped cream"],
              ["buttercream", "Buttercream"],
              ["not-sure", "Help me choose"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs ${
                form.frosting === value
                  ? "bg-invert text-on-invert"
                  : "bg-bg2 text-fg"
              }`}
            >
              <input
                type="radio"
                name="frosting"
                value={value}
                checked={form.frosting === value}
                onChange={() => setForm({ ...form, frosting: value })}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-xs tracking-[0.14em] text-fg/60 uppercase">
        Details
        <textarea
          required
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </label>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-invert px-6 py-3 text-xs tracking-[0.18em] text-on-invert uppercase disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send inquiry"}
      </button>
      <p className="text-xs text-fg/50">
        Or write on{" "}
        {socialLinks.map((social, index) => (
          <span key={social.name}>
            <a href={social.href} className="underline decoration-accent">
              {social.name}
            </a>
            {index < socialLinks.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
    </form>
  );
}
