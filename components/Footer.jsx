import Link from "next/link"; //TODO: Double check content of footer

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/about#careers">Careers</Link></li>
            <li><Link href="/about#brands">Our Brands</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Membership
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/register">Sign Up</Link></li>
            <li><Link href="/membership">Member Benefits</Link></li>
            <li><Link href="/login">Sign In</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/flyer">Monthly Flyer</Link></li>
            <li><Link href="/resources#faqs">FAQs</Link></li>
            <li><Link href="/resources#safety">Food Safety & Handling</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest2 text-gold-light">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>1-800-234-5299</li>
            <li>orders@restaurantdepot-mock.com</li>
            <li><Link href="/locations">Find a Warehouse</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-cream/50">
        © 2026 Restaurant Depot. Mockup for presentation purposes only.
      </div>
    </footer>
  );
}
