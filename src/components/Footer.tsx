import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 px-4 py-6 border-t border-zinc-800 mt-auto">
      <div className="max-w-3xl mx-auto text-center space-y-2 text-sm">
        <p className="text-zinc-500">
          ⚠️ This website is for learning, testing, and demo purposes only. No
          IP or location data is stored.
        </p>
        <p>
          Made with ❤️ by{" "}
          <Link
            href="https://github.com/tanamaroby"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-200 transition"
          >
            Roby Tanama
          </Link>
        </p>
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
