export type Project = {
  creator?: User | null;
  owner?: User | null;
  timestamp?: number | null;
  tx?: string | null;
  projectId: string | null;
  vintages?: ProjectVintage[] | null;
  standard?: string | null;
  methodology?: string | null;
  region?: string | null;
  storageMethod?: string | null;
  method?: string | null;
  emissionType?: string | null;
  category?: string | null;
  uri?: string | null;
};

export type ProjectVintage = {
  id: string | null;
  creator?: User | null;
  owner?: User | null;
  timestamp?: number | null;
  tx?: string | null;
  name?: string | null;
  startTime?: number | null;
  endTime?: number | null;
  project?: Project | null;
  totalVintageQuantity?: number | null;
  isCorsiaCompliant?: boolean | null;
  isCCPcompliant?: boolean | null;
  additionalCertification?: string | null;
  tco2Token?: TCO2Token | null;
};

export type TCO2Token = {
  id: string | null;
  creator?: User | null;
  createdAt?: number | null;
  creationTx?: string | null;
  projectVintage?: ProjectVintage | null;
  name?: string | null;
  symbol?: string | null;
  address?: string | null;
  meta?: TCO2TokenMeta | null;
};

export type TCO2TokenMeta = {
  id: string | null;
  token?: TCO2Token | null;
  totalBridged?: number | null;
  totalRetired?: number | null;
  currentSupply?: number | null;
  balanceBCT?: number | null;
  balanceNCT?: number | null;
  klimaRanking?: number | null;
  lastUpdate?: number | null;
} | null;

export type User = {
  id: string | null;
};
