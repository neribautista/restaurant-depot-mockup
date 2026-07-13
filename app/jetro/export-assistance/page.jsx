const CONTACTS = [
    {
      title: "East Coast",
      subtitle: "Florida",
      address: ["2041 NW 12th Avenue", "Miami, FL 33127"],
      phone: "(786) 364-7829",
      fax: "(305) 325-0744 or (305) 324-8375",
      email: "manager.014@jetrord.com",
    },
    {
      title: "West Coast",
      subtitle: "California",
      email: "manager.019@jetrord.com",
    },
  ];
  
  const SHIPPING_WAREHOUSE = {
    address: ["2300 E. 57th Street", "Vernon, CA 90058"],
    reception: "(323) 583-0800",
  };
  
  export default function ExportAssistancePage() {
    return (
      <main className="bg-white">
        <section className="bg-[#f37021] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">
              Jetro
            </p>
  
            <h1 className="mt-4 font-display text-5xl text-white">
              Export Assistance
            </h1>
  
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              Jetro is conveniently located for customers wishing to export goods.
              We provide groceries, frozen and refrigerated foods, produce, health
              and beauty care items, smallwares, and restaurant supplies.
            </p>
          </div>
        </section>
  
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-xl bg-cream p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-600">
              International Support
            </p>
  
            <h2 className="mt-3 font-display text-4xl text-ink">
              Jetro Export Assistance
            </h2>
  
            <div className="mt-6 max-w-4xl space-y-5 leading-8 text-ink/75">
              <p>
                Our team strives to consistently provide the very best in products
                and service to satisfy your needs.
              </p>
  
              <p>
                Office hours are Monday through Friday from 8:30 a.m. to 5:00 p.m.
                local time for each office.
              </p>
  
              <p>To learn more, call us or use the email links below.</p>
            </div>
  
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {CONTACTS.map((office) => (
                <article
                  key={office.title}
                  className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-black/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
                    {office.subtitle}
                  </p>
  
                  <h3 className="mt-3 font-display text-3xl text-navy">
                    {office.title}
                  </h3>
  
                  {office.address && (
                    <div className="mt-5 leading-7 text-ink/70">
                      {office.address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  )}
  
                  <div className="mt-6 space-y-3 border-t border-black/10 pt-6 text-sm text-ink/70">
                    {office.phone && (
                      <p>
                        <span className="font-semibold text-navy">Phone:</span>{" "}
                        {office.phone}
                      </p>
                    )}
  
                    {office.fax && (
                      <p>
                        <span className="font-semibold text-navy">Fax:</span>{" "}
                        {office.fax}
                      </p>
                    )}
  
                    <p className="break-all">
                      <span className="font-semibold text-navy">Email:</span>{" "}
                      <a
                        href={`mailto:${office.email}`}
                        className="font-semibold text-orange-600 hover:text-orange-700"
                      >
                        {office.email}
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
  
            <div className="mt-10 rounded-xl bg-navy p-8 text-white shadow-sm">
  
              <h3 className="mt-3 font-display text-3xl">
                Shipping Warehouse
              </h3>
  
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
                    Address
                  </p>
  
                  <div className="mt-3 leading-7 text-white/85">
                    {SHIPPING_WAREHOUSE.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
  
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
                    Reception
                  </p>
  
                  <p className="mt-3 text-white/85">
                    {SHIPPING_WAREHOUSE.reception}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }