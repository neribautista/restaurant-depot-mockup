const STORE_FLOW = [
    {
      title: "Scan Membership Card",
      copy: "Each time you enter the warehouse, scan the barcode on your Jetro membership card. If you forget it, you may obtain a one-day shopping pass at reception with identification.",
    },
    {
      title: "Find Products Easily",
      copy: "Product directories and warehouse floor plans are available in the reception area. Product lists are posted at the end of every aisle, and Jetro associates wearing name badges can assist you.",
    },
    {
      title: "Shop Wholesale Cases",
      copy: "Most items are sold by the case. For product description, size, selling units, and price, check the shelf label above or below each stocked item.",
    },
    {
      title: "Checkout Verification",
      copy: "At checkout, one associate rings up your merchandise while another counts each item. A supervisor verifies that cart contents match the invoice.",
    },
    {
      title: "Receipt Review",
      copy: "After payment, you will receive your invoice and receipt. Please show your receipt to a Jetro associate near the exit before leaving.",
    },
  ];
  
  const SERVICE_SECTIONS = [
    {
      title: "Brands & Product Selection",
      copy: "At Jetro, in addition to our own Red & White private label, we sell top quality national and regional brands in a broad range of product categories.",
    },
    {
      title: "Health & Beauty Department",
      copy: "Health and beauty care products, cigarettes, and select items sold in less than case quantities are located in a separate department and secured until final checkout.",
    },
    {
      title: "Invoice Accuracy",
      copy: "To ensure customers receive the merchandise they are invoiced for, selected purchases may be checked item by item against the invoice. We appreciate your cooperation and patience.",
    },
    {
      title: "Refunds & Exchanges",
      copy: "Nonperishable grocery or foodservice merchandise may be returned within 30 days. Perishable merchandise, electrical appliances, and equipment may be returned with receipt up to 72 hours after purchase. Items must be in original packaging and full cases.",
    },
    {
      title: "Paying for Purchases",
      copy: "Jetro accepts cash, approved checks with identification, debit cards, and major credit cards including MasterCard, Visa, American Express, and Discover.",
    },
    {
      title: "Specially Priced Merchandise",
      copy: "Look for advertised specials, manager’s specials, and Value-Plus Discounts throughout the warehouse.",
    },
    {
      title: "For Your Protection",
      copy: "Report lost or stolen membership cards promptly. Children under 14 must be supervised. Please dress appropriately, do not smoke inside the warehouse, and inspect purchases before leaving.",
    },
    {
      title: "Customer Service",
      copy: "Customer Service Managers and department managers welcome questions, suggestions, and comments. Associates wearing name badges can assist you in locating products.",
    },
    {
      title: "Tell Us What You Think",
      copy: "Comment cards are available near the exit. Whether you have a concern or compliment, fill one out and mail it back so the team can respond.",
    },
  ];
  
  export default function JetroServicesPage() {
    return (
      <main className="bg-white">
        <section className="bg-[#f37021] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">
              Jetro
            </p>
  
            <h1 className="mt-4 font-display text-5xl text-white">
              Our Services & Store
            </h1>
  
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              Learn how to shop Jetro efficiently, from entering the warehouse to
              checkout, invoice verification, returns, and customer service.
            </p>
          </div>
        </section>
  
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-xl bg-cream p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-600">
              Shopping Process
            </p>
  
            <h2 className="mt-3 font-display text-4xl text-ink">
              How Shopping Works
            </h2>
  
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {STORE_FLOW.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f37021] font-bold text-white">
                    {index + 1}
                  </div>
  
                  <h3 className="mt-5 font-display text-xl text-navy">
                    {step.title}
                  </h3>
  
                  <p className="mt-3 text-sm leading-7 text-ink/70">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
  
          <section className="mt-16">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-600">
              Store Information
            </p>
  
            <h2 className="mt-3 font-display text-4xl text-ink">
              Policies, Services & Customer Support
            </h2>
  
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {SERVICE_SECTIONS.map((section) => (
                <article
                  key={section.title}
                  className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="font-display text-2xl text-navy">
                    {section.title}
                  </h3>
  
                  <p className="mt-4 leading-8 text-ink/70">{section.copy}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    );
  }