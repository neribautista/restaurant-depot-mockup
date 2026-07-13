"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import MembershipMenu from "@/components/MembershipMenu";

const MENUS = {
  About: [
    { label: "About Us", href: "/about" },
    { label: "Company Information", href: "/about/company-information" },
    { label: "Careers", href: "https://jobs.rapidhire.ukg.net/jetrord" },
    { label: "Our Brands", href: "/about/our-brands" },
    { label: "Product Videos", href: "/about/product-videos" },
    { label: "Testimonials", href: "/about/testimonials" },
  ],
  Locations: [
    { label: "Find a Warehouse", href: "/locations" },
    { label: "Locations Coming Soon", href: "/locations#coming-soon" },
    { label: "Holiday Closures", href: "/locations#holidays" },
  ],
  Resources: [
    { label: "Online Ordering", href: "/resources/online-ordering" },
    { label: "Food Safety & Handling", href: "/resources/food-safety" },
    { label: "Department Tours", href: "/resources/department-tours" },
    { label: "Text Permission", href: "/resources/text-permission" },
    { label: "Request Cost Analysis", href: "/supplier-update" },
  ],
};

const JETRO_MENU = [
  { label: "Our Services & Store", href: "/jetro/services" },
  { label: "Store Locations", href: "/jetro/locations" },
  { label: "Export Assistance", href: "/jetro/export-assistance" },
  { label: "View Regional Flyers", href: "/jetro/flyers" },
  { label: "Restaurant Depot", href: "/" },
];

function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 py-2 text-sm font-medium tracking-wide text-navy transition-colors hover:text-gold-deep"
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-sm border border-navy/10 bg-white shadow-xl">
          {items.map((item) => (
            item.href.startsWith("http") ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-5 py-3 text-sm text-navy/90 transition-colors hover:bg-navy/5 hover:text-gold-deep"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block px-5 py-3 text-sm text-navy/90 transition-colors hover:bg-navy/5 hover:text-gold-deep"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isJetroPage = pathname.startsWith("/jetro");

  const { user, isApprovedMember, isAdmin, logout } = useAuth();
  const { count } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const canViewCatalog = isApprovedMember || isAdmin;

  const isAccountDropdownOpen = dropdownOpen || adminDropdownOpen;

  const closeAccountDropdowns = () => {
    setDropdownOpen(false);
    setAdminDropdownOpen(false);
  };

  // True page freeze: while the dropdown is open, stop the page itself
  // from scrolling, on top of blocking clicks (handled by the overlay below).
  useEffect(() => {
    if (isAccountDropdownOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isAccountDropdownOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
          <Link
            href={isJetroPage ? "/jetro" : "/"}
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            {isJetroPage ? (
              <Image
                src="/images/jetro-logo.png"
                alt="Jetro Cash & Carry"
                width={230}
                height={70}
                priority
                className="h-9 w-auto sm:h-12"
              />
            ) : (
              <>
                <Image
                  src="/images/rd-logo.png"
                  alt="Restaurant Depot"
                  width={44}
                  height={44}
                  priority
                  className="h-9 w-9 shrink-0 sm:h-11 sm:w-11"
                />

                <span className="font-display leading-tight text-navy">
                  <span className="block whitespace-nowrap text-sm tracking-wide sm:text-lg">
                    Restaurant Depot
                  </span>
                  <span className="hidden whitespace-nowrap text-[10px] font-body font-medium uppercase tracking-widest2 text-gold-deep sm:block">
                    Where Restaurants Shop
                  </span>
                </span>
              </>
            )}
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {isJetroPage ? (
              JETRO_MENU.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium tracking-wide text-navy transition-colors hover:text-orange-600"
                >
                  {item.label}
                </Link>
              ))
            ) : (
              <>
                <Dropdown label="About" items={MENUS.About} />
                <Dropdown label="Locations" items={MENUS.Locations} />
                <MembershipMenu />
                <Dropdown label="Resources" items={MENUS.Resources} />

                <Link
                  href="/jetro"
                  className="text-sm font-medium tracking-wide text-navy transition-colors hover:text-gold-deep"
                >
                  Jetro
                </Link>

                <Link
                  href="/flyer"
                  className="text-sm font-medium tracking-wide text-navy transition-colors hover:text-gold-deep"
                >
                  Monthly Flyer
                </Link>

                {canViewCatalog && (
                  <Link
                    href="/products"
                    className="text-sm font-medium tracking-wide text-navy transition-colors hover:text-gold-deep"
                  >
                    Catalog
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {!isAdmin && canViewCatalog && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-navy transition-colors hover:text-gold-deep"
                aria-label="Cart"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 4h2l2.4 12.2A2 2 0 0 0 9.36 18h7.28a2 2 0 0 0 1.96-1.6L20 8H6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="9" cy="21" r="1.4" fill="currentColor" />
                  <circle cx="18" cy="21" r="1.4" fill="currentColor" />
                </svg>

                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
                    {count}
                  </span>
                )}
              </button>
            )}

            {!user && !isJetroPage && (
              <div className="flex items-center gap-1.5 sm:gap-3">
                <Link
                  href="/login"
                  className="whitespace-nowrap text-xs font-medium text-navy transition-colors hover:text-gold-deep sm:text-sm"
                >
                  Sign In
                </Link>

                <span className="h-4 w-px bg-navy/20" aria-hidden="true" />

                <Link
                  href="/register"
                  className="whitespace-nowrap rounded-sm border border-gold px-2.5 py-1 text-xs font-medium text-gold-deep transition-colors hover:bg-gold hover:text-navy sm:px-4 sm:py-1.5 sm:text-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {user && isApprovedMember && (
              <div className="relative z-50">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold-deep"
                >
                  Hi, {user.contactName?.split(" ")[0] || "there"}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded border border-navy/10 bg-white shadow-lg">
                    <Link href="/account" className="block px-4 py-2 text-sm text-navy hover:bg-navy/5">
                      Account Settings
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-navy hover:bg-navy/5">
                      My Orders
                    </Link>
                    <Link href="/requisition-list" className="block px-4 py-2 text-sm text-navy hover:bg-navy/5">
                      Requisition List
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full border-t border-navy/10 px-4 py-2 text-left text-sm text-navy hover:bg-navy/5"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {user && isAdmin && (
              <div className="relative z-50">
                <button
                  onClick={() => setAdminDropdownOpen((o) => !o)}
                  className="text-sm font-medium text-navy hover:text-gold-deep"
                >
                  Hi, {user.contactName?.split(" ")[0] || "Admin"}
                </button>

                {adminDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded border border-navy/10 bg-white shadow-lg">
                    <Link href="/admin/orders" className="block px-4 py-2 text-sm text-navy hover:bg-navy/5">
                      Manage Orders
                    </Link>
                    <Link href="/admin" className="block px-4 py-2 text-sm text-navy hover:bg-navy/5">
                      Applications
                    </Link>
                    <Link href="/admin/promotions" className="block px-4 py-2 text-sm text-navy hover:bg-navy/5">
                      Promotions
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full border-t border-navy/10 px-4 py-2 text-left text-sm text-navy hover:bg-navy/5"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              className="text-navy lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="space-y-3 border-t border-navy/10 bg-white px-6 py-4 lg:hidden">
            {isJetroPage ? (
              JETRO_MENU.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-1 text-sm text-navy"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))
            ) : (
              <>
                {Object.entries(MENUS).map(([label, items]) => (
                  <div key={label}>
                    <p className="mb-1 text-xs uppercase tracking-widest2 text-gold-deep">
                      {label}
                    </p>
                    {items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block py-1 text-sm text-navy"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}

                <Link href="/jetro" className="block py-1 text-sm text-navy">
                  Jetro
                </Link>

                <Link href="/flyer" className="block py-1 text-sm text-navy">
                  Monthly Flyer
                </Link>

                {canViewCatalog && (
                  <Link href="/products" className="block py-1 text-sm text-navy">
                    Catalog
                  </Link>
                )}
              </>
            )}
          </div>
        )}

        {/*
          Full-page freeze: this MUST live inside <header>, not as a sibling
          after it. Header establishes its own stacking context (sticky +
          z-40), so a sibling overlay placed after </header> only sits above
          whatever's below the header — it can never cover the header's own
          nav links no matter how high its z-index goes. As a child here, it
          stacks against the header's other children directly: above plain
          nav links/buttons (which have no z-index), but below the
          account/admin trigger (z-50) so that stays clickable to close it.
        */}
        {isAccountDropdownOpen && (
          <div
            className="fixed inset-0 z-30 bg-navy/40 backdrop-blur-[1px] transition-opacity duration-150"
            onClick={closeAccountDropdowns}
            aria-hidden="true"
          />
        )}
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
