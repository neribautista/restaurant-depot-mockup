"use client";

import { useState } from "react";
import Link from "next/link";

const states = [
  "AL",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "IA",
  "IL",
  "IN",
  "KY",
  "LA",
  "MA",
  "MD",
  "MI",
  "MN",
  "MO",
  "NC",
  "NE",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "TN",
  "TX",
  "UT",
  "VA",
  "WA",
  "WI",
];

const branches = [
  "Birmingham, AL, #420",
  "Mesa, AZ, #37",
  "Phoenix, AZ, #38",
  "Tucson, AZ, #704",
  "Anaheim, CA, #57",
  "Bakersfield, CA, #611",
  "Colton, CA, #601",
  "Concord, CA, #664",
  "Fresno, CA, #659",
  "Huntington Beach, CA, #628",
  "Jefferson, CA, #43",
  "Long Beach, CA, #22",
  "Miramar, CA, #30",
  "Oakland, CA, #650",
  "Oxnard, CA, #612",
  "Pasadena, CA, #54",
  "Rohnert Park, CA, #668",
  "Roseville, CA, #663",
  "Sacramento, CA, #36",
  "San Diego, CA, #603",
  "San Francisco, CA, #45",
  "San Jose, CA, #62",
  "San Marcos, CA, #610",
  "Stockton, CA, #665",
  "Torrance, CA, #53",
  "Van Nuys, CA, #56",
  "Vernon, CA, #19",
  "Walnut, CA, #602",
  "Washington Blvd, CA, #41",
  "Colorado Springs, CO, #667",
  "Denver, CO, #652",
  "Greenwood Village, CO, #653",
  "Broomfield, CO, #669",
  "Hartford, CT, #882",
  "Orange, CT, #71",
  "Waterbury, CT, #820",
  "Wilmington, DE, #810",
  "Beachline West, FL, #473",
  "Boynton Beach, FL, #402",
  "Davie, FL, #458",
  "Daytona Beach, FL, #403",
  "Fort Myers, FL, #422",
  "Gainesville, FL, #408",
  "Jacksonville, FL, #411",
  "Kissimmee, FL, #426",
  "Largo, FL, #418",
  "Medley, FL, #76",
  "Miami, FL, #14",
  "Ocala, FL, #409",
  "Orlando, FL, #86",
  "Pompano Beach, FL, #23",
  "Riviera Beach, FL, #417",
  "Sarasota, FL, #425",
  "Tampa, FL, #413",
  "Buford, GA, #461",
  "Ellsworth, GA, #66",
  "Marietta, GA, #421",
  "Morrow, GA, #428",
  "Norcross, GA, #65",
  "Urbandale, IA, #438",
  "Alsip, IL, #47",
  "Des Plaines, IL, #48",
  "Goose Island, IL, #42",
  "Gurnee, IL, #462",
  "Lombard, IL, #451",
  "Pulaski, IL, #454",
  "Griffith, IN, #435",
  "Indianapolis, IN, #430",
  "Louisville, KY, #431",
  "Baton Rouge, LA, #457",
  "New Orleans, LA, #453",
  "Andover, MA, #814",
  "Avon, MA, #811",
  "Chicopee, MA, #815",
  "Everett, MA, #834",
  "Milford, MA, #822",
  "Needham, MA, #50",
  "New Bedford, MA, #830",
  "Baltimore, MD, #25",
  "Capitol Heights, MD, #85",
  "Frederick, MD, #836",
  "White Marsh, MD, #835",
  "Dearborn, MI, #72",
  "Troy, MI, #84",
  "Ypsilanti, MI, #463",
  "Brooklyn Center, MN, #455",
  "St. Paul, MN, #78",
  "Kansas City, MO, #450",
  "St. Louis, MO, #79",
  "Cary, NC, #416",
  "Charlotte, NC, #412",
  "Greensboro, NC, #401",
  "Omaha, NE, #460",
  "Egg Harbor, NJ, #826",
  "Jersey City, NJ, #11",
  "Neptune, NJ, #807",
  "Pennsauken, NJ, #852",
  "Pine Brook, NJ, #94",
  "Secaucus, NJ, #73",
  "South Hackensack, NJ, #895",
  "South Plainfield, NJ, #874",
  "Union, NJ, #832",
  "Albuquerque, NM, #714",
  "Las Vegas, NV, #39",
  "Albany, NY, #802",
  "Blauvelt, NY, #801",
  "Bohemia, NY, #44",
  "Brewster, NY, #821",
  "Buffalo, NY, #452",
  "Canarsie, NY, #12",
  "College Point, NY, #21",
  "Farmingdale, NY, #803",
  "Garden City, NY, #67",
  "Hamilton Ave Brooklyn, NY, #10",
  "Maspeth, NY, #63",
  "Mt. Vernon, NY, #61",
  "Newburgh, NY, #819",
  "Port Chester, NY, #806",
  "Riverhead, NY, #880",
  "Rochester, NY, #456",
  "Staten Island, NY, #824",
  "Syracuse, NY, #881",
  "The Bronx, NY, #818",
  "Akron, OH, #433",
  "Cincinnati, OH, #83",
  "Cleveland, OH, #59",
  "Columbus, OH, #64",
  "Dayton, OH, #434",
  "Toledo, OH, #437",
  "Oklahoma City, OK, #707",
  "Tulsa, OK, #715",
  "Clackamas, OR, #661",
  "Portland, OR, #651",
  "Bethlehem, PA, #812",
  "Harrisburg, PA, #816",
  "Langhorne, PA, #808",
  "Philadelphia, PA, #16",
  "Pittsburgh, PA, #449",
  "Reading, PA, #827",
  "Roberts Ave Manayunk, PA, #804",
  "Royersford, PA, #828",
  "Wilkes-Barre, PA, #823",
  "Cranston, RI, #60",
  "Charleston, SC, #427",
  "Mauldin, SC, #424",
  "Memphis, TN, #419",
  "Nashville, TN, #415",
  "Austin South, TX, #716",
  "Austin, TX, #701",
  "Dallas, TX, #68",
  "El Paso, TX, #706",
  "Fort Worth, TX, #703",
  "Houston Southwest, TX, #702",
  "Houston, TX, #69",
  "Lewisville, TX, #711",
  "McAllen, TX, #713",
  "Pasadena, TX, #709",
  "Richardson, TX, #75",
  "San Antonio Northeast, TX, #717",
  "San Antonio, TX, #70",
  "Tomball, TX, #708",
  "Salt Lake City, UT, #660",
  "Alexandria, VA, #855",
  "Chantilly, VA, #817",
  "Richmond, VA, #809",
  "Virginia Beach, VA, #805",
  "Fife, WA, #658",
  "Seattle, WA, #506",
  "Woodinville, WA, #655",
  "Madison, WI, #469",
  "Milwaukee, WI, #446",
];

const regionalOffices = [
  {
    region: "New England, Northeast & Mid-Atlantic",
    address: "13311 20th Ave",
    city: "College Point, NY 11356",
    phone: "(718) 939-6400",
  },
  {
    region: "Texas",
    address: "1300 N Glenville Dr",
    city: "Richardson, TX 75081",
    phone: "(972) 231-9848",
  },
  {
    region: "Midwest & Southeast",
    address: "1030 W Division St",
    city: "Chicago, IL 60642",
    phone: "(312) 255-9800",
  },
  {
    region: "California, Southwest & Northwest",
    address: "1265 N Kraemer Blvd",
    city: "Anaheim, CA 92806",
    phone: "(714) 666-8211",
  },
];

const initialForm = {
  member: "",
  companyName: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  foodService: "",
  branch: "",
  reason: "",
  message: "",
};

const inputStyles =
  "mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-gold focus:ring-4 focus:ring-gold/10";

const labelStyles =
  "block text-sm font-semibold text-charcoal";

export default function ContactUsPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Connect this section to your API, Formspree, Resend,
    // SendGrid, or another form service.
    console.log("Contact form submission:", formData);

    setSubmitted(true);
    setFormData(initialForm);
  }

  return (
    <main className="bg-cream text-charcoal">
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,154,66,0.22),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-gold-light">
            Customer Support
          </p>

          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            How can we help?
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-cream/70 sm:text-lg">
            Contact our team for assistance with membership, branch
            information, website access, products, or general questions.
          </p>
        </div>
      </section>

      {/* QUICK CONTACT BAR */}
      <section className="border-b border-charcoal/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-charcoal/10 sm:grid-cols-3">
          <a
            href="tel:7187628700"
            className="group bg-white px-6 py-6 transition hover:bg-gold/5"
          >
            <span className="block text-xs font-semibold uppercase tracking-widest text-charcoal/50">
              Corporate Office
            </span>
            <span className="mt-2 block font-display text-lg font-semibold text-charcoal group-hover:text-gold-dark">
              (718) 762-8700
            </span>
          </a>

          <a
            href="mailto:communications@jetrord.com"
            className="group bg-white px-6 py-6 transition hover:bg-gold/5"
          >
            <span className="block text-xs font-semibold uppercase tracking-widest text-charcoal/50">
              Website Assistance
            </span>
            <span className="mt-2 block break-all font-display text-lg font-semibold text-charcoal group-hover:text-gold-dark">
              communications@jetrord.com
            </span>
          </a>

          <Link
            href="/locations"
            className="group bg-white px-6 py-6 transition hover:bg-gold/5"
          >
            <span className="block text-xs font-semibold uppercase tracking-widest text-charcoal/50">
              Find Your Branch
            </span>
            <span className="mt-2 block font-display text-lg font-semibold text-charcoal group-hover:text-gold-dark">
              View all locations →
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.4fr] lg:py-24">
        {/* CONTACT INFORMATION */}
        <aside className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-dark">
              Contact Information
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold text-charcoal">
              Offices and member assistance
            </h2>

            <p className="mt-4 leading-7 text-charcoal/65">
              Select the contact method that best matches your question.
              For location-specific questions, choose your preferred branch
              in the inquiry form.
            </p>
          </div>

          {/* HEADQUARTERS */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-dark">
              Corporate Headquarters
            </span>

            <address className="mt-5 not-italic">
              <p className="font-display text-xl font-semibold">
                Restaurant Depot
              </p>

              <p className="mt-3 leading-7 text-charcoal/65">
                1710 Whitestone Expressway
                <br />
                Whitestone, NY 11357
              </p>

              <a
                href="tel:7187628700"
                className="mt-4 inline-block font-semibold text-gold-dark transition hover:text-charcoal"
              >
                (718) 762-8700
              </a>
            </address>
          </div>

          {/* WEBSITE ASSISTANCE */}
          <div className="rounded-2xl bg-charcoal p-6 text-white shadow-lg">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
              For Members
            </p>

            <h3 className="mt-3 font-display text-2xl font-semibold">
              Website assistance
            </h3>

            <p className="mt-3 text-sm leading-6 text-cream/65">
              Having trouble accessing your member account or using the
              website? Contact the member support team.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href="mailto:communications@jetrord.com"
                className="block break-all font-semibold text-gold-light transition hover:text-white"
              >
                communications@jetrord.com
              </a>

              <a
                href="tel:9299554789"
                className="block text-cream/80 transition hover:text-white"
              >
                (929) 955-4789
              </a>

              <a
                href="tel:9299554865"
                className="block text-cream/80 transition hover:text-white"
              >
                (929) 955-4865
              </a>
            </div>
          </div>

          {/* REGIONAL OFFICES */}
          <div>
            <h3 className="font-display text-2xl font-semibold">
              Regional offices
            </h3>

            <div className="mt-5 space-y-4">
              {regionalOffices.map((office) => (
                <div
                  key={office.region}
                  className="rounded-2xl border border-charcoal/10 bg-white p-5"
                >
                  <h4 className="font-semibold text-charcoal">
                    {office.region}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-charcoal/60">
                    {office.address}
                    <br />
                    {office.city}
                  </p>

                  <a
                    href={`tel:${office.phone.replace(/\D/g, "")}`}
                    className="mt-3 inline-block text-sm font-semibold text-gold-dark transition hover:text-charcoal"
                  >
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CONTACT FORM */}
        <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8 lg:p-10">
          <div className="border-b border-charcoal/10 pb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-dark">
              Send an Inquiry
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold">
              Contact our team
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal/60">
              Complete the form below and provide as much information as
              possible. Fields marked with an asterisk are required.
            </p>
          </div>

          {submitted && (
            <div
              role="status"
              className="mt-7 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm leading-6 text-green-800"
            >
              Thank you. Your message has been recorded. Connect the form to
              your email service or API route to deliver submissions.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-9">
            {/* MEMBERSHIP */}
            <fieldset>
              <legend className="font-display text-xl font-semibold">
                Membership information
              </legend>

              <div className="mt-5">
                <p className={labelStyles}>Are you an RD Member? *</p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                        formData.member === option
                          ? "border-gold bg-gold/10 text-gold-dark"
                          : "border-charcoal/15 bg-white text-charcoal/70 hover:border-gold/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="member"
                        value={option}
                        checked={formData.member === option}
                        onChange={handleChange}
                        required
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>

            {/* BUSINESS AND PERSONAL INFORMATION */}
            <fieldset className="border-t border-charcoal/10 pt-8">
              <legend className="font-display text-xl font-semibold">
                Business and contact details
              </legend>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="companyName" className={labelStyles}>
                    Company Name *
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    autoComplete="organization"
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="firstName" className={labelStyles}>
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={labelStyles}>
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelStyles}>
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    placeholder="(555) 555-5555"
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelStyles}>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="name@company.com"
                    className={inputStyles}
                  />
                </div>
              </div>
            </fieldset>

            {/* ADDRESS */}
            <fieldset className="border-t border-charcoal/10 pt-8">
              <legend className="font-display text-xl font-semibold">
                Business address
              </legend>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address1" className={labelStyles}>
                    Address Line 1
                  </label>
                  <input
                    id="address1"
                    name="address1"
                    type="text"
                    value={formData.address1}
                    onChange={handleChange}
                    autoComplete="address-line1"
                    className={inputStyles}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address2" className={labelStyles}>
                    Address Line 2
                  </label>
                  <input
                    id="address2"
                    name="address2"
                    type="text"
                    value={formData.address2}
                    onChange={handleChange}
                    autoComplete="address-line2"
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="city" className={labelStyles}>
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="state" className={labelStyles}>
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    autoComplete="address-level1"
                    className={inputStyles}
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="zipCode" className={labelStyles}>
                    ZIP Code
                  </label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleChange}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    className={inputStyles}
                  />
                </div>
              </div>
            </fieldset>

            {/* INQUIRY DETAILS */}
            <fieldset className="border-t border-charcoal/10 pt-8">
              <legend className="font-display text-xl font-semibold">
                Inquiry details
              </legend>

              <div className="mt-5 space-y-5">
                <div>
                  <p className={labelStyles}>
                    Are you in the food service industry? *
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {["Yes", "No"].map((option) => (
                      <label
                        key={option}
                        className={`cursor-pointer rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                          formData.foodService === option
                            ? "border-gold bg-gold/10 text-gold-dark"
                            : "border-charcoal/15 bg-white text-charcoal/70 hover:border-gold/60"
                        }`}
                      >
                        <input
                          type="radio"
                          name="foodService"
                          value={option}
                          checked={formData.foodService === option}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className={labelStyles}>
                    What can we help with? *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className={inputStyles}
                  >
                    <option value="">Select a reason</option>
                    <option value="Membership">Membership</option>
                    <option value="Online Ordering">Online Ordering</option>
                    <option value="Wholesale Pricing">
                      Wholesale Pricing
                    </option>
                    <option value="Product Availability">
                      Product Availability
                    </option>
                    <option value="Existing Order">Existing Order</option>
                    <option value="Website Assistance">
                      Website Assistance
                    </option>
                    <option value="Branch Feedback">Branch Feedback</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="branch" className={labelStyles}>
                    Preferred Branch *
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className={inputStyles}
                  >
                    <option value="">Select a branch</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelStyles}>
                    Question or Comment *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Tell us how we can help..."
                    className={`${inputStyles} resize-y`}
                  />
                </div>
              </div>
            </fieldset>

            <div className="border-t border-charcoal/10 pt-8">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-charcoal transition hover:bg-gold-light focus:outline-none focus:ring-4 focus:ring-gold/25 sm:w-auto"
              >
                Send Message
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </button>

              <p className="mt-5 max-w-2xl text-xs leading-5 text-charcoal/50">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-charcoal"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-charcoal"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}