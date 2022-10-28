export enum Registry {
  VCS = 'VCS',
}

export type Project = {
  id: string;
  owner: User;
  timestamp: string;
  tx: string;
  projectId: string;
  vintages?: ProjectVintage[] | null;
  standard: Registry;
  methodology?: string | null;
  region?: string | null;
  storageMethod?: string | null;
  method?: string | null;
  emissionType?: string | null;
  category?: string | null;
  uri?: string | null;
};

export type ProjectVintage = {
  id: string;
  owner: User;
  timestamp: string;
  tx: string;
  name: string;
  startTime: string;
  endTime: string;
  project: Project;
  totalVintageQuantity: string;
  isCorsiaCompliant: boolean;
  isCCPcompliant: boolean;
  coBenefits: string;
  correspAdjustment: string;
  additionalCertification: string;
  tco2Token: TCO2Token;
};

export type TCO2Token = {
  id: string;
  creator: User;
  createdAt: string;
  creationTx: string;
  projectVintage: ProjectVintage;
  name: string;
  symbol: string;
  address: string;
};

export type User = {
  id: string;
};
