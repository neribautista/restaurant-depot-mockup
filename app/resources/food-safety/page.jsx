import Image from "next/image";

const VIDEO_URL = "https://www.youtube.com/watch?v=miiMpsIqJ38";
const NRA_FOOD_SAFETY = "https://www.restaurant.org/education-and-resources/learning-center/food-nutrition/food-safety/";

const KOOL_LINKS = [
  "Keep it Kool Guide",
  "Keep it Kool Products",
  "Free Gel Pak Offer",
];

const SAFETY_STEPS = [
  "Clean Your Hands",
  "Cover Coughs & Sneezes",
  "Clean & Sanitize Surfaces",
];

export default function FoodSafetyPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative h-[360px] overflow-hidden">
        <Image
          src="/images/cold-storage.jpg"
          alt="Cold storage warehouse aisle"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/35" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              Resources
            </p>

            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-white md:text-5xl">
              Food Safety & Handling
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
              Restaurant Depot has the KOOL solution for transporting your
              quality perishables.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        {/* KEEP IT KOOL */}
        <div className="rounded-xl bg-cream p-8 shadow-sm">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/keep-it-kool-banner.png"
              alt="Keep It Kool"
              width={1200}
              height={300}
              className="h-[220px] w-full object-cover"
            />
          </div>

          <h2 className="mt-8 font-display text-3xl text-ink">
            We Have Solutions for Every Order Size!
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {KOOL_LINKS.map((item) => (
              <a
                key={item}
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-5 font-semibold text-navy shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:text-gold-deep hover:shadow-md"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-lg bg-white p-6 shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/keep-it-kool-products.png"
              alt="Keep It Kool products"
              width={1200}
              height={350}
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* NATIONAL RESTAURANT ASSOCIATION */}
        <a
          href={NRA_FOOD_SAFETY}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 flex flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg md:flex-row md:justify-between"
        >
          <Image
            src="/images/national-restaurant-association.png"
            alt="National Restaurant Association"
            width={900}
            height={150}
            className="h-[80px] w-auto object-contain lg:h-[95px]"
          />

          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
              Official Resource
            </p>

            <h3 className="mt-2 font-display text-2xl text-navy">
              National Restaurant Association
            </h3>

            <p className="mt-2 max-w-2xl leading-7 text-ink/70">
              Explore food safety best practices, employee training resources,
              sanitation guidance, and industry recommendations from the
              National Restaurant Association.
            </p>
          </div>

          <div className="rounded-sm bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-widest2 text-white transition hover:bg-navy/90">
            Visit Resource →
          </div>
        </a>

        {/* CORONAVIRUS / HYGIENE */}
        <section className="mt-16">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
            Hygiene Practices
          </p>

          <h2 className="mt-3 font-display text-4xl text-ink">
            Precautions Against Coronavirus
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-ink/70">
            Good hygiene practices help reduce infection risk. Follow simple
            cleaning, handwashing, and sanitizing steps to help keep your team,
            customers, and foodservice environment safer.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {SAFETY_STEPS.map((step, index) => (
              <div
                key={step}
                className="rounded-xl bg-cream p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-bold text-navy">
                    {index + 1}
                  </div>

                  <h3 className="font-display text-xl text-navy">{step}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/coronavirus-precautions.png"
              alt="Precautions against coronavirus"
              width={1400}
              height={1000}
              className="w-full object-contain"
            />
          </div>
        </section>

        {/* VIDEO CTA */}
        <section className="mt-16 rounded-xl bg-navy p-10 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Food Safety Video
          </p>

          <h2 className="mt-4 font-display text-3xl text-white">
            Learn More About Safe Food Handling
          </h2>

          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-navy transition hover:bg-gold-light"
          >
            Watch Video
          </a>
        </section>
      </section>
    </main>
  );
}