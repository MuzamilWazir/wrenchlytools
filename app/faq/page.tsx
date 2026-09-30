import type { Metadata } from "next";
import { FAQPage } from "@/components/pages/FAQPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — WrenchlyTools Help",
  description:
    "Answers about WrenchlyTools pricing, in-browser privacy, offline usage, watermarks, file limits, and locally stored favorites.",
  alternates: {
    canonical: "/faq",
  },
};

export default function Page() {
  return <FAQPage />;
}
