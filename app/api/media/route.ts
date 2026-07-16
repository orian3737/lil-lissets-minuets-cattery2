import { requireApiUser } from "../auth";
import { getMediaBucket, jsonError } from "../db";

export async function GET(request: Request) {
  try {
    const key = new URL(request.url).searchParams.get("key");
    if (!key) return jsonError("Media key is required.", 400);
    const object = await getMediaBucket().get(key);
    if (!object) return jsonError("Media not found.", 404);
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    return new Response(object.body, { headers });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireApiUser();
    if (authError) return authError;
    const data = await request.formData();
    const file = data.get("file");
    if (!(file instanceof File)) return jsonError("Photo file is required.", 400);
    if (!file.type.startsWith("image/")) return jsonError("Only image uploads are supported.", 400);

    const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
    const key = `kittens/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    await getMediaBucket().put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });
    return Response.json({ key, url: `/api/media?key=${encodeURIComponent(key)}` }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
