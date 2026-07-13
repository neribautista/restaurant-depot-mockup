"use client";

import { useState } from "react";
import { saveSubscriber } from "@/lib/mockMarketing";

const BRANCHES = [
  "Austin, TX",
  "Birmingham, AL",
  "Mesa, AZ",
  "Phoenix, AZ",
  "Tucson, AZ",
];

export default function TextPermissionPage() {
  const [form, setForm] = useState({
    membershipNumber: "",
    branch: "",
    businessName: "",
    contactName: "",
    mobilePhone: "",
    email: "",
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.agreed) {
      alert("Please agree to the Terms & Conditions before submitting.");
      return;
    }

    saveSubscriber(form);
    setSubmitted(true);

    console.log("Saved text subscriber:", form);
  };

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Resources
          </p>

          <h1 className="mt-4 font-display text-5xl text-white">
            Text Message Alerts
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
            Stay informed with daily specials, warehouse promotions, new
            arrivals, and important Restaurant Depot updates delivered directly
            to your phone.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-cream p-8 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
              Text Permission
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink">
              Join Restaurant Depot Text Alerts
            </h2>

            <p className="mt-4 leading-7 text-ink/70">
              Sign up to receive daily specials, warehouse news, and important
              alerts.
            </p>

            <div className="mt-8 space-y-5">
              <input
                name="membershipNumber"
                value={form.membershipNumber}
                onChange={handleChange}
                required
                placeholder="Membership number *"
                className="w-full rounded-md border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />

              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="">Preferred branch *</option>
                {BRANCHES.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>

              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
                placeholder="Business name *"
                className="w-full rounded-md border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />

              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                required
                placeholder="Contact name *"
                className="w-full rounded-md border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />

              <input
                name="mobilePhone"
                value={form.mobilePhone}
                onChange={handleChange}
                required
                placeholder="Mobile phone number *"
                type="tel"
                className="w-full rounded-md border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email address *"
                type="email"
                className="w-full rounded-md border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />

              <label className="flex gap-3 text-sm leading-6 text-ink/75">
                <input
                  name="agreed"
                  type="checkbox"
                  checked={form.agreed}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4"
                />
                I have read and agreed with the Terms & Conditions below.
              </label>

              <button
                type="submit"
                className="w-full rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-navy transition hover:bg-gold-light"
              >
                Submit
              </button>

              {submitted && (
                <div className="rounded-md bg-white p-4 text-sm font-semibold text-navy ring-1 ring-gold/40">
                  Thank you. Your text message permission form has been
                  submitted.
                </div>
              )}

              <p className="text-xs leading-6 text-ink/50">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </div>
          </form>

          {/* TERMS */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
              Terms & Conditions
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink">
              Text Messages Containing Special Offers, Advertisements, or
              Telemarketing
            </h2>

            <div className="mt-8 space-y-6 rounded-xl bg-white p-8 leading-8 text-ink/70 shadow-sm ring-1 ring-black/5">
              <p>
                By submitting this form, I am indicating my wish to receive
                special offers and other advertisements or telemarketing
                messages delivered via text sent by or on behalf of Jetro
                Holdings, LLC and its divisions and affiliates, including Jetro
                Cash & Carry, Restaurant Depot, and The RDStore.com
                collectively, “Jetro,” at the mobile phone number provided.
              </p>

              <p>
                I authorize Jetro, or third-party marketing partners acting on
                Jetro’s behalf, to deliver text messages containing
                advertisements or telemarketing to the mobile phone number
                provided using an automatic telephone dialing system or other
                automated methods.
              </p>

              <p>
                I represent that I am the owner or authorized user of the mobile
                phone number provided and am authorized to provide this consent.
              </p>

              <p>
                I understand that this consent is voluntary and is not a
                condition to membership or to purchase goods or services from
                Jetro.
              </p>

              <p>
                To revoke consent, text “STOP” in response to a text message
                delivered by or on behalf of Jetro within two days of receipt, or
                email communications@jetrord.com with the subject line
                “Revocation of Consent for Mobile Phone Marketing.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}