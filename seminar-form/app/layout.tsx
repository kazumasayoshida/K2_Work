import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "体軸体験セミナー｜お申込みフォーム",
  description:
    "子どもの可能性を広げる「体軸」を親子で体験！姿勢・集中力・運動能力が変わる90分セミナーへのお申込みはこちらから。",
  openGraph: {
    title: "体軸体験セミナー｜お申込みフォーム",
    description: "子どもの可能性を広げる「体軸」を親子で体験しませんか？",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
