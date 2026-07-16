"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { aiBlogPrompt, assets, BlogPost, Kitten } from "./data";
import { OWNER_ACCESS_CODE, OWNER_EMAIL, OWNER_EMAILS } from "./owner";

const OWNER_SESSION_KEY = "lil-lissets-owner-session";
const LOCAL_KITTENS_KEY = "lil-lissets-owner-kittens";
const LOCAL_POSTS_KEY = "lil-lissets-owner-posts";

type KittenBoardProps = {
  initialKittens: Kitten[];
};

export function KittenBoard({ initialKittens }: KittenBoardProps) {
  const [kittens, setKittens] = useState(initialKittens);
  const [filter, setFilter] = useState<"available" | "all">("all");

  useEffect(() => {
    let cancelled = false;
    const localKittens = readLocal<Kitten[]>(LOCAL_KITTENS_KEY);
    if (localKittens?.length) setKittens(localKittens);
    fetch("/api/kittens")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { kittens?: Kitten[] } | null) => {
        if (!cancelled && payload?.kittens?.length && !localKittens?.length) {
          setKittens(payload.kittens);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    const publicKittens = kittens.filter((kitten) => kitten.status !== "hidden");
    return filter === "available"
      ? publicKittens.filter((kitten) => kitten.status === "available")
      : publicKittens;
  }, [filter, kittens]);

  return (
    <section className="kitten-sales" aria-labelledby="kitten-sales-title">
      <div className="section-heading centered">
        <p className="eyebrow">Kittens for sale</p>
        <h2 id="kitten-sales-title">Available kittens and sold gallery</h2>
        <p>
          Each listing keeps the current site fields intact: sex, birth date,
          standard, TICA status, show quality, availability, mother, breed, and
          price.
        </p>
      </div>
      <div className="toolbar" aria-label="Kitten filters">
        <button
          className={filter === "available" ? "active" : ""}
          onClick={() => setFilter("available")}
          type="button"
        >
          Available
        </button>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
          type="button"
        >
          All listings
        </button>
      </div>
      <div className="kitten-grid">
        {visible.map((kitten) => (
          <article className="kitten-card" key={`${kitten.id}-${kitten.name}`}>
            <div className="kitten-photo">
              <img src={kitten.imageUrl || assets.placeholder} alt={kitten.name} />
              <span className={`status ${kitten.status}`}>{kitten.status}</span>
            </div>
            <div className="kitten-body">
              <h3>{kitten.name}</h3>
              <p>{kitten.notes}</p>
              <dl>
                <div><dt>Sex</dt><dd>{kitten.sex}</dd></div>
                <div><dt>Born</dt><dd>{kitten.born}</dd></div>
                <div><dt>Standard</dt><dd>{kitten.standard}</dd></div>
                <div><dt>TICA</dt><dd>{kitten.tica}</dd></div>
                <div><dt>Show Quality</dt><dd>{kitten.showQuality}</dd></div>
                <div><dt>Availability</dt><dd>{kitten.availability}</dd></div>
                <div><dt>Mother</dt><dd>{kitten.mother}</dd></div>
                <div><dt>Breed</dt><dd>{kitten.breed}</dd></div>
                <div><dt>Price</dt><dd>{kitten.price}</dd></div>
              </dl>
              <a className="text-link" href="/contact">
                Ask about {kitten.name}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type BlogPreviewProps = {
  initialPosts: BlogPost[];
};

export function BlogPreview({ initialPosts }: BlogPreviewProps) {
  const [posts, setPosts] = useState(initialPosts.filter((post) => post.status === "published"));

  useEffect(() => {
    let cancelled = false;
    const localPosts = readLocal<BlogPost[]>(LOCAL_POSTS_KEY)?.filter(
      (post) => post.status === "published",
    );
    if (localPosts?.length) setPosts(localPosts);
    fetch("/api/blog")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { posts?: BlogPost[] } | null) => {
        const published = payload?.posts?.filter((post) => post.status === "published");
        if (!cancelled && published?.length && !localPosts?.length) setPosts(published);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="blog-section" aria-labelledby="blog-preview-title">
      <div className="section-heading">
        <p className="eyebrow">Cattery journal</p>
        <h2 id="blog-preview-title">Helpful notes for Minuet families</h2>
        <p>
          Read kitten care tips, breed notes, cattery updates, and gentle
          guidance for families preparing to welcome a Minuet kitten.
        </p>
      </div>
      <div className="blog-list">
        {posts.map((post) => (
          <article className="blog-card" key={post.slug}>
            <p>{post.publishedAt || "Draft"}</p>
            <h3>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h3>
            <p>{post.excerpt}</p>
            <span>{post.keywords}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

type StudioProps = {
  userLabel: string;
};

export function OwnerStudioGate() {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [sessionEmail, setSessionEmail] = useState(OWNER_EMAIL);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem(OWNER_SESSION_KEY);
    if (storedEmail && OWNER_EMAILS.includes(storedEmail)) {
      setSessionEmail(storedEmail);
      setSignedIn(true);
    }
  }, []);

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!OWNER_EMAILS.includes(normalized)) {
      setMessage("Owner access is limited to approved cattery emails.");
      return;
    }
    if (accessCode.trim() !== OWNER_ACCESS_CODE) {
      setMessage("That access code does not match.");
      return;
    }
    localStorage.setItem(OWNER_SESSION_KEY, normalized);
    setSessionEmail(normalized);
    setSignedIn(true);
  }

  if (signedIn) return <OwnerStudio userLabel={sessionEmail} />;

  return (
    <main className="studio">
      <section className="studio-panel owner-login-panel">
        <p className="eyebrow">Owner login</p>
        <h1>Manage kittens and blog posts</h1>
        <p>
          Sign in with the owner email to unlock the local preview studio. This
          keeps kitten and blog edits in this browser until Supabase or Netlify
          storage is connected.
        </p>
        <form onSubmit={signIn}>
          <label>
            <span>Email</span>
            <input
              autoComplete="email"
              inputMode="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder={OWNER_EMAIL}
              type="email"
              value={email}
              required
            />
          </label>
          <label>
            <span>Access code</span>
            <input
              autoComplete="current-password"
              onChange={(event) => setAccessCode(event.target.value)}
              type="password"
              value={accessCode}
              required
            />
          </label>
          {message ? <p>{message}</p> : null}
          <div className="form-actions">
            <button className="button" type="submit">
              Enter studio
            </button>
            <a className="button light" href="/">
              View site
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

const emptyKitten: Kitten = {
  name: "",
  sex: "",
  born: "",
  standard: "",
  tica: "Registered",
  showQuality: "",
  availability: "",
  mother: "",
  breed: "Minuet",
  price: "",
  status: "available",
  imageUrl: assets.placeholder,
  notes: "",
};

const emptyPost: BlogPost = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  status: "draft",
  cadence: "monthly",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  publishedAt: "",
};

export function OwnerStudio({ userLabel }: StudioProps) {
  const [kittens, setKittens] = useState<Kitten[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [kittenForm, setKittenForm] = useState<Kitten>(emptyKitten);
  const [postForm, setPostForm] = useState<BlogPost>(emptyPost);
  const [message, setMessage] = useState("Loading your studio...");

  useEffect(() => {
    refreshAll();
  }, []);

  async function refreshAll() {
    const localKittens = readLocal<Kitten[]>(LOCAL_KITTENS_KEY);
    const localPosts = readLocal<BlogPost[]>(LOCAL_POSTS_KEY);
    if (localKittens?.length) setKittens(localKittens);
    if (localPosts?.length) setPosts(localPosts);

    const [kittenPayload, postPayload] = await Promise.all([
      fetch("/api/kittens").then((response) => response.json()).catch(() => ({ kittens: [] })),
      fetch("/api/blog").then((response) => response.json()).catch(() => ({ posts: [] })),
    ]);
    if (!localKittens?.length) setKittens(kittenPayload.kittens ?? []);
    if (!localPosts?.length) setPosts(postPayload.posts ?? []);
    setMessage("Ready to update the local preview.");
  }

  async function saveKitten(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Saving kitten...");
    const response = await fetch("/api/kittens", {
      method: kittenForm.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(kittenForm),
    });
    const next = upsertLocalKitten(kittens, kittenForm);
    setKittens(next);
    writeLocal(LOCAL_KITTENS_KEY, next);
    setMessage(
      response.ok
        ? "Kitten listing saved."
        : "Kitten listing saved to this browser preview.",
    );
    setKittenForm(emptyKitten);
  }

  async function removeKitten(id?: number) {
    if (!id) return;
    setMessage("Removing kitten...");
    const response = await fetch(`/api/kittens?id=${id}`, { method: "DELETE" });
    const next = kittens.filter((kitten) => kitten.id !== id);
    setKittens(next);
    writeLocal(LOCAL_KITTENS_KEY, next);
    setMessage(
      response.ok ? "Kitten removed from inventory." : "Kitten removed from local preview.",
    );
  }

  async function uploadPhoto(file: File | null) {
    if (!file) return;
    setMessage("Uploading photo...");
    const data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/media", { method: "POST", body: data });
    const payload = await response.json().catch(() => null);
    if (response.ok && payload?.url) {
      setKittenForm((current) => ({ ...current, imageUrl: payload.url }));
      setMessage("Photo uploaded. Save the kitten to publish it.");
    } else {
      const dataUrl = await fileToDataUrl(file);
      setKittenForm((current) => ({ ...current, imageUrl: dataUrl }));
      setMessage("Photo added to this browser preview. Save the kitten to publish it here.");
    }
  }

  async function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Saving blog post...");
    const response = await fetch("/api/blog", {
      method: postForm.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(postForm),
    });
    const next = upsertLocalPost(posts, postForm);
    setPosts(next);
    writeLocal(LOCAL_POSTS_KEY, next);
    setMessage(response.ok ? "Blog post saved." : "Blog post saved to this browser preview.");
    setPostForm(emptyPost);
  }

  return (
    <main className="studio">
      <header className="studio-header">
        <div>
          <p className="eyebrow">Owner studio</p>
          <h1>Update kittens and blog posts</h1>
          <p>Signed in as {userLabel}. {message}</p>
        </div>
        <a className="button secondary" href="/">
          View site
        </a>
        <button
          className="button light"
          type="button"
          onClick={() => {
            localStorage.removeItem(OWNER_SESSION_KEY);
            location.reload();
          }}
        >
          Sign out
        </button>
      </header>

      <section className="studio-grid">
        <form className="studio-panel" onSubmit={saveKitten}>
          <h2>{kittenForm.id ? "Edit kitten" : "New kitten"}</h2>
          <div className="form-grid">
            {(["name", "sex", "born", "standard", "tica", "showQuality", "availability", "mother", "breed", "price"] as const).map((field) => (
              <label key={field}>
                <span>{field.replace(/([A-Z])/g, " $1")}</span>
                <input
                  value={kittenForm[field] ?? ""}
                  onChange={(event) =>
                    setKittenForm({ ...kittenForm, [field]: event.target.value })
                  }
                  required={field === "name"}
                />
              </label>
            ))}
            <label>
              <span>Status</span>
              <select
                value={kittenForm.status}
                onChange={(event) =>
                  setKittenForm({
                    ...kittenForm,
                    status: event.target.value as Kitten["status"],
                  })
                }
              >
                <option value="available">available</option>
                <option value="reserved">reserved</option>
                <option value="sold">sold</option>
                <option value="hidden">hidden</option>
              </select>
            </label>
            <label>
              <span>Photo</span>
              <input
                accept="image/*"
                capture="environment"
                type="file"
                onChange={(event) => uploadPhoto(event.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          <label>
            <span>Notes</span>
            <textarea
              value={kittenForm.notes}
              onChange={(event) =>
                setKittenForm({ ...kittenForm, notes: event.target.value })
              }
            />
          </label>
          <div className="form-actions">
            <button className="button" type="submit">Save kitten</button>
            <button className="button secondary" type="button" onClick={() => setKittenForm(emptyKitten)}>
              Clear
            </button>
          </div>
        </form>

        <div className="studio-panel list-panel">
          <h2>Inventory</h2>
          {kittens.map((kitten) => (
            <div className="studio-row" key={`${kitten.id}-${kitten.name}`}>
              <img src={kitten.imageUrl || assets.placeholder} alt="" />
              <div>
                <strong>{kitten.name}</strong>
                <span>{kitten.status} - {kitten.availability}</span>
              </div>
              <button type="button" onClick={() => setKittenForm(kitten)}>Edit</button>
              <button type="button" onClick={() => removeKitten(kitten.id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>

      <section className="studio-grid">
        <form className="studio-panel" onSubmit={savePost}>
          <h2>{postForm.id ? "Edit blog post" : "Draft AI-assisted blog"}</h2>
          <label><span>Title</span><input value={postForm.title} onChange={(event) => setPostForm({ ...postForm, title: event.target.value, slug: slugify(event.target.value) })} required /></label>
          <label><span>Slug</span><input value={postForm.slug} onChange={(event) => setPostForm({ ...postForm, slug: event.target.value })} required /></label>
          <label><span>Excerpt</span><textarea value={postForm.excerpt} onChange={(event) => setPostForm({ ...postForm, excerpt: event.target.value })} /></label>
          <label><span>Body</span><textarea value={postForm.body} onChange={(event) => setPostForm({ ...postForm, body: event.target.value })} /></label>
          <div className="form-grid">
            <label><span>Status</span><select value={postForm.status} onChange={(event) => setPostForm({ ...postForm, status: event.target.value as BlogPost["status"] })}><option value="draft">draft</option><option value="published">published</option></select></label>
            <label><span>Cadence</span><select value={postForm.cadence} onChange={(event) => setPostForm({ ...postForm, cadence: event.target.value as BlogPost["cadence"] })}><option value="daily">daily</option><option value="weekly">weekly</option><option value="monthly">monthly</option></select></label>
            <label><span>Publish date</span><input value={postForm.publishedAt} onChange={(event) => setPostForm({ ...postForm, publishedAt: event.target.value })} /></label>
            <label><span>Keywords</span><input value={postForm.keywords} onChange={(event) => setPostForm({ ...postForm, keywords: event.target.value })} /></label>
          </div>
          <label><span>SEO title</span><input value={postForm.seoTitle} onChange={(event) => setPostForm({ ...postForm, seoTitle: event.target.value })} /></label>
          <label><span>SEO description</span><textarea value={postForm.seoDescription} onChange={(event) => setPostForm({ ...postForm, seoDescription: event.target.value })} /></label>
          <div className="prompt-box">
            <strong>AI blog prompt</strong>
            <p>{aiBlogPrompt}</p>
          </div>
          <button className="button" type="submit">Save post</button>
        </form>

        <div className="studio-panel list-panel">
          <h2>Blog archive</h2>
          {posts.map((post) => (
            <div className="studio-row text-row" key={`${post.id}-${post.slug}`}>
              <div>
                <strong>{post.title}</strong>
                <span>{post.status} - {post.cadence}</span>
              </div>
              <button type="button" onClick={() => setPostForm(post)}>Edit</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readLocal<T>(key: string): T | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Large image previews can exceed localStorage. Keep the UI responsive.
  }
}

function upsertLocalKitten(kittens: Kitten[], kitten: Kitten): Kitten[] {
  const saved = { ...kitten, id: kitten.id ?? Date.now() };
  return kitten.id
    ? kittens.map((item) => (item.id === kitten.id ? saved : item))
    : [saved, ...kittens];
}

function upsertLocalPost(posts: BlogPost[], post: BlogPost): BlogPost[] {
  const saved = { ...post, id: post.id ?? Date.now() };
  return post.id
    ? posts.map((item) => (item.id === post.id ? saved : item))
    : [saved, ...posts];
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
