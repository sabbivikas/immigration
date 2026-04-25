"use client";

import { useMemo, useState } from "react";
import FadeInOnView from "@/components/ui/FadeInOnView";
import {
  getEconomicContributionPlaceholder,
  getImmigrantPresencePlaceholder,
  findStateMetrics,
  type MetricRecord,
} from "@/lib/new-data";

const SETTLEMENT_METRICS: readonly string[] = [
  "foreignBornPopulation",
  "nonCitizenPopulation",
  "immigrantWorkers",
] as const;

const CONTRIBUTION_METRICS: readonly string[] = [
  "taxesPaid",
  "spendingPower",
  "entrepreneurs",
] as const;

const METRIC_LABELS: Record<string, string> = {
  foreignBornPopulation: "Foreign-born population",
  nonCitizenPopulation: "Non-citizen population",
  immigrantWorkers: "Immigrant workers",
  taxesPaid: "Taxes paid",
  spendingPower: "Spending power",
  entrepreneurs: "Entrepreneurs",
};

function getMetric(
  list: MetricRecord[],
  name: string
): MetricRecord | undefined {
  return list.find((m) => m.metricName === name);
}

function formatMetricValue(m: MetricRecord): {
  display: string;
  isNull: boolean;
  showUnit: boolean;
} {
  if (m.value === null) {
    return { display: "Not available yet", isNull: true, showUnit: false };
  }
  const u = m.unit.toLowerCase();
  if (u === "usd") {
    return {
      display: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(m.value),
      isNull: false,
      showUnit: true,
    };
  }
  if (u === "people") {
    return {
      display: m.value.toLocaleString("en-US"),
      isNull: false,
      showUnit: true,
    };
  }
  return {
    display: m.value.toLocaleString("en-US"),
    isNull: false,
    showUnit: true,
  };
}

function uniqueStatesFromDatasets(
  presence: ReturnType<typeof getImmigrantPresencePlaceholder>,
  economic: ReturnType<typeof getEconomicContributionPlaceholder>
) {
  const m = new Map<string, { code: string; name: string; fips: string }>();
  for (const row of presence.metrics ?? []) {
    m.set(row.state.code, row.state);
  }
  for (const row of economic.metrics ?? []) {
    m.set(row.state.code, row.state);
  }
  return Array.from(m.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "en")
  );
}

export default function SettlementContribution() {
  const presence = useMemo(() => getImmigrantPresencePlaceholder(), []);
  const economic = useMemo(() => getEconomicContributionPlaceholder(), []);

  const stateOptions = useMemo(
    () => uniqueStatesFromDatasets(presence, economic),
    [presence, economic]
  );

  const defaultState = useMemo(() => {
    if (stateOptions.length === 0) return "";
    if (stateOptions.some((s) => s.code === "CA")) return "CA";
    return stateOptions[0].code;
  }, [stateOptions]);

  const [stateCode, setStateCode] = useState(defaultState);
  const [tab, setTab] = useState<"settlement" | "contribution">("settlement");

  const effectiveStateCode =
    stateCode || stateOptions[0]?.code || "";

  const presenceForState = useMemo(
    () =>
      effectiveStateCode
        ? findStateMetrics(presence, effectiveStateCode)
        : [],
    [presence, effectiveStateCode]
  );
  const economicForState = useMemo(
    () =>
      effectiveStateCode
        ? findStateMetrics(economic, effectiveStateCode)
        : [],
    [economic, effectiveStateCode]
  );

  const currentMetrics = tab === "settlement" ? SETTLEMENT_METRICS : CONTRIBUTION_METRICS;
  const listForTab = tab === "settlement" ? presenceForState : economicForState;

  const firstCard = useMemo(() => {
    const name = currentMetrics[0];
    if (!name) return undefined;
    return getMetric(listForTab, name);
  }, [currentMetrics, listForTab]);

  const footDataYear = firstCard?.dataYear != null ? String(firstCard.dataYear) : "pending";
  const footLastFetched = firstCard?.lastFetched != null
    ? firstCard.lastFetched
    : "not fetched yet";
  const footSourceName = firstCard?.sourceName?.trim() || "source pending";
  const footSourceUrl = firstCard?.sourceUrl?.trim();

  if (stateOptions.length === 0) {
    return (
      <section
        id="settlement"
        className="relative z-10 border-t border-black/[.06] bg-white"
      >
        <div className="max-w-5xl mx-auto px-8 pt-20 pb-24">
          <h2 className="text-2xl font-semibold text-ink">
            Settlement &amp; contribution
          </h2>
          <p className="text-sm text-muted mt-4">
            No state rows in the placeholder dataset yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="settlement"
      className="relative z-10 border-t border-black/[.06] bg-white"
    >
      <div className="max-w-5xl mx-auto px-8 pt-20 pb-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-[1.1] mb-4">
          Settlement &amp; contribution
        </h2>
        <p className="text-sm text-muted leading-relaxed max-w-2xl mb-10">
          Settlement comes from Census ACS (lagged). Contribution metrics come
          from published state profiles. Each figure shows its data year.
        </p>

        <FadeInOnView>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="w-full sm:max-w-xs">
              <label
                htmlFor="settlement-state"
                className="block text-[11px] font-medium text-muted tracking-tight mb-1.5"
              >
                State
              </label>
              <select
                id="settlement-state"
                value={effectiveStateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full text-sm text-ink bg-white border border-black/[.1] rounded-lg px-3 py-2.5"
              >
                {stateOptions.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
            <div
              className="flex bg-black/[.04] rounded-full p-0.5 self-start"
              role="tablist"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "settlement"}
                onClick={() => setTab("settlement")}
                className={`text-[11px] font-medium px-4 py-1.5 rounded-full transition-colors ${
                  tab === "settlement"
                    ? "bg-white text-ink shadow-sm"
                    : "text-muted"
                }`}
              >
                Settlement
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "contribution"}
                onClick={() => setTab("contribution")}
                className={`text-[11px] font-medium px-4 py-1.5 rounded-full transition-colors ${
                  tab === "contribution"
                    ? "bg-white text-ink shadow-sm"
                    : "text-muted"
                }`}
              >
                Contribution
              </button>
            </div>
          </div>
        </FadeInOnView>

        <div
          className={
            tab === "settlement"
              ? "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              : "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          }
        >
          {currentMetrics.map((metricName) => {
            const m = getMetric(listForTab, metricName);
            if (!m) {
              return (
                <div
                  key={metricName}
                  className={`rounded-xl border p-5 ${
                    tab === "settlement"
                      ? "border-black/[.06] bg-bg/80"
                      : "border-black/[.1] bg-white shadow-sm"
                  }`}
                >
                  <h3 className="text-sm font-semibold text-ink tracking-tight">
                    {METRIC_LABELS[metricName] ?? metricName}
                  </h3>
                  <p className="mt-3 text-sm text-muted italic">Not available yet</p>
                  <dl className="mt-4 space-y-1.5 text-[11px] text-muted leading-relaxed">
                    <div>
                      <dt className="inline text-muted/80">Source: </dt>
                      <dd className="inline">source pending</dd>
                    </div>
                    <div>
                      <dt className="inline text-muted/80">Data year: </dt>
                      <dd className="inline">pending</dd>
                    </div>
                    <div>
                      <dt className="inline text-muted/80">Last fetched: </dt>
                      <dd className="inline">not fetched yet</dd>
                    </div>
                  </dl>
                </div>
              );
            }
            const fmt = formatMetricValue(m);
            return (
              <div
                key={metricName}
                className={`rounded-xl border p-5 ${
                  tab === "settlement"
                    ? "border-black/[.06] bg-bg/80"
                    : "border-black/[.1] bg-white shadow-sm"
                }`}
              >
                <h3 className="text-sm font-semibold text-ink tracking-tight">
                  {METRIC_LABELS[metricName] ?? metricName}
                </h3>
                <p
                  className={`mt-3 ${
                    fmt.isNull
                      ? "text-sm text-muted italic"
                      : "text-2xl font-semibold text-ink tabular-nums"
                  }`}
                >
                  {fmt.display}
                </p>
                {fmt.showUnit && !fmt.isNull && (
                  <p className="text-[11px] text-muted mt-0.5">{m.unit}</p>
                )}
                <dl className="mt-4 space-y-1.5 text-[11px] text-muted leading-relaxed">
                  <div>
                    <dt className="inline text-muted/80">Source: </dt>
                    <dd className="inline">
                      {m.sourceUrl ? (
                        <a
                          href={m.sourceUrl}
                          className="text-ink underline underline-offset-2 hover:text-muted"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {m.sourceName}
                        </a>
                      ) : (
                        m.sourceName
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-muted/80">Data year: </dt>
                    <dd className="inline">
                      {m.dataYear != null ? m.dataYear : "pending"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-muted/80">Last fetched: </dt>
                    <dd className="inline">
                      {m.lastFetched ?? "not fetched yet"}
                    </dd>
                  </div>
                  {m.confidence != null && (
                    <div>
                      <dt className="inline text-muted/80">Confidence: </dt>
                      <dd className="inline">{m.confidence}</dd>
                    </div>
                  )}
                  {m.notes && (
                    <p className="pt-1 text-[11px] text-muted/90">{m.notes}</p>
                  )}
                </dl>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-black/[.08] bg-bg/60 px-4 py-3 text-[11px] text-muted leading-relaxed">
          <span className="text-muted/90">Data year: </span>
          <span className="text-ink/90">{footDataYear}</span>
          <span className="mx-2 text-ink/25">·</span>
          <span className="text-muted/90">Last fetched: </span>
          <span className="text-ink/90">{footLastFetched}</span>
          <span className="mx-2 text-ink/25">·</span>
          <span className="text-muted/90">Source: </span>
          {footSourceUrl ? (
            <a
              href={footSourceUrl}
              className="text-ink underline underline-offset-2 hover:text-muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              {footSourceName}
            </a>
          ) : (
            <span className="text-ink/90">{footSourceName}</span>
          )}
        </div>
      </div>
    </section>
  );
}
