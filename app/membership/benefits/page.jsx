import Image from "next/image";
import Link from "next/link";

const BENEFITS = [
  {
    title: "Low Prices",
    copy: "Enjoy everyday low warehouse pricing plus monthly specials for even greater savings.",
  },
  {
    title: "Huge Selection",
    copy: "Choose from thousands of foodservice products, national brands, and Restaurant Depot exclusive brands.",
  },
  {
    title: "One-Stop Shopping",
    copy: "Everything your restaurant or foodservice business needs under one roof.",
  },
  {
    title: "No Minimum Purchase",
    copy: "Whether you purchase one item or one hundred, you receive the same competitive pricing.",
  },
  {
    title: "Quick & Easy Shopping",
    copy: "Clearly organized departments and visible pricing help you shop efficiently.",
  },
  {
    title: "Open Every Day",
    copy: "Convenient warehouse hours seven days a week, excluding major holidays.",
  },
  {
    title: "Free Membership",
    copy: "Membership is available to qualified restaurants, caterers, coffee shops, bars, foodservice businesses, and eligible non-profit organizations.",
  },
  {
    title: "Exclusive Member Specials",
    copy: "Receive monthly promotions, special pricing, and warehouse event announcements by email.",
  },
];

export default function MembershipBenefitsPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative h-[500px] overflow-hidden lg:h-[600px]">
        <Image
          src="/images/restaurant_depot.png"
          alt="Restaurant Depot Warehouse"
          fill
          priority
          className="object-cover object-center opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
            <div className="max-w-xl">
              <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Membership
              </span>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                Membership
                <span className="block text-gold">Built for Foodservice</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-white/90">
                Join thousands of restaurants, cafés, caterers, food trucks,
                bakeries, and foodservice businesses that save every day with
                free membership, warehouse pricing, and an unmatched product
                selection.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-navy transition hover:bg-gold-light"
                >
                  Apply for Membership
                </Link>

                <Link
                  href="#benefits"
                  className="rounded-sm border border-white/40 px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-navy"
                >
                  Explore Benefits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section id="benefits" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
              Why Join
            </p>

            <h2 className="mt-4 font-display text-5xl text-ink">
              Membership is FREE
            </h2>

            <p className="mt-8 text-lg leading-9 text-ink/75">
              Restaurant Depot membership is completely free for qualified
              businesses. Simply complete a short online application and visit
              your preferred warehouse with the required business documentation
              to receive your permanent membership card.
            </p>

            <p className="mt-8 leading-8 text-ink/70">
              Once your application is complete, visit your selected warehouse
              with your valid business license, reseller's permit, or tax-exempt
              certificate, along with proof that you're authorized to make
              purchases for your business.
            </p>

            <p className="mt-6 leading-8 text-ink/70">
              Your membership card is accepted at every Restaurant Depot
              location across the United States and unlocks access to your
              online account, purchase history, shopping lists, inventory tools,
              order guides, and personalized product recommendations.
            </p>

            <div className="mt-12 rounded-md border-l-4 border-gold bg-cream p-8 shadow-sm">
              <h3 className="font-display text-2xl text-navy">
                Membership Requirements
              </h3>

              <p className="mt-4 leading-8 text-ink/70">
                To qualify for membership, you'll need:
              </p>

              <ul className="mt-4 space-y-3 text-ink/75">
                <li>✓ Valid reseller's permit or business license</li>
                <li>
                  ✓ Tax-exempt certificate for qualified nonprofit organizations
                </li>
                <li>
                  ✓ Proof that you're authorized to purchase on behalf of the
                  business
                </li>
              </ul>
            </div>

            {/* Warehouse Image */}
            <div className="mt-12 overflow-hidden rounded-lg shadow-sm">
              <Image
                src="/images/warehouse.png"
                alt="Restaurant Depot warehouse aisle"
                width={900}
                height={600}
                className="h-[360px] w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-lg bg-cream p-10 shadow-sm">
              <h3 className="font-display text-4xl text-ink">
                Your Membership Includes
              </h3>

              <div className="mt-10 space-y-6">
                {BENEFITS.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="border-b border-cream-dark pb-6 transition duration-200 hover:border-gold"
                  >
                    <h4 className="text-lg font-semibold text-navy">
                      {benefit.title}
                    </h4>

                    <p className="mt-2 leading-7 text-ink/70">
                      {benefit.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Join Today
          </p>

          <h2 className="mt-4 font-display text-5xl text-white">
            Ready to Become a Member?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
            Apply online in just a few minutes. Once approved, visit your
            preferred Restaurant Depot warehouse with your business documentation
            and start shopping immediately.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/register"
              className="rounded-sm bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-widest2 text-navy transition hover:bg-gold-light"
            >
              Apply for Membership
            </Link>

            <Link
              href="/membership/terms"
              className="rounded-sm border border-white/30 px-10 py-4 text-sm font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-navy"
            >
              Membership Terms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}