import Link from "next/link";

const linkStyles =
  "transition-colors duration-200 hover:text-gold-light";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-3 lg:grid-cols-5">
        {/* COMPANY */}
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Company
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className={linkStyles}>
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/about/company-information"
                className={linkStyles}
              >
                Company Information
              </Link>
            </li>

            <li>
              <Link href="/contact-us" className={linkStyles}>
                Contact Us
              </Link>
            </li>

            <li>
              <a
                href="https://jobs.rapidhire.ukg.net/jetrord"
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyles}
              >
                Careers
              </a>
            </li>

            <li>
              <Link href="/about/our-brands" className={linkStyles}>
                Our Brands
              </Link>
            </li>

            <li>
              <Link href="/about/product-videos" className={linkStyles}>
                Product Videos
              </Link>
            </li>

            <li>
              <Link href="/about/testimonials" className={linkStyles}>
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        {/* MEMBERSHIP */}
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Membership
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/register" className={linkStyles}>
                Become a Member
              </Link>
            </li>

            <li>
              <Link href="/membership" className={linkStyles}>
                Membership Benefits
              </Link>
            </li>

            <li>
              <Link href="/membership/terms" className={linkStyles}>
                Membership Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Resources
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/resources/online-ordering"
                className={linkStyles}
              >
                Online Ordering
              </Link>
            </li>

            <li>
              <Link
                href="/resources/food-safety"
                className={linkStyles}
              >
                Food Safety &amp; Handling
              </Link>
            </li>

            <li>
              <Link
                href="/resources/department-tours"
                className={linkStyles}
              >
                Department Tours
              </Link>
            </li>

            <li>
              <Link
                href="/resources/text-permission"
                className={linkStyles}
              >
                Text Permission
              </Link>
            </li>

            <li>
              <Link href="/supplier-update" className={linkStyles}>
                Request Cost Analysis
              </Link>
            </li>

            <li>
              <Link href="/flyer" className={linkStyles}>
                Monthly Flyer
              </Link>
            </li>
          </ul>
        </div>

        {/* LOCATIONS & JETRO */}
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Locations &amp; Jetro
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/locations" className={linkStyles}>
                Find a Warehouse
              </Link>
            </li>

            <li>
              <Link
                href="/locations#coming-soon"
                className={linkStyles}
              >
                Locations Coming Soon
              </Link>
            </li>

            <li>
              <Link href="/locations#holidays" className={linkStyles}>
                Holiday Closures
              </Link>
            </li>

            <li>
              <Link href="/jetro" className={linkStyles}>
                Jetro Cash &amp; Carry
              </Link>
            </li>

            <li>
              <Link href="/jetro/locations" className={linkStyles}>
                Jetro Store Locations
              </Link>
            </li>

            <li>
              <Link href="/jetro/flyers" className={linkStyles}>
                Jetro Regional Flyers
              </Link>
            </li>
          </ul>
        </div>

        {/* NEED ASSISTANCE */}
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Need Assistance?
          </h4>

          <p className="mb-5 text-sm leading-6 text-cream/60">
            Contact our team for membership, website, or branch support.
          </p>

          <div className="space-y-3 text-sm">
            <a
              href="tel:7187628700"
              className="block font-semibold text-cream transition-colors hover:text-gold-light"
            >
              (718) 762-8700
            </a>

            <a
              href="mailto:communications@jetrord.com"
              className="block break-all text-cream/70 transition-colors hover:text-gold-light"
            >
              communications@jetrord.com
            </a>

            <Link
              href="/contact-us"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-gold/60 px-4 py-2.5 font-semibold text-gold-light transition hover:bg-gold hover:text-charcoal"
            >
              Contact Us
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-cream/50">
        © 2026 Restaurant Depot. Mockup for presentation purposes only.
      </div>
    </footer>
  );
}