declare type EnvVar = {
  ACCOUNT_PATH: string;
  CELOSCAN_API_KEY: string;
  MNEMONIC: string;
};

declare type EnvVarName = keyof EnvVar;