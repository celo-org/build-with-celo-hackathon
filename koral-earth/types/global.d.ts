declare type EnvVar = {
  ACCOUNT_PATH: string;
  CELOSCAN_API_KEY: string;
  ETHERNAL_USERNAME: string;
  ETHERNAL_PASSWORD: string;
  MNEMONIC: string;
};

declare type EnvVarName = keyof EnvVar;