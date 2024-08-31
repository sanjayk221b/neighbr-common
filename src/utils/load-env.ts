export function loadEnv(requiredVars: string[]): Record<string, string> {
  const missingVars = requiredVars.filter((variable) => !process.env[variable]);

  if (missingVars.length) {
    throw new Error(`Missing environment variables: ${missingVars.join(", ")}`);
  }

  return requiredVars.reduce<Record<string, string>>((acc, variable) => {
    acc[variable] = process.env[variable]!;
    return acc;
  }, {});
}
