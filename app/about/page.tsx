import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "About CryptoLeek Blog"
};

export default function AboutPage() {
  return <AboutContent />;
}
