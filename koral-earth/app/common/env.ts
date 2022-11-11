export function getEnvVar<ReturnType = string, KeyType extends string = string>(
  key: KeyType
): ReturnType {
  return process.env[key] as ReturnType;
}
