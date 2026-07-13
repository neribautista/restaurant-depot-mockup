"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const MEMBERSHIP_LINKS = [
  {
    label: "Sign Up",
    href: "/register",
    blurb: "Apply for a free wholesale account",
  },
  {
    label: "Member Benefits",
    href: "/membership/benefits",
    blurb: "See what your membership unlocks",
  },
  {
    label: "Membership Terms & Conditions",
    href: "/membership/terms",
    blurb: "Terms, arbitration & warehouse rules",
  },
];

export default function MembershipMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm font-medium text-navy hover:text-gold-deep"
        aria-expanded={open}
      >
        Membership

        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 3l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`absolute left-0 top-full z-20 w-72 origin-top rounded-sm border border-cream-dark bg-white p-2 shadow-lg transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {MEMBERSHIP_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="block rounded-sm px-4 py-3 transition-colors hover:bg-cream"
          >
            <p className="text-sm font-semibold text-ink">{item.label}</p>
            <p className="mt-0.5 text-xs text-ink/55">{item.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}