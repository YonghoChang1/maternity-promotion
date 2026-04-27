"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { formContent, footerContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useInView } from "@/hooks/useInView";
import {
  registrationSchema,
  trimesterOptions,
  weddingTimingOptions,
  concernOptions,
  contactMethodOptions,
  type RegistrationInput,
} from "@/lib/schemas";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

type FieldKey = keyof RegistrationInput;

export function FormSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    trimester: "",
    weddingTiming: "",
    concern: "",
    contactMethod: "",
    consentPrivacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const payload = {
      name: form.name.trim(),
      phone: form.phone,
      trimester: form.trimester || undefined,
      weddingTiming: form.weddingTiming || undefined,
      concern: form.concern || undefined,
      contactMethod: form.contactMethod || undefined,
      consentPrivacy: form.consentPrivacy,
    };

    const parsed = registrationSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<FieldKey, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as FieldKey | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { success: boolean; error?: string };
      if (!res.ok || !json.success) {
        setApiError(json.error ?? "일시적인 오류가 발생했습니다.");
        return;
      }
      setSubmitted(true);
    } catch {
      setApiError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="form-section"
      ref={ref}
      className="relative w-full bg-[var(--ink)] text-white overflow-hidden"
      style={{ paddingBlock: "var(--section-py)" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle, var(--terracotta) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative mx-auto grid grid-cols-12 gap-6 md:gap-12 lg:gap-20 items-start"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--container-px)",
        }}
      >
        {/* ============ LEFT ============ */}
        <div className="col-span-12 md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow variant="light">{formContent.eyebrow}</Eyebrow>
            <h2
              className="mt-6 md:mt-8 font-medium leading-[1.1] break-keep-all text-white"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4.8vw, 3.5rem)",
                letterSpacing: "-0.025em",
              }}
            >
              {formContent.title}
            </h2>
            <p className="mt-6 md:mt-8 text-[15px] md:text-base leading-relaxed text-white/75 break-keep-all max-w-md">
              {formContent.subtitle}
            </p>

            {/* Contact card */}
            <div className="mt-10 p-1.5 rounded-[var(--radius-lg)] bg-white/5 ring-1 ring-white/10 max-w-sm">
              <div className="rounded-[calc(var(--radius-lg)-0.375rem)] bg-white/[0.04] backdrop-blur-sm p-5">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--terracotta)]/20 text-[var(--terracotta-light)]">
                    <Icon
                      icon="solar:phone-calling-linear"
                      width={22}
                      height={22}
                    />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/50 font-medium">
                      바로 통화 원하시면
                    </p>
                    <a
                      href={`tel:${footerContent.contactCenter}`}
                      className="mt-1 block text-xl md:text-2xl font-medium text-white"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {footerContent.contactCenter}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust points */}
            <ul className="mt-8 space-y-3 text-[13.5px] text-white/65">
              {[
                "영업일 기준 1~2일 내 연락",
                "상담은 카카오/전화 중 선택",
                "중간 중단 원하시면 언제든 가능",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Icon
                    icon="solar:check-circle-linear"
                    width={16}
                    height={16}
                    className="text-[var(--sage)] shrink-0"
                  />
                  <span className="break-keep-all">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ============ RIGHT: form card (double-bezel, bright on dark) ============ */}
        <div className="col-span-12 md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-1.5 rounded-[var(--radius-2xl)] bg-white/5 ring-1 ring-white/10"
          >
            <div
              className="rounded-[calc(var(--radius-2xl)-0.375rem)] bg-[var(--paper)] p-6 md:p-10 text-[var(--ink)]"
              style={{ boxShadow: "var(--shadow-inner-highlight)" }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-8 md:py-12"
                  >
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--sage)]/15 text-[var(--sage-dark)]">
                      <Icon
                        icon="solar:check-circle-bold"
                        width={32}
                        height={32}
                      />
                    </span>
                    <h3
                      className="mt-6 text-2xl md:text-3xl font-medium text-[var(--ink)] break-keep-all"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {formContent.successTitle}
                    </h3>
                    <p className="mt-4 max-w-md mx-auto text-[15px] leading-relaxed text-[var(--graphite)] break-keep-all">
                      {formContent.successBody}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField
                        label="성함"
                        value={form.name}
                        onChange={(v) => updateField("name", v)}
                        placeholder="홍길동"
                        error={errors.name}
                        required
                        autoComplete="name"
                      />
                      <TextField
                        label="연락처"
                        value={form.phone}
                        onChange={(v) => updateField("phone", formatPhone(v))}
                        placeholder="010-0000-0000"
                        error={errors.phone}
                        required
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>

                    <ChipGroup
                      label="임신 주수"
                      options={trimesterOptions}
                      value={form.trimester}
                      onChange={(v) => updateField("trimester", v)}
                    />
                    <ChipGroup
                      label="결혼 예정 시기"
                      options={weddingTimingOptions}
                      value={form.weddingTiming}
                      onChange={(v) => updateField("weddingTiming", v)}
                    />
                    <ChipGroup
                      label="가장 궁금한 점"
                      options={concernOptions}
                      value={form.concern}
                      onChange={(v) => updateField("concern", v)}
                    />
                    <ChipGroup
                      label="선호하는 연락 방법"
                      options={contactMethodOptions}
                      value={form.contactMethod}
                      onChange={(v) => updateField("contactMethod", v)}
                    />

                    <label className="flex items-start gap-3 cursor-pointer select-none pt-3 border-t border-[var(--border)]">
                      <input
                        type="checkbox"
                        checked={form.consentPrivacy}
                        onChange={(e) =>
                          updateField("consentPrivacy", e.target.checked)
                        }
                        className="mt-0.5 w-4 h-4 rounded border-[var(--border)] accent-[var(--ink)]"
                      />
                      <span className="text-[13.5px] text-[var(--graphite)] leading-relaxed break-keep-all">
                        개인정보 수집 및 이용에 동의합니다. (상담 진행 목적,
                        수집 후 3개월 보관){" "}
                        <a
                          href={footerContent.privacyLink}
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-2 text-[var(--ink)]"
                        >
                          자세히
                        </a>
                      </span>
                    </label>
                    {errors.consentPrivacy && (
                      <p className="text-xs text-[var(--terracotta-dark)] -mt-4">
                        {errors.consentPrivacy}
                      </p>
                    )}

                    {apiError && (
                      <div className="rounded-[var(--radius-sm)] bg-[var(--terracotta)]/8 border border-[var(--terracotta)]/20 p-3 text-sm text-[var(--terracotta-dark)] break-keep-all">
                        {apiError}
                      </div>
                    )}

                    <div className="pt-2 flex flex-col md:flex-row md:items-center gap-3">
                      <MagneticButton type="submit" variant="primary">
                        {submitting ? "전송 중..." : formContent.submitText}
                      </MagneticButton>
                      <span className="text-[13px] text-[var(--graphite-light)] md:pl-2">
                        영업일 기준 1~2일 내 연락드려요
                      </span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email";
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] font-medium text-[var(--ink)] uppercase tracking-[0.12em]">
        {label}
        {required && <span className="text-[var(--terracotta-dark)] ml-1">*</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-white px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-[var(--ink)]"
        style={{
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-smooth)",
        }}
      />
      {error && (
        <span className="text-xs text-[var(--terracotta-dark)]">{error}</span>
      )}
    </label>
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[12.5px] font-medium text-[var(--ink)] uppercase tracking-[0.12em]">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(active ? "" : o.value)}
              className={`rounded-full px-4 py-2 text-[13.5px] font-medium border transition-all ${
                active
                  ? "bg-[var(--ink)] text-white border-[var(--ink)] scale-[1.02]"
                  : "bg-white text-[var(--graphite)] border-[var(--border)] hover:border-[var(--ink)]/30 hover:bg-[var(--mist-soft)]"
              }`}
              style={{
                transitionDuration: "var(--duration-base)",
                transitionTimingFunction: "var(--ease-smooth)",
              }}
              aria-pressed={active}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
