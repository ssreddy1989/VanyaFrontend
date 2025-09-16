import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to default country code (India)
  redirect("/in")
}
