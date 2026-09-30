import type { Metadata } from "next";
import { FavoritesPage } from "@/components/pages/FavoritesPage";

export const metadata: Metadata = {
  title: "Your Favorite Tools",
  description:
    "Quickly access the WrenchlyTools utilities you use most. Favorites are saved locally in your browser.",
  alternates: {
    canonical: "/favorites",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <FavoritesPage />;
}
