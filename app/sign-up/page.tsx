import type { Metadata } from "next"
import SignUpClientPage from "./SignUpClientPage"

export const metadata: Metadata = {
  title: "Sign Up - Nylon Hosting",
  description: "Create a new Nylon Hosting account",
}

export default function SignUpPage() {
  return <SignUpClientPage />
}
