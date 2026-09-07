import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · migration visualization (fork)",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-8 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors mb-16"
        >
          ← Back
        </Link>

        <div className="text-[13px] font-medium text-muted tracking-tight mb-3">
          Contact
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-ink tracking-tight leading-[1.05] mb-10">
          Get in touch
        </h1>

        <div className="text-base text-ink/80 leading-relaxed space-y-5">
          <p>
            If a number is wrong, a source is outdated, or something feels
            misleading, please tell me. Corrections make the site more
            accurate and I want them.
          </p>
          <p>
            Tips on data sources I should be incorporating are also welcome,
            especially state-level settlement data, economic studies, or
            anything not covered by the federal datasets. For questions about
            the original project&rsquo;s data pipeline, start with{" "}
            <a
              href="https://trackmigrations.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
            >
              trackmigrations.org
            </a>
            .
          </p>
        </div>

        <div className="mt-12 pt-10 border-t border-black/[.06] space-y-5">
          <div>
            <div className="text-[11px] font-medium tracking-tight text-muted mb-1.5">
              GitHub
            </div>
            <a
              href="https://github.com/sabbivikas/immigration"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-ink underline underline-offset-2 hover:text-muted transition-colors"
            >
              github.com/sabbivikas/immigration
            </a>
            <span className="text-sm text-muted ml-2">
              Open an issue for data corrections.
            </span>
          </div>

          <div>
            <div className="text-[11px] font-medium tracking-tight text-muted mb-1.5">
              Twitter / X
            </div>
            <a
              href="https://x.com/vikassabbi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-ink underline underline-offset-2 hover:text-muted transition-colors"
            >
              @vikassabbi
            </a>
          </div>

          <div>
            <div className="text-[11px] font-medium tracking-tight text-muted mb-1.5">
              Site
            </div>
            <a
              href="https://vikassabbi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-ink underline underline-offset-2 hover:text-muted transition-colors"
            >
              vikassabbi.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
