import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  registrationSchema,
  trimesterOptions,
  weddingTimingOptions,
  concernOptions,
  contactMethodOptions,
} from "@/lib/schemas";
import { checkRateLimit } from "@/lib/rateLimiter";

function getLabel<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string | undefined,
): string {
  if (!value) return "-";
  return options.find((o) => o.value === value)?.label ?? value;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "입력값을 확인해주세요." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const etcParts = [
      "결혼지원금 임산부 광고 유입건",
      `임신 주수: ${getLabel(trimesterOptions, data.trimester)}`,
      `결혼 예정: ${getLabel(weddingTimingOptions, data.weddingTiming)}`,
      `궁금한 점: ${getLabel(concernOptions, data.concern)}`,
      `연락 방법: ${getLabel(contactMethodOptions, data.contactMethod)}`,
    ];

    await prisma.intraEstimate.create({
      data: {
        section_name: "결혼지원금신청_임산부",
        name: data.name,
        phone: data.phone,
        etc: etcParts.join(" / "),
        estimate_type: "5",
        status: "접수",
        del_yn: "N",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[register] error:", error);
    return NextResponse.json(
      { success: false, error: "일시적인 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
