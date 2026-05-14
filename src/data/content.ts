export const heroContent = {
  eyebrow: "임산부 결혼지원금",
  headline: ["두 가지를 동시에", "준비하고 계시죠.", "천천히", ", 같이 해요."] as const,
  sub: "입덧 가시기도 전에 웨딩홀 알아봐야 하는 그 마음, 알아요.\n임신 주수에 맞춰 일정을 짜고, 컨디션 안 좋은 날은 다시 잡습니다.",
  cta: "내 주수에 맞는 일정표 받아볼게요",
  ctaSub: "카톡으로 PDF 1장. 전화 안 해요.",
  trust: [
    { num: "47,830", lbl: "함께한 커플 (2024 기준)" },
    { num: "20년", lbl: "국내 1세대 웨딩 플래닝" },
    { num: "98,000원", lbl: "스드메 추가 할인 적용" },
  ],
} as const;

export const empathyContent = {
  eyebrow: "흔히 듣는 이야기",
  title: ["바쁘시죠.", "그 마음 알아요."] as const,
  meta: "최근 6개월 사이 가장 자주 들었던 이야기들이에요.",
  cards: [
    {
      stage: "초기 · 1–13주",
      title: "그날 컨디션, 아무도 모르잖아요",
      body: "입덧이 언제 올지 모르는데 웨딩홀 투어 예약은 이번 주말로 잡혀 있고. 다녀와서 내내 누워 있었던 분들 많으세요.",
      img: "/img/couple-04.jpg",
    },
    {
      stage: "중기 · 14–27주",
      title: "검진 사이로 쇼룸 다녀보셨어요?",
      body: "산부인과 다녀온 날 오후에 드레스샵 두 군데 돌고, 다음 주말엔 스튜디오 미팅. 오래 서 있기 힘든 날이 분명 있는데, 일정은 미리 잡아둬야 해요.",
      img: "/img/consulting-01.jpg",
    },
    {
      stage: "후기 · 28주+",
      title: "결정할 게 너무 많아요",
      body: "예비 부부이자 예비 부모. 두 사람의 페이스도, 걱정도 다른데, 매주 새로운 결정이 쌓여요.\n충분히 설명받을 시간이 필요합니다.",
      img: "/img/couple-emily.jpg",
    },
  ],
  closing: "그래서 저희가 세 가지를 덜어드리려 해요.",
  closingHighlights: ["체력", "시간", "비용"] as const,
} as const;

export const plannerContent = {
  eyebrow: "담당 플래너",
  name: "이수정",
  role: "다이렉트 임산부 웨딩 전담 · 13년차",
  img: "/img/consulting-03.png",
  quote:
    "저도 임신 31주에 결혼식 했어요. 입덧이 끝나기만 기다리다가 4개월을 보냈거든요. 그래서 압니다. 천천히, 같이 해요.",
  facts: [
    { lbl: "임산부 웨딩 진행", val: "320+ 커플" },
    { lbl: "평균 응답 시간", val: "카톡 18분" },
    { lbl: "재방문 선호도", val: "93%" },
  ],
} as const;

export const offerContent = {
  eyebrow: "혜택 정리",
  title: ["체력, 시간, 비용 —", "세 가지를 덜어드려요"] as const,
  badge: "모든 혜택 중복 적용",
  badgeSub: "임신확인서 또는 산모수첩 확인",
  promises: [
    {
      kind: "numeric" as const,
      label: "비용",
      icon: "₩",
      title: "스드메 패키지 98,000원 할인",
      body: "다이렉트 스드메 계약 시 자동 적용. 다른 모든 혜택과 중복 가능합니다. 임신확인서나 산모수첩만 보여주시면 돼요.",
      big: "98",
      suffix: ",000원",
      strike: "정가 대비",
    },
    {
      kind: "photo" as const,
      label: "체력",
      icon: "♡",
      title: "오래 서 있지 않아도 돼요",
      body: "촬영 동선에 휴식 시간을 미리 배치하고, 드레스 피팅은 임신 주수에 맞춰 잡아드립니다.",
      img: "/img/dress-13.jpg",
    },
    {
      kind: "photo" as const,
      label: "시간",
      icon: "◷",
      title: "주수에 맞춘 일정표",
      body: "안정기에 촬영, 중기에 드레스 확정, 후기 전에 잔금까지. 출산 전 마무리 가능한 순서로요.",
      img: "/img/consulting-02.jpg",
    },
  ],
  benefitsTitle: "그리고 몇 가지 더",
  benefits: [
    {
      title: "임산부 웨딩 경험 있는 플래너",
      body: "주수별로 뭘 먼저 해야 하는지 아는 사람이 배정됩니다.",
    },
    {
      title: "일정 변경 1회 무료",
      body: "컨디션이 갑자기 안 좋아진 날, 검진과 겹친 날. 위약금 없이 바꿔드려요.",
    },
    {
      title: "결혼식 이후에도 진행가",
      body: "만삭 촬영, 백일, 돌까지. 결혼식이 끝이 아닙니다.",
    },
    {
      title: "아가방 기프트박스",
      body: "스드메 계약하시면 드려요. 의류, 손수건, 양말, 물티슈로 구성된 약 9만 원 상당의 실물입니다.",
    },
  ],
  notice:
    "혜택은 스드메 계약 시점에 신청하셔야 적용돼요. 계약 당일 담당 플래너에게 말씀해 주시면 됩니다.",
  cta: "이거 받을 수 있나요?",
  ctaSub: "주수만 알려주시면 가능 여부 바로 확인해드려요",
} as const;

export const galleryContent = {
  eyebrow: "최근 진행한 웨딩",
  title: ["만삭에도,", "출산 후에도."] as const,
  meta: "다이렉트와 함께한 임산부 부부들의 실제 컷. 모두 임신 중 또는 출산 직후에 촬영했어요.",
  items: [
    { src: "/img/couple-0001.jpg", cls: "g-1", alt: "정OO·김OO 부부", caption: "촬영 당시 28주차" },
    { src: "/img/couple-fia-008.jpg", cls: "g-2", alt: "한OO·박OO 부부", caption: "촬영 당시 22주차" },
    { src: "/img/couple-emily.jpg", cls: "g-3", alt: "윤OO·서OO 부부", caption: "출산 후 3개월" },
    { src: "/img/couple-006.jpg", cls: "g-4", alt: "이OO·최OO 부부", caption: "촬영 당시 31주차" },
    { src: "/img/couple-fia-036.jpg", cls: "g-5", alt: "강OO·조OO 부부", caption: "촬영 당시 18주차" },
  ],
  credit: "촬영 · 제휴 스튜디오 BeMy, BougainVillea, Fia, Emily L'Amour",
  captured: "2024 — 2025",
} as const;

export const faqContent = {
  eyebrow: "자주 묻는 질문",
  title: "궁금한 거 있으세요?",
  note: "산모수첩이나 임신확인서만 있으면 돼요. 사진 촬영본도 괜찮습니다.",
  items: [
    { q: "임신 초기인데도 신청할 수 있나요?", a: "주수와 관계없이 가능합니다. 오히려 초기일수록 일정에 여유가 있어서 좋아요." },
    { q: "출산 후에 촬영하고 싶은데, 지금 신청해도 되나요?", a: "계약 시점에 신청하시고 촬영은 출산 후로 잡으셔도 돼요. 따로 가능합니다." },
    { q: "드레스 사이즈가 걱정돼요. 배가 더 나올 텐데요.", a: "주수에 맞는 피팅 시기를 플래너가 안내해드려요. 제휴 드레스샵에서 임산부 맞춤 보정도 가능합니다." },
    { q: "촬영 날 컨디션이 안 좋으면요?", a: "위약금 없이 1회 변경 가능합니다. 갑자기 컨디션이 떨어지는 거 정말 흔해서 부담 갖지 마세요." },
    { q: "계약 후에 임신 사실을 알게 됐어요. 소급 적용되나요?", a: "안타깝게도 계약 완료 이후엔 소급이 어려워요. 다만 업그레이드 계약 시 적용 가능 여부는 플래너에게 문의해 주세요." },
    { q: "아가방 기프트박스는 어떤 구성이에요?", a: "아기 의류, 손수건, 양말, 물티슈 등이 들어간 약 9만 원 상당의 실물 박스입니다." },
    { q: "배우자가 대신 상담받아도 되나요?", a: "물론이요. 배우자분 단독으로 진행하셔도 전혀 문제없어요." },
  ],
} as const;

export const formContent = {
  eyebrow: "맞춤 일정표 받기",
  title: "주수만 알려주시면 돼요",
  sub: "신청 다음 날 오후, 카톡으로 임신 주수에 맞춘 결혼 준비 일정표 1장을 먼저 보내드려요.\n전화 부담스러우시면 카톡으로만 진행해도 됩니다.",
  submit: "일정표 받아볼게요",
  successTitle: "신청 완료됐어요",
  successBody:
    "내일 오후, 카톡으로 임신 주수에 맞춘 일정표 1장을 먼저 보내드릴게요. 그 다음 단계는 그때 정하셔도 됩니다.",
  trust: [
    "내일 오후, 카톡으로 일정표 먼저 보내드려요",
    "전화 원치 않으시면 카톡으로만 진행 가능",
    "중간에 그만두고 싶으시면 언제든 말씀하세요",
  ],
  contactCenter: "1666-8639",
} as const;

export const footerContent = {
  company: "다이렉트결혼준비",
  tagline: "국내 1세대 웨딩 플래닝 · 2006년 설립",
  contactCenter: "1666-8639",
  privacyLink: "https://directwedding.co.kr/privacy",
} as const;
