import { OWNER_EMAILS } from "../../owner";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as {
    email?: string;
    accessCode?: string;
  } | null;

  const email = payload?.email?.trim().toLowerCase() ?? "";
  const accessCode = payload?.accessCode?.trim() ?? "";
  const expectedCode = process.env.OWNER_ACCESS_CODE?.trim();

  if (!expectedCode) {
    return Response.json(
      { error: "Owner access code is not configured." },
      { status: 500 },
    );
  }

  if (!OWNER_EMAILS.includes(email) || accessCode !== expectedCode) {
    return Response.json({ error: "Owner access was not approved." }, { status: 401 });
  }

  return Response.json({ ok: true, email });
}
