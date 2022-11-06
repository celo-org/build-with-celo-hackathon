interface Config {
  debug: boolean;
  version: string | null;
  CONTRACT_ADDRESS: string | null;
}

const isDevMode = process?.env?.NODE_ENV === "development";
const version = process?.env?.NEXT_PUBLIC_VERSION ?? null;

export const config: Config = Object.freeze({
  debug: isDevMode,
  version,
  CONTRACT_ADDRESS: "0xDcc7c6Ae8457539912cb799975D9E07285295840",
});
