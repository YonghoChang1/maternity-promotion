import { z } from "zod";

export const trimesterOptions = [
  { value: "early", label: "초기(~12주)" },
  { value: "mid", label: "안정기(13~27주)" },
  { value: "late", label: "후기(28주~)" },
  { value: "unsure", label: "잘 모르겠어요" },
] as const;

export const weddingTimingOptions = [
  { value: "3m", label: "3개월 이내" },
  { value: "6m", label: "6개월 이내" },
  { value: "1y", label: "1년 이내" },
  { value: "undecided", label: "아직 미정" },
] as const;

export const concernOptions = [
  { value: "eligibility", label: "혜택·할인 자격 여부" },
  { value: "schedule", label: "임산부 맞춤 스케줄" },
  { value: "dress", label: "드레스·촬영 시기" },
  { value: "overall", label: "전체적인 상담" },
] as const;

export const contactMethodOptions = [
  { value: "phone", label: "전화" },
  { value: "sms", label: "문자" },
  { value: "kakao", label: "카카오톡" },
] as const;

export const registrationSchema = z.object({
  name: z.string().min(2, "이름을 입력해주세요.").max(20),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "올바른 휴대폰 번호를 입력해주세요."),
  trimester: z.enum(["early", "mid", "late", "unsure"]).optional(),
  weddingTiming: z.enum(["3m", "6m", "1y", "undecided"]).optional(),
  concern: z.enum(["eligibility", "schedule", "dress", "overall"]).optional(),
  contactMethod: z.enum(["phone", "sms", "kakao"]).optional(),
  consentPrivacy: z
    .boolean()
    .refine((v) => v === true, {
      message: "개인정보 수집 이용에 동의해주세요.",
    }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
