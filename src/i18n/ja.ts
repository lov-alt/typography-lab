import type { Translations } from "./zh";

const ja: Translations = {
  app: { title: "Typography Lab" },
  home: {
    tagline: "Open Source Typography Tools",
    heading: "Typography Lab",
    subtitle: "オープンソース・タイポグラフィラボ — フォントペアリング、タイプスケール、行長コントロール",
    offline: "すべてのデータはブラウザに保存 — オフラインでも使えます",
    github: "GitHub",
  },
  tools: {
    "font-pairing": { name: "Font Pairing", desc: "Google Fonts ペアリングプレビュー、カテゴリフィルター、見出し+本文のライブ比較" },
    "type-scale": { name: "Type Scale", desc: "7種類のモジュラースケール — h1-h6+本文+キャプション、px/rem値表示" },
    "measure-rhythm": { name: "Measure & Rhythm", desc: "CPL計算機（45-75文字）、行間/段落間隔、ベースライングリッド" },
    editorial: { name: "Editorial", desc: "レイアウトプレビュー — ポスター、雑誌見開き、マルチカラム" },
  },
  typeScale: {
    title: "Type Scale", description: "モジュラータイプスケール — 7種類の比率 + 9段階のビジュアルランプ",
    baseSize: "基本サイズ", scale: "スケール比", scaleCustom: "カスタム", remBase: "rem基準 (1rem = )",
    heading: "見出し", body: "本文", caption: "キャプション",
    sampleHeading: "層台翠を聳やかし", sampleCaption: "— Typography Lab · オープンソース",
    sampleBody: "タイポグラフィは、言語に耐久性のある視覚的形態を与える技術です。優れたタイプデザインは階層を確立し、リズムを生み出し、読者をコンテンツへと導きます。",
  },
  fontPairing: {
    title: "Font Pairing", description: "Google Fonts ペアリング — 見出し+本文の組み合わせプレビュー",
    headingFont: "見出しフォント", bodyFont: "本文フォント",
    category: "カテゴリ", all: "すべて", serif: "セリフ", sansSerif: "サンセリフ",
    display: "ディスプレイ", mono: "モノスペース", handwriting: "手書き",
    search: "フォント検索...", preset: "定番ペア",
    sampleTitle: "The quick brown fox jumps over the lazy dog",
    sampleBodyEn: "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.",
    weight: "ウェイト",
  },
  measureRhythm: {
    title: "Measure & Rhythm", description: "CPL計算機 + ベースライングリッド",
    fontSize: "フォントサイズ", lineHeight: "行間", paragraphSpacing: "段落間隔",
    containerWidth: "コンテナ幅", cpl: "1行の文字数", cplOptimal: "最適範囲",
    baselineGrid: "ベースライングリッド",
    sample: "タイポグラフィは、言語に耐久性のある視覚的形態を与える技術です。優れたタイプデザインは階層を確立し、リズムを生み出し、読者をコンテンツへと導きます。",
  },
  editorial: {
    title: "Editorial Layout", description: "レイアウトプレビュー — ポスター、雑誌見開き、マルチカラム",
    layout: "レイアウト", poster: "ポスター", magazineSpread: "雑誌見開き", brochure: "パンフレット", bookPage: "書籍ページ",
    columns: "カラム数", showImage: "画像プレースホルダー", showPullQuote: "引用文", showDropCap: "ドロップキャップ",
    headline: "タイプの芸術", subhead: "フォント · リズム · 比率",
    bodyText: "良いタイポグラフィは目に見えない芸術です。読者がテキストの流れに没頭しているとき、彼らはフォントの選択や行間の設定、行長の計算に気づきません。しかし、これこそがタイポグラファーが技術を注ぎ込んだ部分なのです。",
    pullQuote: "デザインは装飾ではない。コミュニケーションである。良いタイポグラフィは言葉を語らせる。",
    caption: "Typography Lab · オープンソース",
  },
  code: { copy: "コピー", copied: "コピー済み" },
  common: { back: "ホームに戻る", add: "+ 追加", del: "削除", darkMode: "ダークモード" },
};

export default ja;
