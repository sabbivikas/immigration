"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import { useScrollProgress } from "@/lib/use-scroll-progress";

const DataMap = dynamic(() => import("@/components/map/DataMap"), {
  ssr: false,
});
const WhereTheyCrossed = dynamic(
  () => import("@/components/sections/WhereTheyCrossed")
);
const WhereTheyCameFrom = dynamic(
  () => import("@/components/sections/WhereTheyCameFrom")
);
const WhyTheyCame = dynamic(
  () => import("@/components/sections/WhyTheyCame")
);
const WhatHappenedNext = dynamic(
  () => import("@/components/sections/WhatHappenedNext")
);
const WhatTheyBuilt = dynamic(
  () => import("@/components/sections/WhatTheyBuilt")
);
const ByTheNumbers = dynamic(
  () => import("@/components/sections/ByTheNumbers")
);
const HistoricalContext = dynamic(
  () => import("@/components/sections/HistoricalContext")
);
const AboutData = dynamic(
  () => import("@/components/sections/AboutData")
);

export default function PageClient() {
  const progress = useScrollProgress();

  return (
    <>
      <DataMap revealProgress={progress} />
      <Hero progress={progress} />
      <div className="h-[400vh]" aria-hidden />

      <WhereTheyCrossed />
      <WhereTheyCameFrom />
      <WhyTheyCame />
      <WhatHappenedNext />
      <WhatTheyBuilt />
      <ByTheNumbers />
      <HistoricalContext />
      <AboutData />

      <footer className="relative z-10 bg-bg border-t border-black/[.06]">
        <div className="max-w-5xl mx-auto px-8 py-10 flex flex-col gap-5 text-xs text-muted">
          <div className="flex flex-wrap items-center justify-between gap-4 gap-y-3">
            <span className="font-medium text-ink tracking-tight">
              Migration visualization (fork)
            </span>
            <div className="flex flex-wrap gap-6">
              <Link href="/about" className="hover:text-ink transition-colors">
                About
              </Link>
              <Link href="/methodology" className="hover:text-ink transition-colors">
                Methodology
              </Link>
              <Link href="/contact" className="hover:text-ink transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <p className="max-w-3xl leading-relaxed text-muted">
            Built on a fork of{" "}
            <a
              href="https://trackmigrations.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-muted/40 decoration-[0.5px] underline-offset-4 hover:decoration-ink transition-colors"
            >
              Track Migrations
            </a>{" "}
            by Isabelle. Modified and expanded by Vikas Sabbi. Original
            creator:{" "}
            <a
              href="https://x.com/isareksopuro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-muted/40 decoration-[0.5px] underline-offset-4 hover:decoration-ink transition-colors"
            >
              @isareksopuro
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
