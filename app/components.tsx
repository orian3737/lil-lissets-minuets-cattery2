"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { aiBlogPrompt, BlogPost, Kitten } from "./data";

type KittenBoardProps = {
  initialKittens: Kitten[];
};

export function KittenBoard({ initialKittens }: KittenBoardProps) {
  const [kittens, setKittens] = useState(initialKittens);
  const [filter, setFilter] = useState<"available" | "all">("available");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/kittens")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { kittens?: Kitten[] } | null) => {
        if (!cancelled && payload?.kittens?.length) {
          setKittens(payload.kittens);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    const source = kittens.filter((kitten) => kitten.status !== "hidden");
    return filter === "available"
      ? source.filter((kitten) => kitten.status === "available")
      : source;
  }, [filter, kittens]);

  return (
    <section id="kittens" className="section kitten-section">
      <div className="section-heading">
        <p className="eyebrow">Current kittens</p>
        <h2>Available and recently placed kittens</h2>
        <p>
          Every profile keeps the information families ask for most: sex, birth
          date, standard, TICA status, show quality, mother, breed, availability,
          and price.
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
          All public listings
        </button>
      </div>
      <div className="kitten-grid">
        {visible.map((kitten) => (
          <article className="kitten-card" key={`${kitten.id}-${kitten.name}`}>
            <div className="kitten-photo">
              <img src={kitten.imageUrl || "/hero-cattery.png"} alt={kitten.name} />
              <span className={`status ${kitten.status}`}>{kitten.status}</span>
            </div>
            <div className="kitten-body">
              <div>
                <h3>{kitten.name}</h3>
                <p>{kitten.notes}</p>
              </div>
              <dl>
                <div><dt>Sex</dt><dd>{kitten.sex}</dd></div>
                <div><dt>Born</dt><dd>{kitten.born}</dd></div>
                <div><dt>Standard</dt><dd>{kitten.standard}</dd></div>
                <div><dt>TICA</dt><dd>{kitten.tica}</dd></div>
                <div><dt>Show</dt><dd>{kitten.showQuality}</dd></div>
                <div><dt>Mother</dt><dd>{kitten.mother}</dd></div>
                <div><dt>Breed</dt><dd>{kitten.breed}</dd></div>
                <div><dt>Price</dt><dd>{kitten.price}</dd></div>
              </dl>
              <a className="text-link" href="#contact">
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
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { posts?: BlogPost[] } | null) => {
        const published = payload?.posts?.filter((post) => post.status === "published");
        if (!cancelled && published?.length) setPosts(published);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="blog" className="section blog-section">
      <div className="section-heading">
        <p className="eyebrow">Blog and SEO</p>
        <h2>Education that helps families find you</h2>
        <p>
          The blog is built for regular Minuet care articles, availability
          updates, and search-friendly pages that can be drafted with AI and
          reviewed before publishing.
        </p>
      </div>
      <div className="blog-list">
        {posts.map((post) => (
          <article className="blog-card" key={post.slug}>
            <p>{post.publishedAt || "Draft"}</p>
            <h3>{post.title}</h3>
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
  imageUrl: "/hero-cattery.png",
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
    const [kittenPayload, postPayload] = await Promise.all([
      fetch("/api/kittens").then((response) => response.json()).catch(() => ({ kittens: [] })),
      fetch("/api/blog").then((response) => response.json()).catch(() => ({ posts: [] })),
    ]);
    setKittens(kittenPayload.kittens ?? []);
    setPosts(postPayload.posts ?? []);
    setMessage("Ready to update the site.");
  }

  async function saveKitten(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Saving kitten...");
    const response = await fetch("/api/kittens", {
      method: kittenForm.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(kittenForm),
    });
    setMessage(response.ok ? "Kitten listing saved." : "Could not save kitten.");
    if (response.ok) {
      setKittenForm(emptyKitten);
      refreshAll();
    }
  }

  async function removeKitten(id?: number) {
    if (!id) return;
    setMessage("Removing kitten...");
    const response = await fetch(`/api/kittens?id=${id}`, { method: "DELETE" });
    setMessage(response.ok ? "Kitten removed from inventory." : "Could not remove kitten.");
    if (response.ok) refreshAll();
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
      setMessage("Could not upload that photo.");
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
    setMessage(response.ok ? "Blog post saved." : "Could not save blog post.");
    if (response.ok) {
      setPostForm(emptyPost);
      refreshAll();
    }
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
              <img src={kitten.imageUrl || "/hero-cattery.png"} alt="" />
              <div>
                <strong>{kitten.name}</strong>
                <span>{kitten.status} · {kitten.availability}</span>
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
                <span>{post.status} · {post.cadence}</span>
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
