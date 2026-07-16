import type { ChatGPTUser } from "./chatgpt-auth";

export const OWNER_EMAIL = "ryanmurzyn@gmail.com";
export const OWNER_EMAILS = ["ryanmurzyn@gmail.com", "longwi.2288@gmail.com"];
export const OWNER_STUDIO_PATH = "/lisseth-keyhole";

export function isOwner(user: ChatGPTUser | null) {
  return user ? OWNER_EMAILS.includes(user.email.toLowerCase()) : false;
}
