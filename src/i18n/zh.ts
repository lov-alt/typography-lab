const zh = {
  app: { title: "Typography Lab" },

  home: {
    tagline: "Open Source Typography Tools",
    heading: "Typography Lab",
    subtitle: "开源版式可视化实验室 — 字体配对、排版缩放、行长控制",
    offline: "全部数据保存在本地浏览器，无需网络即可使用",
    github: "GitHub 开源",
  },

  tools: {
    "font-pairing": { name: "Font Pairing", desc: "Google Fonts 字体配对预览，分类筛选，实时对比标题+正文字体组合效果" },
    "type-scale": { name: "Type Scale", desc: "7 种 Modular Scale 排版缩放系统，h1-h6+body 九级可视化，px/rem 双值输出" },
    "measure-rhythm": { name: "Measure & Rhythm", desc: "最佳行长 CPL 计算器（45-75 字符），行高/段间距调节，基线网格可视化" },
    editorial: { name: "Editorial", desc: "编辑版面预览 — 海报、杂志跨页、多栏排版，真实场景验证字体和排版参数" },
  },

  typeScale: {
    title: "Type Scale",
    description: "排版缩放系统 — 7 种 modular scale + 九级可视化",
    baseSize: "基准字号",
    scale: "缩放比例",
    scaleCustom: "自定义",
    remBase: "rem 基准 (1rem = )",
    heading: "标题",
    body: "正文",
    caption: "注释",
    sampleHeading: "层台耸翠，上出重霄",
    sampleBody: "设计不是装饰，而是沟通。好的排版让文字自己会说话 — 字号层级清晰、行距舒适、行长不累眼。每一个像素的间距都是深思熟虑的结果。",
    sampleCaption: "— Typography Lab · 开源版式工具",
  },

  fontPairing: {
    title: "Font Pairing",
    description: "Google Fonts 字体配对 — 标题+正文组合预览",
    headingFont: "标题字体",
    bodyFont: "正文字体",
    category: "分类",
    all: "全部",
    serif: "衬线",
    sansSerif: "无衬线",
    display: "展示",
    mono: "等宽",
    handwriting: "手写",
    search: "搜索字体...",
    preset: "经典配对",
    sampleTitle: "The quick brown fox jumps over the lazy dog",
    sampleBodyEn: "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. Good typography establishes a strong visual hierarchy, provides a graphic balance to the design, and sets the overall tone.",
    weight: "字重",
  },

  measureRhythm: {
    title: "Measure & Rhythm",
    description: "行长 CPL 计算器 + 基线网格可视化",
    fontSize: "字号",
    lineHeight: "行高",
    paragraphSpacing: "段间距",
    containerWidth: "容器宽度",
    cpl: "每行字符数 (CPL)",
    cplOptimal: "最佳范围",
    baselineGrid: "基线网格",
    sample: "设计不是装饰，而是沟通。好的排版让文字自己会说话。字号层级清晰、行距舒适、行长不累眼。每一个像素的间距都是深思熟虑的结果。当读者沉浸在流畅的阅读体验中时，他们不会注意到排版的存在——这正是排版成功的标志。",
  },

  editorial: {
    title: "Editorial Layout",
    description: "编辑版面预览 — 海报、杂志跨页、多栏排版，真实场景验证字体和排版参数",
    layout: "版面类型",
    poster: "海报",
    magazineSpread: "杂志跨页",
    brochure: "三折页",
    bookPage: "书籍内页",
    columns: "栏数",
    showImage: "显示图片占位",
    showPullQuote: "显示引文",
    showDropCap: "显示首字下沉",
    headline: "排版之美",
    subhead: "字体 · 节奏 · 比例",
    bodyText: "好的排版是看不见的艺术。当读者沉浸在流畅的阅读体验中时，他们不会注意到字体的选择、行距的设定、栏宽的计算——但这些正是排版师倾注心血的地方。每一个像素的间距，都是深思熟虑的结果。",
    pullQuote: "设计不是装饰，而是沟通。好的排版让文字自己会说话。",
    caption: "Typography Lab · 开源版式工具",
  },

  code: {
    copy: "复制",
    copied: "已复制",
  },

  common: {
    back: "返回首页",
    add: "+ 添加",
    del: "删",
    darkMode: "切换暗色模式",
  },
};

export default zh;
export type Translations = typeof zh;
