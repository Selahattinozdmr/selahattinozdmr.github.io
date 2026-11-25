import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Selahattin Özdemir",
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <meta httpEquiv="refresh" content="0; url=/tr/" />
      <p className="text-muted">
        <Link href="/tr/" className="text-cyan underline">
          Devam et / Continue
        </Link>
      </p>
    </main>
  );
}
