import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to default country code (US)
  redirect("/us")
}
