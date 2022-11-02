export function getEnvVar<ReturnType = string, KeyType extends string = string>(
  key: KeyType
): ReturnType {
  const val = process.env[key];
  if (!val) {
    throw new Error(
      `Requested env var not defined. Please provide a ${key} in the process environment`
    );
  }
  return val as ReturnType;
}
