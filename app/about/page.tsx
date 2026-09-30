import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About WrenchlyTools — The Everyday Utility Toolbox",
  description:
    "WrenchlyTools is a free, privacy-first toolbox of browser-based utilities for students, developers, creators, freelancers, and small businesses.",
  alternates: {
    canonical: "/about",
  },
};

export default function Page() {
  return <AboutContent />;
}
