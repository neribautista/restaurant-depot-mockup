import Link from "next/link";
import Image from "next/image";

const VIDEO_URL = "https://vimeo.com/341653417?fl=ip&fe=ec";
const APP_URL =
  "https://apps.apple.com/us/app/restaurant-depot-mobile/id1532791954";

const FAQS = [
  {
    question: "How do I place an order?",
    answer:
      "Start by logging into the site. From there, you can create a list of items or add products directly to your cart. Once you have everything you need, submit your order and choose a pickup or delivery time during checkout. You will receive an email confirmation after placing your order.",
  },
  {
    question: "When can I get a delivery or pick up my order?",
    answer:
      "You can usually get an order the next day, depending on available pickup or delivery slots. During checkout, you will see the available dates and times for your order.",
  },
  {
    question: "How much do the services cost?",
    answer:
      "Online prices include pickup or delivery service. These prices are not the same as in-store warehouse prices, but they are designed to remain competitive. Additional delivery fees may apply in some locations.",
  },
  {
    question: "Can I add an item after I place my order?",
    answer:
      "In most cases, yes. Find your order confirmation email and hit Reply All. This connects you with the team working on your order, and they may be able to add the item.",
  },
  {
    question: "Do you deliver to my area?",
    answer:
      "Delivery is expanding and new ZIP codes are added regularly. If delivery is not currently available in your area, email communications@jetrord.com for an update.",
  },
];

export default function OnlineOrderingPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-visible bg-[#143778] py-10">
        <div className="relative mx-auto grid h-[390px] max-w-6xl items-center px-6 lg:grid-cols-[1fr_390px]">
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              Resources
            </p>

            <h1 className="mt-4 font-display leading-none">
              <span className="block text-6xl text-white lg:text-7xl">
                Online
              </span>
              <span className="block text-6xl text-gold lg:text-7xl">
                Ordering
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              You’ll always save the most when you shop in one of our
              warehouses. But when things get hectic, Restaurant Depot offers
              convenient online pickup and delivery options for valued
              customers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-navy transition hover:bg-gold-light"
              >
                Start Ordering
              </Link>

              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-white/40 px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-navy"
              >
                Watch Demo
              </a>
            </div>
          </div>

          <div className="relative hidden h-full lg:block">
            <Image
              src="/images/online-ordering-phone-mockup.png"
              alt="Restaurant Depot mobile app order history"
              width={590}
              height={1072}
              priority
              className="absolute bottom-[-150px] right-0 z-20 h-[540px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="relative rounded-xl bg-cream p-10 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
            Ready to Order?
          </p>

          <h2 className="mt-3 font-display text-4xl text-ink">
            Start Your Online Order Here
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-7 shadow-sm ring-1 ring-black/5">
              <h3 className="font-display text-2xl text-navy">Pick-Up</h3>
              <p className="mt-4 leading-8 text-ink/70">
                Place your order online, choose your date and time for pickup,
                and we’ll have your order waiting when you arrive.
              </p>
            </div>

            <div className="rounded-lg bg-white p-7 shadow-sm ring-1 ring-black/5">
              <h3 className="font-display text-2xl text-navy">Delivery</h3>
              <p className="mt-4 leading-8 text-ink/70">
                We’ve teamed up with a delivery partner who will pick the items
                in your online order and deliver them directly to your business.
                Delivery is not available in all locations.
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="mt-10 inline-flex rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-navy transition hover:bg-gold-light"
          >
            Click Here to Place an Order
          </Link>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[420px_1fr]">
          <div>
            <h2 className="font-display text-3xl text-ink">
              Need Website Assistance?
            </h2>

            <div className="mt-6 space-y-6">
              <div className="rounded-lg border border-cream-dark bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-widest text-ink/50">
                  Email
                </p>
                <p className="mt-2 text-lg font-semibold text-navy">
                  communications@jetrord.com
                </p>
              </div>

              <div className="rounded-lg border border-cream-dark bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-widest text-ink/50">
                  Customer Service
                </p>
                <p className="mt-2 text-lg font-semibold text-navy">
                  (929) 955-4789
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  Español: (929) 955-4865
                </p>
              </div>

              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full justify-center rounded-sm bg-navy px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-white transition hover:bg-navy/90"
              >
                Watch Online Ordering Video
              </a>

              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src="/images/download-app.png"
                  alt="Download Restaurant Depot App"
                  width={1200}
                  height={700}
                  className="h-[220px] w-full object-cover"
                />
              </a>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src="/images/app-preview.png"
                  alt="Download Restaurant Depot App"
                  width={1200}
                  height={700}
                  className="h-[440px] w-full object-cover"
                />
              </a>
              
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-ink">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-5">
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="font-display text-xl text-navy">
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-8 text-ink/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="rounded-xl border-l-4 border-gold bg-cream p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                ⚠️
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
                  Important Information
                </p>
                <h2 className="mt-1 font-display text-2xl text-navy">
                  Delivery Disclaimer
                </h2>
              </div>
            </div>

            <p className="mt-6 leading-8 text-ink/70">
              Items in your order are sold directly to you through your
              Restaurant Depot membership account. Orders marked for delivery
              are fulfilled by an independent third-party delivery service.
            </p>

            <p className="mt-4 leading-8 text-ink/70">
              Restaurant Depot does not represent or warrant that the delivery
              service will meet your expectations or follow any specific
              delivery instructions. Any dispute, delay, injury, damage, or loss
              related to the delivery service—including the time, place, or
              manner of delivery—is solely between you and the delivery
              provider.
            </p>

            <p className="mt-4 leading-8 text-ink/70">
              By placing an order for delivery, you acknowledge and agree to
              these terms and the associated limitations of liability.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}