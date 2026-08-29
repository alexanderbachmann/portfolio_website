import 'server-only';
import { neon } from '@neondatabase/serverless';
import { databaseUrl } from '@/lib/env';

let client;

/**
 * Lazily creates the Neon HTTP client so importing this module never
 * throws in a build step that does not touch the database.
 */
export function getSql() {
  if (!client) {
    const url = databaseUrl();
    if (!url) {
      throw new Error(
        'DATABASE_URL is not configured. Run: vercel env pull .env.local'
      );
    }
    client = neon(url);
  }
  return client;
}
