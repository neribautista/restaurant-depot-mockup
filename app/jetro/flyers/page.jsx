const REGIONAL_FLYERS = [
    {
      region: "Jersey City & Philadelphia",
      flyers: [
        {
          date: "Effective June 24 – July 9",
          pdf: "/flyers/jetro/jersey-city-philadelphia-june-24-july-9.pdf",
        },
        {
          date: "Effective July 8 – July 23",
          pdf: "/flyers/jetro/jersey-city-philadelphia-july-8-july-23.pdf",
        },
      ],
    },
    {
      region: "New York",
      flyers: [
        {
          date: "Effective June 24 – July 9",
          pdf: "/flyers/jetro/new-york-june-24-july-9.pdf",
        },
        {
          date: "Effective July 8 – July 23",
          pdf: "/flyers/jetro/new-york-july-8-july-23.pdf",
        },
      ],
    },
    {
      region: "California",
      flyers: [
        {
          date: "Effective June 24 – July 9",
          pdf: "/flyers/jetro/california-june-24-july-9.pdf",
        },
        {
          date: "Effective July 8 – July 23",
          pdf: "/flyers/jetro/california-july-8-july-23.pdf",
        },
      ],
    },
    {
      region: "Miami, FL",
      flyers: [
        {
          date: "Effective June 24 – July 9",
          pdf: "/flyers/jetro/miami-june-24-july-9.pdf",
        },
        {
          date: "Effective July 8 – July 23",
          pdf: "/flyers/jetro/miami-july-8-july-23.pdf",
        },
      ],
    },
    {
      region: "Chicago, IL",
      flyers: [
        {
          date: "Effective June 24 – July 9",
          pdf: "/flyers/jetro/chicago-june-24-july-9.pdf",
        },
        {
          date: "Effective July 8 – July 23",
          pdf: "/flyers/jetro/chicago-july-8-july-23.pdf",
        },
      ],
    },
  ];
  
  export default function JetroFlyersPage() {
    return (
      <main className="bg-white">
        <section className="bg-[#f37021] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">
              Jetro
            </p>
  
            <h1 className="mt-4 font-display text-5xl text-white">
              Regional Flyers
            </h1>
  
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              View current Jetro regional flyers and promotional specials by
              location.
            </p>
          </div>
        </section>
  
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-xl bg-cream p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-600">
              View Regional Flyers
            </p>
  
            <h2 className="mt-3 font-display text-4xl text-ink">
              Select Your Region
            </h2>
  
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {REGIONAL_FLYERS.map((region) => (
                <article
                  key={region.region}
                  className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="font-display text-2xl text-navy">
                    {region.region}
                  </h3>
  
                  <div className="mt-6 space-y-3">
                    {region.flyers.map((flyer) => (
                      <a
                        key={flyer.date}
                        href={flyer.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-black/10 bg-cream px-5 py-4 transition hover:-translate-y-0.5 hover:border-orange-500 hover:bg-white hover:shadow-md"
                      >
                        <p className="text-xs uppercase tracking-widest text-orange-600">
                          Flyer
                        </p>
  
                        <p className="mt-1 font-semibold text-navy">
                          {flyer.date}
                        </p>
  
                        <p className="mt-2 text-sm text-ink/60">
                          Open PDF →
                        </p>
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }