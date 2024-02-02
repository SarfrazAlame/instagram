import { redirect } from "next/navigation";
import { config } from "../../auth";

export default async function Home() {
  
  redirect("/dashboard")
}
