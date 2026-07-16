import type { ChatGPTUser } from "./chatgpt-auth";

export const OWNER_EMAIL = "ryanmurthon@gmail.com";

export function isOwner(user: ChatGPTUser | null) {
  return user?.email.toLowerCase() === OWNER_EMAIL;
}
