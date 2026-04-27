import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "결혼지원금 | 임산부 커플 전용 | 다이렉트결혼준비",
  description:
    "결혼 준비와 임신 사이, 둘 다 축하받아야 할 일입니다. 스드메 10만 원 할인, 임산부 전담 플래너, 일정 변경 위약금 면제, 아가방 기프트박스까지.",
  openGraph: {
    title: "결혼지원금 | 임산부 커플 전용",
    description: "두 사람이 세 사람이 되는 시간, 결혼 준비도 함께 돌봐드릴게요.",
    type: "website",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
