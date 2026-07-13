"use client";

const TOURS = [
  {
    title: "Fresh Meat",
    description: "Walk through the fresh meat department and explore the in-store selection.",
    image: "/images/tours-fresh-meat.jpeg",
    url: "https://www.google.com/maps/@37.7479511,-122.3970904,3a,88.2y,327.16h,73.84t/data=!3m8!1e1!3m6!1sAF1QipNWSNrc09ZF4KgOziRflMHjjAJI5lFThoEpO4Zg!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipNWSNrc09ZF4KgOziRflMHjjAJI5lFThoEpO4Zg%3Dw900-h600-k-no-pi16.16234185673072-ya196.71624782702634-ro0-fo100!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "Fresh Seafood",
    description: "Preview the seafood department and see the variety available in warehouse.",
    image: "/images/tours-fresh-seafood.png",
    url: "https://www.google.com/maps/@37.7480456,-122.3968799,0a,82.2y,329.97h,67.72t/data=!3m4!1e1!3m2!1sAF1QipMylNlvkeTRIPGGe0dIpsLSl8mMEoL5QLSQCyUn!2e10?source=apiv3",
  },
  {
    title: "Beverages",
    description: "Explore the beverage department and view the warehouse layout.",
    image: "/images/tours-beverages.png",
    url: "https://www.google.com/maps/@37.7481591,-122.3972072,0a,82.2y,310.2h,65.03t/data=!3m4!1e1!3m2!1sAF1QipMUINb0Uqlp0UoJ_npe85L_IPnifHQByfYRu3il!2e10?source=apiv3",
  },
];

export default function DepartmentToursPage() {
  return (
    <main className="bg-white">
      <section className="bg-navy py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Resources
          </p>
          <h1 className="mt-4 font-display text-5xl text-white">
            Department Tours
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
            Explore select Restaurant Depot departments through virtual
            walkarounds before visiting your local warehouse.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-xl bg-cream p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
            Virtual Walkthroughs
          </p>

          <h2 className="mt-3 font-display text-4xl text-ink">
            Tour Our Departments
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {TOURS.map((tour) => (
              <a
                key={tour.title}
                href={tour.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-52 bg-navy/10">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-navy">
                    {tour.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-ink/70">
                    {tour.description}
                  </p>

                  <span className="mt-5 inline-flex rounded-sm bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-widest2 text-navy">
                    Launch 360° Tour ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm italic leading-7 text-ink/60">
          Department tours are posted to provide an example of the in-store
          experience. Prices and selection will vary by branch.
        </p>
      </section>
    </main>
  );
}