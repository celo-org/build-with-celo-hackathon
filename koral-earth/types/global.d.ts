declare type DeploymentEnvVar = {
  ACCOUNT_PATH: string;
  CELOSCAN_API_KEY: string;
  ETHERNAL_USERNAME: string;
  ETHERNAL_PASSWORD: string;
  MNEMONIC: string;
  DEPLOYMENT_NETWORK: string;
};

declare type DeploymentEnvVarKey = keyof DeploymentEnvVar;
