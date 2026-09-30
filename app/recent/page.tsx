import type { Metadata } from "next";
import { RecentPage } from "@/components/pages/RecentPage";

export const metadata: Metadata = {
  title: "Recently Visited Tools",
  description:
    "The WrenchlyTools utilities you opened most recently. History stays in your browser and is never uploaded.",
  alternates: {
    canonical: "/recent",
  },
};

export default function Page() {
  return <RecentPage />;
}
