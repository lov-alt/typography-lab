const zh = {
  app: { title: "Typography Lab" },

  home: {
    tagline: "内容驱动的版式实验室",
    heading: "什么内容，配什么版式",
    subtitle: "选择内容类型 → 获得专业排版方案 → 导入你的字体和图片 → 微调导出",
    github: "GitHub 开源",
  },

  archetypes: {
    editorial: {
      name: "编辑文章",
      desc: "长篇新闻报道、杂志专题的经典排版——多栏网格、首字下沉、引文侧栏",
    },
    poster: {
      name: "活动海报",
      desc: "大胆的标题层级、戏剧化的字号对比、紧凑的信息密度",
    },
    menu: {
      name: "餐饮菜单",
      desc: "优雅的菜品排列、价格对齐、分类分隔、留白呼吸感",
    },
    book: {
      name: "书籍内页",
      desc: "小说或散文的经典书籍排版——舒适行长、章节标题、段落缩进",
    },
    hero: {
      name: "落地页首屏",
      desc: "网页 Hero Section — CTA 按钮层级、价值主张突出、视觉焦点引导",
    },
    card: {
      name: "名片",
      desc: "极小空间的排版精度——信息优先级、对齐网格、留白力量",
    },
  },

  editor: {
    heading: "标题",
    subhead: "副标题",
    body: "正文",
    caption: "标注",
    cta: "行动号召",
    price: "¥38",
    dishName: "招牌红烧牛肉面",
    dishDesc: "精选牛腱肉 · 手工拉面 · 八小时熬制骨汤",
    date: "2026.06.15",
    location: "上海 · 西岸艺术中心",
    author: "王小明",
    chapter: "第三章",
    sampleBody: "设计不是装饰，而是沟通。好的排版让文字自己会说话——字号层级清晰、行距舒适、行长不累眼。每一个像素的间距都是深思熟虑的结果。当读者沉浸在流畅的阅读体验中时，他们不会注意到排版的存在——这正是排版成功的标志。",
    sampleBodyLong: "在数字时代，排版已经从印刷品的专属技艺演变为每个人日常沟通的一部分。从微信消息到企业官网，从个人博客到商业提案，文字无处不在。然而，大多数人对排版的认知仍然停留在「选个好看的字体」的层面。真正的排版是关于信息架构——它决定了读者先看到什么，后看到什么，什么被强调，什么被弱化。一个好的排版系统，就像一个无声的导游，带领读者在信息的海洋中找到方向。",
    importFont: "导入字体",
    importImage: "导入图片",
    fontSize: "字号",
    lineHeight: "行高",
    reset: "恢复默认",
    export: "导出 CSS",
  },

  code: { copy: "复制", copied: "已复制" },
  common: { back: "返回首页", darkMode: "切换暗色模式" },
};

export default zh;
export type Translations = typeof zh;
