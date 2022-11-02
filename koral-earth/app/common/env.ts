export function getEnvVar<ReturnType = string, KeyType extends string = string>(
  key: KeyType
): ReturnType {
  console.log('process.env', process.env);
  const val = process.env[key];
  if (!val) {
    throw new Error(
      `Requested env var not defined. Please provide a ${key} in the process environment`
    );
  }
  return val as ReturnType;
}
