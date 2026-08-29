/* Vercel storage integrations can inject their variables under a custom
   prefix (for example neonjaniodb_DATABASE_URL). Resolve the exact name
   first, then any prefixed variant, so the app works either way. Plain
   module on purpose: the scripts in scripts/ import it too. */

/* `vercel env pull` writes this placeholder for Sensitive variables. */
const usable = (value) => Boolean(value) && value !== '[SENSITIVE]';

export function findEnv(name) {
  if (usable(process.env[name])) return process.env[name];
  const suffix = `_${name}`;
  const key = Object.keys(process.env).find(
    (candidate) => candidate.endsWith(suffix) && usable(process.env[candidate])
  );
  return key ? process.env[key] : undefined;
}

export function databaseUrl() {
  return findEnv('DATABASE_URL') ?? findEnv('POSTGRES_URL');
}
