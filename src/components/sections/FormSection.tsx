"use client";

import { useState } from "react";
import { formContent, footerContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CTA } from "@/components/ui/CTA";
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
      const target = document.getElementById("form-section");
      if (target) {
        window.scrollTo({ top: target.offsetTop - 20, behavior: "smooth" });
      }
    } catch {
      setApiError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-section" id="form-section">
      <span className="glow" />
      <div className="container">
        <div className="form-side reveal">
          <Eyebrow light>{formContent.eyebrow}</Eyebrow>
          <h2>{formContent.title}</h2>
          <p className="sub">{formContent.sub}</p>
          <div className="contact-card">
            <span className="ico">☎</span>
            <div>
              <span className="lbl">바로 통화 원하시면</span>
              <a className="num" href={`tel:${formContent.contactCenter}`}>
                {formContent.contactCenter}
              </a>
            </div>
          </div>
          <ul className="trust-list">
            {formContent.trust.map((t) => (
              <li key={t}>
                <span className="check">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="form-card reveal reveal-delay-1">
          <div className="form-card-inner">
            {submitted ? (
              <div className="success-state">
                <span className="ico">✓</span>
                <h3>{formContent.successTitle}</h3>
                <p>{formContent.successBody}</p>
              </div>
            ) : (
              <form className="form-grid" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="field">
                    <label>
                      성함<span className="req">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="홍길동"
                      autoComplete="name"
                    />
                    {errors.name && <span className="err">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label>
                      연락처<span className="req">*</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        updateField("phone", formatPhone(e.target.value))
                      }
                      placeholder="010-0000-0000"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="err">{errors.phone}</span>}
                  </div>
                </div>

                <Chip
                  label="임신 주수"
                  options={trimesterOptions}
                  value={form.trimester}
                  onChange={(v) => updateField("trimester", v)}
                />
                <Chip
                  label="결혼 예정 시기"
                  options={weddingTimingOptions}
                  value={form.weddingTiming}
                  onChange={(v) => updateField("weddingTiming", v)}
                />
                <Chip
                  label="가장 궁금한 점"
                  options={concernOptions}
                  value={form.concern}
                  onChange={(v) => updateField("concern", v)}
                />
                <Chip
                  label="선호하는 연락 방법"
                  options={contactMethodOptions}
                  value={form.contactMethod}
                  onChange={(v) => updateField("contactMethod", v)}
                />

                <label className="consent">
                  <input
                    type="checkbox"
                    checked={form.consentPrivacy}
                    onChange={(e) =>
                      updateField("consentPrivacy", e.target.checked)
                    }
                  />
                  <span>
                    개인정보 수집 및 이용에 동의합니다. (상담 진행 목적, 수집 후 3개월 보관){" "}
                    <a
                      href={footerContent.privacyLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      자세히
                    </a>
                  </span>
                </label>
                {errors.consentPrivacy && (
                  <span className="err" style={{ marginTop: -12 }}>
                    {errors.consentPrivacy}
                  </span>
                )}

                {apiError && <div className="form-api-error">{apiError}</div>}

                <div className="form-submit">
                  <CTA type="submit" disabled={submitting}>
                    {submitting ? "전송 중..." : formContent.submit}
                  </CTA>
                  <span className="meta">영업일 기준 1~2일 내 연락드려요</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({
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
    <div className="chip-group">
      <label>{label}</label>
      <div className="chips">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              className={"chip" + (active ? " active" : "")}
              onClick={() => onChange(active ? "" : o.value)}
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
