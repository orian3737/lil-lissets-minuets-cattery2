import { starterKittens, type Kitten } from "../../data";
import { requireApiUser } from "../auth";
import { ensureTables, getD1, jsonError, type DbKittenRow } from "../db";

const allowedStatuses = new Set(["available", "reserved", "sold", "hidden"]);

function fromRow(row: DbKittenRow): Kitten {
  return {
    id: row.id,
    name: row.name,
    sex: row.sex,
    born: row.born,
    standard: row.standard,
    tica: row.tica,
    showQuality: row.show_quality,
    availability: row.availability,
    mother: row.mother,
    breed: row.breed,
    price: row.price,
    status: allowedStatuses.has(row.status)
      ? (row.status as Kitten["status"])
      : "available",
    imageUrl: row.image_url,
    notes: row.notes,
  };
}

function normalize(payload: Partial<Kitten>): Kitten {
  return {
    id: payload.id,
    name: payload.name?.trim() ?? "",
    sex: payload.sex?.trim() ?? "",
    born: payload.born?.trim() ?? "",
    standard: payload.standard?.trim() ?? "",
    tica: payload.tica?.trim() || "Registered",
    showQuality: payload.showQuality?.trim() ?? "",
    availability: payload.availability?.trim() ?? "",
    mother: payload.mother?.trim() ?? "",
    breed: payload.breed?.trim() || "Minuet",
    price: payload.price?.trim() ?? "",
    status: allowedStatuses.has(payload.status ?? "")
      ? (payload.status as Kitten["status"])
      : "available",
    imageUrl: payload.imageUrl?.trim() || "/hero-cattery.png",
    notes: payload.notes?.trim() ?? "",
  };
}

async function seedIfEmpty(db: D1Database) {
  const count = await db.prepare("SELECT COUNT(*) as count FROM kittens").first<{ count: number }>();
  if ((count?.count ?? 0) > 0) return;
  await db.batch(
    starterKittens.map((kitten) =>
      db
        .prepare(`INSERT INTO kittens
          (name, sex, born, standard, tica, show_quality, availability, mother, breed, price, status, image_url, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(
          kitten.name,
          kitten.sex,
          kitten.born,
          kitten.standard,
          kitten.tica,
          kitten.showQuality,
          kitten.availability,
          kitten.mother,
          kitten.breed,
          kitten.price,
          kitten.status,
          kitten.imageUrl,
          kitten.notes,
        ),
    ),
  );
}

export async function GET() {
  try {
    const db = getD1();
    await ensureTables(db);
    await seedIfEmpty(db);
    const { results } = await db
      .prepare("SELECT * FROM kittens ORDER BY status = 'available' DESC, id DESC")
      .all<DbKittenRow>();
    return Response.json({ kittens: results.map(fromRow) });
  } catch (error) {
    return Response.json({ kittens: starterKittens, warning: "Using starter kitten data." });
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireApiUser();
    if (authError) return authError;
    const db = getD1();
    await ensureTables(db);
    const kitten = normalize((await request.json()) as Partial<Kitten>);
    if (!kitten.name) return jsonError("Name is required.", 400);
    await db
      .prepare(`INSERT INTO kittens
        (name, sex, born, standard, tica, show_quality, availability, mother, breed, price, status, image_url, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        kitten.name,
        kitten.sex,
        kitten.born,
        kitten.standard,
        kitten.tica,
        kitten.showQuality,
        kitten.availability,
        kitten.mother,
        kitten.breed,
        kitten.price,
        kitten.status,
        kitten.imageUrl,
        kitten.notes,
      )
      .run();
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const authError = await requireApiUser();
    if (authError) return authError;
    const db = getD1();
    await ensureTables(db);
    const kitten = normalize((await request.json()) as Partial<Kitten>);
    if (!kitten.id) return jsonError("Kitten id is required.", 400);
    if (!kitten.name) return jsonError("Name is required.", 400);
    await db
      .prepare(`UPDATE kittens SET
        name = ?, sex = ?, born = ?, standard = ?, tica = ?, show_quality = ?,
        availability = ?, mother = ?, breed = ?, price = ?, status = ?,
        image_url = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`)
      .bind(
        kitten.name,
        kitten.sex,
        kitten.born,
        kitten.standard,
        kitten.tica,
        kitten.showQuality,
        kitten.availability,
        kitten.mother,
        kitten.breed,
        kitten.price,
        kitten.status,
        kitten.imageUrl,
        kitten.notes,
        kitten.id,
      )
      .run();
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const authError = await requireApiUser();
    if (authError) return authError;
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!id) return jsonError("Kitten id is required.", 400);
    const db = getD1();
    await ensureTables(db);
    await db.prepare("DELETE FROM kittens WHERE id = ?").bind(id).run();
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error);
  }
}
