import PageHero from "@/components/PageHero";

const cards = [
  {
    title: "Company History",
    body: "We have been supplying independent food businesses with quality products from large cash and carry warehouse stores since 1990.",
  },
  {
    title: "Mission Statement",
    body: "Restaurant Depot is a Wholesale Cash & Carry Foodservice Supplier. Our mission is to be your one-stop shop for Savings, Selection and Service, Seven Days a Week.",
  },
  {
    title: "Our Approach",
    body: "We became the leading low-cost alternative to other foodservice suppliers by eliminating the overhead of a traditional distributor, focusing on the needs of independent foodservice operators and offering free membership.",
  },
];

export default function CompanyInformationPage() {
  return (
    <div className="text-ink">
      <PageHero
        title="Company Information"
        bgImage="/images/header/company-info.jpg"
        crumbs={[
          { label: "Restaurant Depot", href: "/" },
          { label: "About", href: "/about" },
          { label: "Company Information" },
        ]}
      />

      {/* CARD GRID */}
      <section className="relative -mt-1 bg-navy">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg text-navy">{c.title}</h3>
              <p className="mt-3 text-sm text-ink/70">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FULL DETAIL */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-5 text-sm leading-relaxed text-ink/70">
            <p>
              Restaurant Depot is a Wholesale Cash &amp; Carry Foodservice
              Supplier. Our mission is to be your one-stop shop for Savings,
              Selection and Service, Seven Days a Week.
            </p>
            <p>
              We have been supplying independent food businesses with quality
              products from large cash and carry warehouse stores since 1990. We
              became the leading low-cost alternative to other foodservice
              suppliers by eliminating the overhead of a traditional
              distributor, focusing on the needs of independent foodservice
              operators and offering free membership.
            </p>
            <p>
              At Restaurant Depot, one-stop shopping simplifies the process of
              buying food, equipment and supplies. There are no minimum purchase
              requirements. Whether you buy a few bakery supplies or enough food
              and tableware to cater a party for thousands, shopping at
              Restaurant Depot can save you time and money. And at Restaurant
              Depot, customers have the option to purchase many items by the
              piece, by the case or in five or more case quantities, saving on
              the unit costs accordingly.
            </p>
            <p>
              Because we firmly believe that Good Business Begins with Food
              Safety®, Restaurant Depot offers KEEP IT KOOL SOLUTIONS to
              maintain optimal product freshness and quality for all perishable
              products in transport.
            </p>
          </div>

          <h3 className="mt-10 font-display text-lg text-navy">
            Learn More About Restaurant Depot:
          </h3>

          <div className="mt-4 aspect-video w-full overflow-hidden rounded-sm bg-navy">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/X4qwuBdYcj8"
              title="Restaurant Depot Information Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}