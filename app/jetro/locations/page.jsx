const LOCATIONS = [
    {
      name: "New York City",
      address: "566 Hamilton Avenue",
      cityState: "Brooklyn, NY 11232",
      reception: "(718) 768-0555",
      fax: "(718) 768-0009",
      email: "manager.010@jetrord.com",
    },
    {
      name: "Canarsie",
      address: "101-10 Foster Avenue",
      cityState: "Brooklyn, NY 11236",
      reception: "(718) 649-8000",
      fax: "(718) 927-3283",
      email: "manager.012@jetrord.com",
    },
    {
      name: "Oak Point",
      address: "100 Oak Point Ave.",
      cityState: "Bronx, NY 10474",
      reception: "(718) 665-3910",
      fax: "(718) 585-9210",
      email: "manager.818@jetrord.com",
    },
    {
      name: "College Point",
      address: "15-06 132nd Street",
      cityState: "Flushing, NY 11356",
      reception: "(718) 762-1000",
      fax: "(718) 461-5894",
      email: "manager.021@jetrord.com",
    },
    {
      name: "Jersey City",
      address: "1 Amity Road",
      cityState: "Jersey City, NJ 07304",
      reception: "(201) 434-4334",
      fax: "(201) 434-8912",
      email: "manager.011@jetrord.com",
    },
    {
      name: "Illinois",
      address: "1030 W. Division",
      cityState: "Chicago, IL 60622",
      reception: null,
      fax: "(312) 255-0913",
      email: "manager.042@jetrord.com",
    },
    {
      name: "Long Beach",
      address: "2300 68th Street",
      cityState: "Long Beach, CA 90805",
      reception: "(562) 634-6771",
      fax: "(562) 634-1177",
      email: "manager.022@jetrord.com",
    },
    {
      name: "Vernon",
      address: "2300 57th Street",
      cityState: "Vernon, CA 90058",
      reception: "(323) 583-0800",
      fax: "(323) 583-0925",
      email: "manager.019@jetrord.com",
    },
    {
      name: "Miami",
      address: "2041 N. W. 12th Avenue",
      cityState: "Miami, FL 33127",
      reception: "(305) 324-4414",
      fax: "(305) 325-0776",
      email: "manager.014@jetrord.com",
    },
    {
      name: "Jefferson",
      address: "5333 West Jefferson",
      cityState: "Los Angeles, CA 90016-3713",
      reception: "(323) 964-1200",
      fax: "(323) 964-1211",
      email: "manager.043@jetrord.com",
    },
    {
      name: "Philadelphia",
      address: "700 Pattison Avenue",
      cityState: "Philadelphia, PA 19148",
      reception: "(215) 334-2100",
      fax: "(215) 334-3601",
      email: "manager.016@jetrord.com",
    },
    {
      name: "Baltimore",
      address: "3405 Annapolis Road",
      cityState: "Baltimore, MD 21227",
      reception: "(410) 354-1500",
      fax: "(410) 354-5371",
      email: "manager.025@jetrord.com",
    },
  ];
  
  function getMapUrl(location) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${location.address}, ${location.cityState}`
    )}`;
  }
  
  export default function JetroLocationsPage() {
    return (
      <main className="bg-white">
        <section className="bg-[#f37021] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">
              Jetro
            </p>
  
            <h1 className="mt-4 font-display text-5xl text-white">
              Store Locations
            </h1>
  
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              Find Jetro store contact information, addresses, phone numbers,
              fax numbers, and map directions.
            </p>
          </div>
        </section>
  
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-xl bg-cream p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-600">
              Directory
            </p>
  
            <p className="mt-4 max-w-3xl leading-8 text-ink/70">
              Select a location below to view directions in Google Maps.
            </p>
  
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {LOCATIONS.map((location) => (
                <article
                  key={location.name}
                  className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="font-display text-2xl text-navy">
                    {location.name}
                  </h3>
  
                  <div className="mt-4 text-sm leading-7 text-ink/70">
                    <p>{location.address}</p>
                    <p>{location.cityState}</p>
                  </div>
  
                  <div className="mt-5 space-y-2 border-t border-black/10 pt-5 text-sm text-ink/70">
                    {location.reception && (
                      <p>
                        <span className="font-semibold text-navy">
                          Reception:
                        </span>{" "}
                        {location.reception}
                      </p>
                    )}
  
                    <p>
                      <span className="font-semibold text-navy">Fax:</span>{" "}
                      {location.fax}
                    </p>
  
                    <p className="break-all">
                      <span className="font-semibold text-navy">Email:</span>{" "}
                      {location.email}
                    </p>
                  </div>
  
                  <a
                    href={getMapUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-sm bg-[#f37021] px-5 py-3 text-xs font-semibold uppercase tracking-widest2 text-white transition hover:bg-orange-600"
                  >
                    View Map
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }