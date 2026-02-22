export type Language = "zh" | "en";

export const LANGUAGE_STORAGE_KEY = "cryptoleek-language";

export const translations = {
  zh: {
    nav: {
      blog: "博客",
      tags: "标签",
      about: "关于",
    },
    home: {
      badge: "洞察",
      title: "面向实干者的加密、AI 与技术分析。",
      description: "CryptoLeek 团队提供实用研究与行动手册。每篇文章都为快速加载、结构化搜索可见性与清晰决策而优化。",
    },
    aboutPage: {
      title: "关于 CryptoLeek Blog",
      description1: "CryptoLeek Blog 发布聚焦加密、AI 与软件交叉领域的实用深度内容。",
      description2: "我们的编辑方法重视清晰框架、可复现方法与可执行策略，服务于构建者、投资者与增长团队。",
    },
    tagsPage: {
      title: "标签",
    },
    post: {
      minRead: "分钟阅读",
      relatedPosts: "相关文章",
      onThisPage: "本页目录",
    },
    support: {
      title: "☕ 支持我",
      subtitle: "如果我的内容对你有帮助",
      buyMeACoffee: {
        title: "☕ Buy Me a Coffee",
        description: "请我喝杯咖啡，支持我持续创作。",
        button: "立即支持",
      },
      wechat: {
        title: "💬 微信赞赏",
        description: "微信扫码赞赏",
        qrAlt: "微信赞赏二维码",
        scanText: "打开微信扫一扫",
      },
      sol: {
        title: "◎ Solana",
        description: "链上转账打赏",
        qrAlt: "SOL 打赏二维码",
        copy: "📋 复制地址",
        copied: "✅ 已复制！",
      },
    },
    footer: {
      copyright: "© 2025-2026 CryptoLeek. 保留所有权利。",
    },
    theme: {
      toLight: "切换到浅色模式",
      toDark: "切换到深色模式",
    },
    language: {
      label: "切换语言",
      zh: "中",
      en: "EN",
      switchToZh: "切换到中文",
      switchToEn: "Switch to English",
    },
  },
  en: {
    nav: {
      blog: "Blog",
      tags: "Tags",
      about: "About",
    },
    home: {
      badge: "Insights",
      title: "Crypto, AI, and technology analysis built for operators.",
      description:
        "Practical research and playbooks from the CryptoLeek team. Every post is optimized for fast loading, structured search visibility, and clear decision-making.",
    },
    aboutPage: {
      title: "About CryptoLeek Blog",
      description1:
        "CryptoLeek Blog publishes practical, deeply researched content at the intersection of crypto, AI, and software.",
      description2:
        "Our editorial approach prioritizes clear frameworks, replicable methods, and actionable tactics for builders, investors, and growth teams.",
    },
    tagsPage: {
      title: "Tags",
    },
    post: {
      minRead: "min read",
      relatedPosts: "Related Posts",
      onThisPage: "On This Page",
    },
    support: {
      title: "☕ Support Me",
      subtitle: "If my content helps you",
      buyMeACoffee: {
        title: "☕ Buy Me a Coffee",
        description: "Fuel more content with a quick coffee tip.",
        button: "Support on Buy Me a Coffee",
      },
      wechat: {
        title: "💬 WeChat Pay",
        description: "Scan to tip via WeChat",
        qrAlt: "WeChat tip QR code",
        scanText: "Open WeChat and scan",
      },
      sol: {
        title: "◎ Solana",
        description: "Tip on Solana blockchain",
        qrAlt: "SOL tip QR code",
        copy: "📋 Copy Address",
        copied: "✅ Copied!",
      },
    },
    footer: {
      copyright: "© 2025-2026 CryptoLeek. All rights reserved.",
    },
    theme: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    language: {
      label: "Switch language",
      zh: "中",
      en: "EN",
      switchToZh: "切换到中文",
      switchToEn: "Switch to English",
    },
  },
} as const;

export type TranslationKey = typeof translations;

export function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") {
    return "zh";
  }

  const languages = [navigator.language, ...(navigator.languages ?? [])].filter(Boolean);
  const hasEnglish = languages.some((lang) => lang.toLowerCase().startsWith("en"));

  return hasEnglish ? "en" : "zh";
}
