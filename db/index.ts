export function getDb(): never {
  throw new Error(
    "Server database storage is not configured for this Netlify deployment.",
  );
}
