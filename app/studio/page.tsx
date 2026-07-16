import { OwnerStudio } from "../components";
import { requireChatGPTUser } from "../chatgpt-auth";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const user = await requireChatGPTUser("/studio");
  return <OwnerStudio userLabel={user.displayName} />;
}
