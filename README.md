<p align="center">
  <img src="public/favicon.svg" width="64" alt="Typography Lab" />
</p>

<h1 align="center">Typography Lab</h1>

<p align="center">
  <strong>开源版式可视化实验室</strong><br/>
  字体配对 · 排版缩放 · 行长控制 · 基线网格<br/>
  告别猜测，用数据驱动排版决策
</p>

<p align="center">
  <a href="https://lov-alt.github.io/typography-lab/"><img src="https://img.shields.io/badge/demo-live-6366f1?style=flat-square" alt="Live Demo" /></a>
  <a href="https://github.com/lov-alt/typography-lab/stargazers"><img src="https://img.shields.io/github/stars/lov-alt/typography-lab?style=flat-square&color=f59e0b" alt="Stars" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/lov-alt/typography-lab?style=flat-square&color=6366f1" alt="MIT" /></a>
</p>

---

## Tools

### Type Scale
7 种 modular scale（1.2 / 1.25 / 1.333 / 1.414 / 1.5 / 1.618 / Custom），h1–h6 + body + small + caption 九级可视化，px/rem 双值显示，导出 CSS custom properties / Tailwind config / JSON。

### Font Pairing
Google Fonts 动态加载，标题字体 + 正文字体独立选择，6 种分类筛选，6 组经典预设配对，字重独立调节，实时预览中/英/日样本。

### Measure & Rhythm
CPL (characters per line) 计算器，最佳 45–75 字符范围指示，行高/段间距/容器宽度滑块，CSS repeating-linear-gradient 基线网格叠加，偏差预警。

## Quick Start

```bash
git clone https://github.com/lov-alt/typography-lab.git
cd typography-lab
npm install
npm run dev
```

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Google Fonts API

## License

MIT
