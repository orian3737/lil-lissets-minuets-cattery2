import { getChatGPTUser } from "../chatgpt-auth";
import { isOwner } from "../owner";

export async function requireApiUser() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "Sign in is required." }, { status: 401 });
  }
  if (!isOwner(user)) {
    return Response.json(
      { error: "This action is limited to the site owner." },
      { status: 403 },
    );
  }
  return null;
}
