import Image from "next/image";

const INFO = [
  "We offer a great selection of restaurant and catering supplies, food preparation equipment, and take-out containers, all at low, low prices.",
  "Merchandise is logically grouped and displayed to make shopping easy. We also have maps, aisle directories, and a multi-lingual staff to help customers find products quickly.",
  "No minimum purchase is required to take advantage of everyday low prices and advertised specials. We buy in volume and pass the savings along to our customers. Jetro membership is free.",
  "Each time you enter our warehouse, scan the barcode on your Jetro membership card. If you forget your membership card, you may obtain a one-day shopping pass from reception with identification.",
  "Product directories and warehouse floor plans are available in the reception area. Product lists are also posted at the end of every aisle. Jetro associates can also assist you as you shop.",
  "At Jetro, in addition to our own Red & White private label, we sell top quality national and regional brands across a broad range of product categories.",
  "Since Jetro is a wholesale supplier, most items are sold by the case. For product description, size, selling units, and price, please consult the shelf label above or below each stocked item.",
];

export default function JetroPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-white border-b border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
            Company Information
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            <Image
              src="/images/jetro-logo.png"
              alt="Jetro Cash & Carry"
              width={1000}
              height={420}
              priority
              className="mx-auto h-auto w-full object-contain"
            />
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-ink/70">
            Wholesale restaurant and catering supplies with everyday low prices,
            organized warehouse shopping, and free membership for qualifying
            businesses.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
              About Jetro
            </p>

            <h1 className="mt-3 font-display text-4xl text-ink">
              Company Information
            </h1>

            <div className="mt-8 space-y-6 leading-8 text-ink/75">
              {INFO.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* SIDE CARD */}
          <aside className="rounded-xl bg-cream p-8 shadow-sm">
            <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
              <Image
                src="/images/jetro-shopping.png"
                alt="Jetro customer shopping"
                width={500}
                height={650}
                className="h-[360px] w-full object-cover"
              />
            </div>

            <h2 className="mt-6 font-display text-2xl text-navy">
              Built for Foodservice
            </h2>

            <p className="mt-4 leading-7 text-ink/70">
              Jetro supports restaurants, caterers, and foodservice businesses
              with case quantities, aisle directories, warehouse floor plans,
              and helpful associates throughout the store.
            </p>
          </aside>
        </div>

        {/* WAREHOUSE IMAGE */}
        <div className="mt-16 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
          <Image
            src="/images/jetro-warehouse.png"
            alt="Jetro warehouse checkout area"
            width={1400}
            height={900}
            className="h-[520px] w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}