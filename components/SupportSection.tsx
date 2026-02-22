"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const SOL_ADDRESS = "DWUEBrE4PTkCFGz9SguiYBasi1KQbjxp85KCdq6uw1oh";

type ModalType = "bmc" | "wechat" | "sol" | null;
type SupportMethod = Exclude<ModalType, null>;

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm animate-in zoom-in-95 fade-in rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-white/10 dark:hover:text-zinc-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default function SupportSection() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [copied, setCopied] = useState(false);
  const close = useCallback(() => setActiveModal(null), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SOL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const cards: { id: SupportMethod; icon: string; bg: string; border: string; hover: string }[] = [
    {
      id: "bmc",
      icon: "☕",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/20",
      hover: "hover:border-amber-400 dark:hover:border-amber-500/40 hover:shadow-amber-100/50 dark:hover:shadow-amber-500/5",
    },
    {
      id: "wechat",
      icon: "💬",
      bg: "bg-green-50 dark:bg-green-500/10",
      border: "border-green-200 dark:border-green-500/20",
      hover: "hover:border-green-400 dark:hover:border-green-500/40 hover:shadow-green-100/50 dark:hover:shadow-green-500/5",
    },
    {
      id: "sol",
      icon: "◎",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/20",
      hover: "hover:border-purple-400 dark:hover:border-purple-500/40 hover:shadow-purple-100/50 dark:hover:shadow-purple-500/5",
    },
  ];

  const cardInfo = {
    bmc: { title: t.support.buyMeACoffee.title, desc: t.support.buyMeACoffee.description },
    wechat: { title: t.support.wechat.title, desc: t.support.wechat.description },
    sol: { title: t.support.sol.title, desc: t.support.sol.description },
  };

  return (
    <section id="support" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-100">
          {t.support.title}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{t.support.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setActiveModal(card.id)}
            className={`group relative cursor-pointer flex flex-col items-center gap-3 rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md ${card.bg} ${card.border} ${card.hover}`}
          >
            <span className="text-4xl">{card.icon}</span>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {cardInfo[card.id].title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {cardInfo[card.id].desc}
            </p>
          </button>
        ))}
      </div>

      <Modal open={activeModal === "bmc"} onClose={close}>
        <div className="flex flex-col items-center gap-4 pt-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {t.support.buyMeACoffee.title}
          </h3>
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
            <Image src="/bmc-tip.jpg" alt="Buy Me a Coffee QR" width={280} height={280} className="h-auto w-full" />
          </div>
          <a
            href="https://buymeacoffee.com/cryptoleek"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-[#FFDD00] px-4 py-3 text-center text-sm font-bold text-zinc-900 transition hover:bg-[#FFE94D]"
          >
            ☕ {t.support.buyMeACoffee.button}
          </a>
        </div>
      </Modal>

      <Modal open={activeModal === "wechat"} onClose={close}>
        <div className="flex flex-col items-center gap-4 pt-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {t.support.wechat.title}
          </h3>
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
            <Image src="/wechat-tip.png" alt={t.support.wechat.qrAlt} width={280} height={280} className="h-auto w-full" />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.support.wechat.scanText}
          </p>
        </div>
      </Modal>

      <Modal open={activeModal === "sol"} onClose={close}>
        <div className="flex flex-col items-center gap-4 pt-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {t.support.sol.title}
          </h3>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 dark:border-white/10 dark:bg-white">
            <Image src="/sol-tip.png" alt={t.support.sol.qrAlt} width={250} height={250} className="h-auto w-full" />
          </div>
          <div className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
            <p className="break-all text-center font-mono text-xs text-zinc-600 dark:text-zinc-300">
              {SOL_ADDRESS}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:from-purple-500 hover:to-indigo-500"
          >
            {copied ? t.support.sol.copied : t.support.sol.copy}
          </button>
        </div>
      </Modal>
    </section>
  );
}
