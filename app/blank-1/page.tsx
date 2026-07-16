import { redirect } from "next/navigation";

export default function LegacyKittensPage() {
  redirect("/kittens");
}
