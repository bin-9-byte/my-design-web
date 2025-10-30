# My Design Portfolio Website

基于 React + TypeScript + Vite + Tailwind CSS 构建的现代化个人设计作品集网站。

## ✨ 特性

- 🎨 优雅的设计风格
  - 包豪斯风格的几何元素
  - 流畅的动画过渡效果
  - 精心设计的排版和间距

- 🌓 智能主题系统
  - 支持亮色/暗色主题切换
  - 自动识别系统主题偏好
  - 主题选择本地持久化
  - 实时响应系统主题变化

- 📱 响应式设计
  - 完美适配桌面端和移动端
  - 优雅的导航栏自适应
  - 合理的内容布局调整

- 🎯 交互体验优化
  - 平滑的页面滚动
  - 渐进式内容加载
  - 优雅的悬停效果
  - 清晰的视觉反馈

## 🛠 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式解决方案**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **代码规范**: ESLint
- **包管理**: npm

## 🚀 快速开始

1. 克隆项目
```bash
git clone https://github.com/bin-9-byte/my-design-web.git
```

2. 安装依赖
```bash
cd my-design-web
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 📦 项目结构

```
my-design-web/
├── src/
│   ├── components/     # 可复用组件
│   │   ├── Hero.tsx   # 首页主视觉
│   │   ├── About.tsx  # 关于我
│   │   ├── Portfolio.tsx  # 作品展示
│   │   └── Button.tsx # 通用按钮
│   ├── assets/        # 静态资源
│   ├── lib/          # 工具函数
│   ├── App.tsx       # 应用入口
│   └── main.tsx      # 主入口
├── public/           # 公共资源
└── ...配置文件
```

## 🎯 主要功能

- 🏠 **首页(Hero)**
  - 动态几何背景
  - 响应式标题与简介
  - 社交媒体链接

- 👤 **关于我(About)**
  - 个人简介
  - 工作经历时间线
  - 技能展示进度条

- 🎨 **作品集(Portfolio)**
  - 网格布局展示
  - 作品卡片动画
  - 标签与分类

## 📝 开发规范

- 组件文件使用 Pascal Case (如 `Button.tsx`)
- 工具函数使用 camelCase (如 `utils.ts`)
- 遵循 ESLint 配置的代码规范
- Commit message 遵循约定式提交规范

## 📄 许可

MIT © [Bin Ma](https://github.com/bin-9-byte)

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
