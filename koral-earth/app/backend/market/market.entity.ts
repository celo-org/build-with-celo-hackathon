export enum Registry {
  VCS = 'VCS',
}

export type Project = {
  id: string;
  owner: User;
  timestamp: number;
  tx: string;
  projectId: string;
  vintages?: ProjectVintage[];
  standard: Registry;
  methodology?: string;
  region?: string;
  storageMethod?: string;
  method?: string;
  emissionType?: string;
  category?: string;
  uri?: string;
};

export type ProjectVintage = {
  id: string;
  owner: User;
  timestamp: number;
  tx: string;
  name: string;
  startTime: number;
  endTime: number;
  project: Project;
  totalVintageQuantity: number;
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
  createdAt: number;
  creationTx: string;
  projectVintage: ProjectVintage;
  name: string;
  symbol: string;
  address: string;
};

export type User = {
  id: string;
};
