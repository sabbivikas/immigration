import immigrantPresence from "@/data/immigrant-presence/state-metrics.placeholder.v1.json";
import economicContribution from "@/data/economic-contribution/state-metrics.placeholder.v1.json";
import inflowOutflow from "@/data/inflow-outflow/inflow-outflow.placeholder.v1.json";
import sourcesRegistry from "@/data/sources/sources.placeholder.v1.json";

export type Confidence = "low" | "medium" | "high" | null;

export type StateRef = {
  code: string; // USPS (e.g. CA)
  name: string;
  fips: string; // two-digit state FIPS string (e.g. "06")
};

export type MetricRecord = {
  state: StateRef;
  metricName: string;
  value: number | null;
  unit: string;
  dataYear: number | null;
  sourceName: string;
  sourceUrl: string;
  lastFetched: string | null; // YYYY-MM-DD
  confidence: Confidence;
  notes: string | null;
};

export type PlaceholderDataset = {
  schemaVersion: string;
  generatedAt: string | null; // ISO-8601
  notes?: string;
  metrics?: MetricRecord[];
  series?: MetricRecord[];
  sources?: Array<{
    sourceName: string;
    sourceUrl: string;
    lastFetched: string | null;
    confidence: Confidence;
    notes: string | null;
  }>;
};

export function getImmigrantPresencePlaceholder(): PlaceholderDataset {
  return immigrantPresence as unknown as PlaceholderDataset;
}

export function getEconomicContributionPlaceholder(): PlaceholderDataset {
  return economicContribution as unknown as PlaceholderDataset;
}

export function getInflowOutflowPlaceholder(): PlaceholderDataset {
  return inflowOutflow as unknown as PlaceholderDataset;
}

export function getSourcesPlaceholder(): PlaceholderDataset {
  return sourcesRegistry as unknown as PlaceholderDataset;
}

export function findStateMetrics(
  dataset: PlaceholderDataset,
  stateCode: string
): MetricRecord[] {
  const list = dataset.metrics ?? dataset.series ?? [];
  return list.filter((m) => m.state.code === stateCode.toUpperCase());
}

