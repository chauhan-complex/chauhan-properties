/**
 * Health check for local/preview servers. This folder is deleted by the GitHub
 * Pages workflow (`rm -rf src/app/api`) because Pages has no server — it exists
 * only so a Node preview of the same code can be smoke-tested.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json({ ok: true, site: "chauhan-properties", mode: "static" });
}
