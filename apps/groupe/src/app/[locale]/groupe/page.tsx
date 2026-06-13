import { redirect } from "next/navigation";

/* /groupe → redirigé vers /a-propos (page Corporate consolidée) */
export default function GroupePage() {
  redirect("/a-propos");
}
