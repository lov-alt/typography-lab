import type { Translations } from "./zh";

const ja: Translations = {
  app: { title: "Typography Lab" },
  home: {
    tagline: "コンテンツ駆動のタイポグラフィラボ",
    heading: "コンテンツに最適なレイアウト",
    subtitle: "コンテンツタイプ選択 → プロレイアウト取得 → フォントと画像をインポート → 微調整してエクスポート",
    github: "GitHub",
  },
  archetypes: {
    editorial: { name: "編集記事", desc: "新聞・雑誌のクラシックなレイアウト — マルチカラム、ドロップキャップ、引用" },
    poster: { name: "イベントポスター", desc: "大胆なタイトル階層、劇的なスケールコントラスト、コンパクトな情報密度" },
    menu: { name: "レストランメニュー", desc: "エレガントな料理配置、価格の整列、カテゴリ区切り、余白の呼吸" },
    book: { name: "書籍ページ", desc: "クラシックな小説レイアウト — 快適な行長、章見出し、段落インデント" },
    hero: { name: "ランディングヒーロー", desc: "ウェブヒーローセクション — CTA階層、価値提案の強調、視線誘導" },
    card: { name: "名刺", desc: "最小空間での精度 — 情報の優先順位、整列グリッド、余白の力" },
  },
  editor: {
    heading: "見出し", subhead: "サブ見出し", body: "本文", caption: "キャプション", cta: "行動喚起",
    price: "¥1,200", dishName: "特製ラーメン", dishDesc: "厳選牛肉 · 手打ち麺 · 8時間煮込みスープ",
    date: "2026.06.15", location: "上海 · 西岸芸術センター", author: "王 小明", chapter: "第三章",
    sampleBody: "タイポグラフィは、言語に耐久性のある視覚的形態を与える技術です。優れたタイプデザインは階層を確立し、リズムを生み出し、読者をコンテンツへと導きます。読者がテキストの流れに没頭しているとき、彼らは組版に気づきません。",
    sampleBodyLong: "デジタル時代において、タイポグラフィは印刷物の専売特許から、誰もが日常的に使うコミュニケーションの一部へと進化しました。メッセージから企業サイト、個人ブログからビジネス提案まで、テキストはあらゆるところに存在します。",
    importFont: "フォント読込", importImage: "画像読込", fontSize: "文字サイズ", lineHeight: "行間",
    reset: "リセット", export: "CSS出力",
  },
  code: { copy: "コピー", copied: "コピー済み" },
  common: { back: "ホームに戻る", darkMode: "ダークモード" },
};

export default ja;
