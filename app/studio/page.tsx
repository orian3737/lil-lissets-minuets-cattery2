import { OwnerStudio } from "../components";
import { requireChatGPTUser } from "../chatgpt-auth";
import { isOwner, OWNER_EMAIL } from "../owner";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const user = await requireChatGPTUser("/studio");
  if (!isOwner(user)) {
    return (
      <main className="studio">
        <section className="studio-panel">
          <p className="eyebrow">Owner studio</p>
          <h1>Owner access required</h1>
          <p>
            This dashboard is limited to {OWNER_EMAIL}. Sign out and return with
            the owner account to manage kittens, photos, and blog posts.
          </p>
          <div className="hero-actions">
            <a className="button" href="/signout-with-chatgpt?return_to=/studio">
              Sign out
            </a>
            <a className="button secondary" href="/">
              View site
            </a>
          </div>
        </section>
      </main>
    );
  }
  return <OwnerStudio userLabel={user.displayName} />;
}
