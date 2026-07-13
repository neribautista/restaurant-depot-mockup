import PageHero from "@/components/PageHero";

const features = [
  { title: "Low Prices", body: "Enjoy everyday low prices and monthly specials for extra big savings." },
  { title: "Huge Selection", body: "We stock an enormous selection of brand names and our own quality brands." },
  { title: "One-Stop Shopping", body: "Don't just save money, save time. Our inventory includes everything a foodservice operator needs so you don't have to make several stops to stock up on food and supplies." },
  { title: "No Minimum Purchase Required", body: "You do not have to buy in bulk to save at Restaurant Depot. Savings are guaranteed whether you buy one or a hundred items." },
  { title: "Shopping Made Quick and Easy", body: "You won't waste time searching for products or calculating costs. Items are grouped and merchandised by category, and prices are clearly displayed." },
  { title: "Open Every Day", body: "Never get caught short on inventory. We're open convenient hours 7 days a week, closing only on New Year's Day, Easter Sunday, Memorial Day, Independence Day, Labor Day, Thanksgiving Day, and Christmas Day." },
  { title: "Memberships Available", body: "Free membership cards are issued at our warehouse stores to those who own or manage a business, including restaurants, coffee shops, bars, pizzerias, night clubs, caterers, delis, foodservice distributors, and non-profit organizations." },
  { title: "Advertised Specials", body: "We keep our members informed about special pricing offers and events by direct mail and by email." },
  { title: "Value-Added Services", body: "Members are also eligible for exclusive discounts on products and services provided by approved vendors." },
];

export default function AboutPage() {
  const [cardFeatures, listFeatures] = [features.slice(0, 3), features.slice(3)];

  return (
    <div className="text-ink">
      <PageHero
        title="About"
        bgImage="/images/header/about-page.png"
        crumbs={[
          { label: "Restaurant Depot", href: "/" },
          { label: "About", href: "/about" },
          { label: "About Us" },
        ]}
      />

      {/* CARD GRID — first 3 features */}
      <section className="relative -mt-1 bg-navy">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-3">
          {cardFeatures.map((f) => (
            <div key={f.title} className="bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg text-navy">{f.title}</h3>
              <p className="mt-3 text-sm text-ink/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE + INTRO */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 md:grid-cols-2">
          <div className="overflow-hidden rounded-sm">
            <img
              src="/images/warehouse-floor.png"
              alt="Restaurant Depot warehouse interior"
              className="w-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl">
              <span className="text-gold-deep">Restaurant Depot's</span>{" "}
              Free Membership Has Its Rewards
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              From everyday low prices to a huge selection of brand names,
              members get everything a foodservice operator needs — with no
              minimum purchase and no hidden gates between browsing and
              buying.
            </p>
          </div>
        </div>
      </section>

      {/* REMAINING FEATURES — full list */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {listFeatures.map((f) => (
              <div key={f.title} className="border-l-2 border-gold pl-5">
                <h3 className="font-semibold text-navy">{f.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}