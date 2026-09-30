import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — WrenchlyTools Support & Suggestions",
  description:
    "Suggest a new tool, report a bug, or reach the WrenchlyTools team. We read every message.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
