import Link from "next/link";

const featured = {
  name: "Hamdi Gummustekin",
  business: "Bernini's Bistro",
  location: "La Jolla, CA",
  quote:
    "All restaurant owners should take the plunge and shop at Restaurant Depot for outstanding prices, variety of products, quality of fresh meats and produce, the ability to see the items before purchasing, and a very helpful staff.",
  image: "/images/testimonials/hamdi-gummustekin.png",
};

const highlights = [
  {
    name: "Russ Salerno",
    business: "Salerno's Pizza",
    location: "Gilbert, AZ",
    quote:
      "I shop at Restaurant Depot for the selection, quality and convenience, in addition to the fact that I save 30–40% on my purchases.",
  },
  {
    name: "Sam Nasr",
    business: "Berry Hill Baja Grill",
    location: "Dallas, TX",
    quote:
      "The prices, quality and service exceeded all my expectations, and I have saved bundles of money since I started shopping at Restaurant Depot in 2005.",
  },
  {
    name: "Frank Scheuren",
    business: "Milano Pizza & Subs",
    location: "Atlanta, GA",
    quote:
      "At Restaurant Depot, I now save up to 35% off what my distributor was charging me.",
  },
];

const photoCards = [
  {
    name: "Brett Doogan",
    business: "Food Junkies Catering",
    location: "San Diego, CA",
    quote:
      "Any foodservice owner who is not shopping at Restaurant Depot is certainly missing out on an incredible profit boost.",
    image: "/images/testimonials/brett-doogan.png",
  },
  {
    name: "Justin Jachura",
    business: "Los Tacos & Grubby's Diner",
    location: "Oceanside, CA",
    quote:
      "The main reason I adore Restaurant Depot is what goes into my wallet in the form of larger profits. Shopping at Restaurant Depot has helped me cut my food costs dramatically.",
    image: "/images/testimonials/justin-jachura.png",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="text-ink">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/testimonials/testimonials-hero.png')",
          }}
        />

        {/* 70% navy overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-navy/70" />

        {/* Additional gradient for better text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-navy/60"
        />

        <div className="relative mx-auto flex min-h-[520px] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="font-display text-xl italic text-white/90">
            Real Stories. Real Savings.
          </p>

          <h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">
            Customer Testimonials
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
            Hear from restaurant owners, caterers, and foodservice professionals
            who rely on Restaurant Depot for value, selection, and service.
          </p>

          <Link
            href="#testimonials"
            className="mt-10 inline-flex items-center justify-center rounded-sm bg-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            View Testimonials
          </Link>
        </div>
      </section>

      {/* FEATURED TESTIMONIAL */}
      <section id="testimonials" className="scroll-mt-24 bg-navy text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Featured Member
            </p>

            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Trusted by Foodservice Professionals
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 md:text-base">
              Restaurant Depot gives independent foodservice operators access to
              wholesale pricing, quality products, and the freedom to shop
              without order minimums.
            </p>
          </div>

          <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-sm md:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={featured.image}
                alt={featured.name}
                className="h-32 w-32 flex-shrink-0 rounded-full border-4 border-gold/30 object-cover shadow-lg"
              />

              <div>
                <span
                  aria-hidden="true"
                  className="font-display text-6xl leading-none text-gold"
                >
                  “
                </span>

                <blockquote className="-mt-2 text-sm leading-7 text-white/80 md:text-base">
                  {featured.quote}
                </blockquote>

                <div className="mt-5">
                  <p className="font-display text-xl text-white">
                    {featured.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gold">
                    {featured.business}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">
                    {featured.location}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* TEXT TESTIMONIALS */}
      <section className="border-t border-white/10 bg-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Member Experiences
            </p>

            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              What Our Customers Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {highlights.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.05] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-gold"
                >
                  “
                </span>

                <blockquote className="mt-3 flex-1 text-sm leading-7 text-white/75">
                  {testimonial.quote}
                </blockquote>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <h3 className="font-display text-xl">
                    {testimonial.business}
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-sm text-gold">
                    {testimonial.location}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-sm bg-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>

      {/* PHOTO TESTIMONIALS */}
      <section className="bg-cream/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#C79A00]">
              MORE MEMBER STORIES
            </p>

            <h2 className="mt-4 font-display text-3xl text-navy md:text-4xl">
              Savings That Make a Difference
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/65 md:text-base">
              From catering companies to neighborhood restaurants, our members
              count on Restaurant Depot to help keep their businesses
              profitable.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {photoCards.map((testimonial) => (
              <article
                key={testimonial.name}
                className="group flex h-full flex-col rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="mx-auto h-32 w-32 rounded-full border-4 border-cream object-cover shadow-md transition duration-300 group-hover:scale-105"
                />

                <h3 className="mt-6 font-display text-2xl text-navy">
                  {testimonial.name}
                </h3>

                <p className="mt-2 font-semibold text-[#C79A00]">
                  {testimonial.business}
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink/45">
                  {testimonial.location}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-5 font-display text-4xl leading-none text-gold"
                >
                  “
                </span>

                <blockquote className="mt-2 flex-1 text-sm leading-7 text-ink/70">
                  {testimonial.quote}
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-navy px-6 py-16 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Shop Smarter
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
          Join Thousands of Foodservice Professionals Nationwide
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Discover wholesale savings, quality products, and the convenience your
          business needs to thrive.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-flex items-center justify-center rounded-sm bg-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
        >
          Join Restaurant Depot
        </Link>
      </section>
    </div>
  );
}