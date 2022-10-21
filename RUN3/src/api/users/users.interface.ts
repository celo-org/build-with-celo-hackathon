export interface User {
  id?: string;
  email: string;
  name: string;
  publicaddress: string;
  steps?: Step[];
}

export interface Step {
  date: string;
  quantity: number;
}
