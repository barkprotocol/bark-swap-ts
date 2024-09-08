"use client";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { architype_bayer } from "./fonts/config";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 p-6 text-center">
        <h3
          className={`${architype_bayer.className} text-5xl md:text-8xl font-bold mb-6`}
          aria-label="404 Page Not Found"
        >
          404: Oops, the stars are not aligned...
        </h3>
        <p className="text-lg mb-6">
          It looks like the page you're looking for doesn't exist.
        </p>
        <Link href="/" className="text-black underline hover:text- dark:text-black-400 dark:hover:text-black-300">
          Go back to the homepage
        </Link>
      </main>
      <Footer />
    </div>
  );
}
