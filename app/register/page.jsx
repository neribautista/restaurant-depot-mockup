"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import locations from "@/data/locations.json";

const STEPS = ["Contact Information", "Address Information", "Disclaimer & Submit"];

const BUSINESS_TYPES = [
  "Eating/Drinking Place",
  "Retail Store",
  "Hospitality",
  "Food Concession",
  "General Business",
  "Health or Day Care Operations",
  "Tax Exempt Organizations",
  "Public Admin./Gov't",
];

const RETAIL_SUBTYPES = [
  "Convenience Store",
  "Delicatessen w/grocery",
  "Discount Store (Dollar)",
  "Fish Market",
  "Gasoline Station",
  "Grocery Store",
  "Grocery w/Prepared Food",
  "Liquor Store",
  "Meat Market",
  "Newsstand, Stationery, Tobacco, Candy Store",
  "Pet Store or Veterinarian",
  "Pharmacy",
  "Produce Market",
  "WIC Store",
  "Variety/Hardware Store",
  "Other Retail or Service Business",
];

const initialForm = {
  restaurantName: "",
  businessType: BUSINESS_TYPES[0],
  retailSubtype: RETAIL_SUBTYPES[0],
  hasResaleLicense: "",
  preferredLocation: "",
  contactName: "",
  email: "",
  verifyEmail: "",
  propertyType: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  mailingDifferent: "",
  mobilePhone: "",
  businessPhone: "",
  businessFax: "",
  website: "",
  agreedToDisclaimer: false,
};

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.restaurantName || !form.hasResaleLicense || !form.preferredLocation || !form.contactName || !form.email)
        return "Please fill out all required fields.";
      if (form.email !== form.verifyEmail) return "Email addresses do not match.";
    }
    if (step === 2) {
      if (!form.propertyType || !form.street || !form.city || !form.state || !form.zipCode || !form.mailingDifferent || !form.businessPhone)
        return "Please fill out all required fields.";
    }
    return "";
  };

  const goNext = () => {
    const err = validateStep();
    if (err) return setError(err);
    setError("");
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.agreedToDisclaimer) return setError("Please confirm you've read the disclaimer.");
    setError("");
    setSubmitting(true);
    try {
      register(form);
      router.push("/account/pending");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const locationNames = locations.map((loc) => loc.name).sort();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
        {/* LEFT: informational copy */}
        <MembershipInfo />

        {/* MIDDLE: double dashed navy divider (desktop only) */}
        <div className="hidden lg:flex lg:justify-center">
          <div className="flex gap-2">
            <div className="w-px border-l-2 border-dashed border-navy/60" />
            <div className="w-px border-l-2 border-dashed border-navy/60" />
          </div>
        </div>

        {/* RIGHT: signup form */}
        <div className="mt-12 lg:mt-0">
          <p className="text-xs uppercase tracking-widest2 text-gold-deep">Membership Application</p>
          <h2 className="mt-2 font-display text-2xl text-ink">Sign Up for Membership</h2>
          <p className="mt-2 text-sm text-ink/60">
            You'll receive a temporary account number by email — bring your
            business license to your preferred location to finalize your card.
          </p>

          <Stepper currentStep={step} />

          <form onSubmit={step === 3 ? submit : (e) => e.preventDefault()} className="space-y-6">
            {step === 1 && <StepContact form={form} update={update} locationNames={locationNames} />}
            {step === 2 && <StepAddress form={form} update={update} />}
            {step === 3 && <StepDisclaimer form={form} update={update} />}

            {error && <p className="text-sm text-rust">{error}</p>}

            <div className="flex gap-4 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 rounded-sm border border-navy/20 py-3 text-sm font-semibold uppercase tracking-widest2 text-navy hover:bg-cream"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-widest2 text-navy hover:bg-gold-light"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-widest2 text-navy hover:bg-gold-light disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              )}
            </div>

            <p className="text-center text-xs text-ink/50">
              Already a member?{" "}
              <a href="/login" className="font-semibold text-navy underline">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function MembershipInfo() {
  return (
    <div className="lg:pr-4">
      <p className="text-xs uppercase tracking-widest2 text-gold-deep">Join Restaurant Depot</p>
      <h1 className="mt-2 font-display text-3xl text-ink">
        Join Restaurant Depot now. It's FREE!
      </h1>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/70">
        <p>
          If you do not have a Restaurant Depot membership account and you
          qualify for membership, apply below for your free membership card!
        </p>

        <p>
          The first step to get a membership is to complete the online
          application below. You will receive your account number and
          temporary membership card via email. To finalize your membership,
          go to the Restaurant Depot location you selected as your Preferred
          Store, where a permanent membership card with your assigned account
          number will be printed for you.
        </p>

        <p>
          You will need to present your business license or IRS letter to
          show that you are the owner of your business or non-profit. If you
          qualify for sales tax exemption in your state, you can instead
          provide your sales tax license paperwork (for businesses that
          resell our product in the ordinary course of business) or state
          sales tax exempt certificate (for registered non-profits). If you
          do not qualify for sales tax exemption, the business license or IRS
          letter is sufficient to open the account. In NY, you also need your
          Certificate of Authority. In the following states, you also need
          your FEIN: <strong className="text-ink">CT, IN, MA and PA</strong>.
          If you wish to purchase beer, wine or spirits, you will need to
          present your state license. Membership cards are not sent in the
          mail.
        </p>

        <p>
          Use your card to shop at any Restaurant Depot location across the
          USA. On the day after your first in-store shop, you will also gain
          access to the free, members-only benefits on this website: check
          your purchase history, search for products, build shopping lists,
          shop online, and more…
        </p>

        <p>
          Don't qualify for membership? Get access to most of our items on{" "}
          <a
            href="https://www.instacart.com/restaurant-depot"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy underline"
          >
            Instacart
          </a>.
        </p>
      </div>
    </div>
  );
}

function Stepper({ currentStep }) {
  return (
    <div className="mb-10 flex items-center">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const active = stepNum === currentStep;
        const complete = stepNum < currentStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                  active || complete ? "border-navy bg-navy text-cream" : "border-ink/20 text-ink/40"
                }`}
              >
                {stepNum}
              </span>
              <span
                className={`hidden text-xs font-semibold uppercase tracking-wide sm:inline ${
                  active ? "text-navy" : complete ? "text-ink/70" : "text-ink/40"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum < STEPS.length && (
              <div className={`mx-3 h-[2px] flex-1 ${complete ? "bg-navy" : "bg-cream-dark"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepContact({ form, update, locationNames }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg text-ink">Business Info</h2>
      <Field label="Restaurant/Organization Name" required value={form.restaurantName} onChange={update("restaurantName")} />

      <Select label="Type of Business" required value={form.businessType} onChange={update("businessType")}>
        {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
      </Select>

      {form.businessType === "Retail Store" && (
        <Select label="Retail Category" required value={form.retailSubtype} onChange={update("retailSubtype")}>
          {RETAIL_SUBTYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
      )}

      <RadioGroup
        label="Do you have a resale license for alcoholic beverages?"
        name="hasResaleLicense"
        required
        value={form.hasResaleLicense}
        onChange={update("hasResaleLicense")}
        options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
      />

      {/* Locations dropdown from JSON */}
      <Select label="Preferred Location" required value={form.preferredLocation} onChange={update("preferredLocation")}>
        <option value="">Select a location...</option>
        {locationNames.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </Select>

      <h2 className="pt-2 font-display text-lg text-ink">Contact Info</h2>
      <Field label="Contact Name" required value={form.contactName} onChange={update("contactName")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email Address" type="email" required value={form.email} onChange={update("email")} />
        <Field label="Verify Email Address" type="email" required value={form.verifyEmail} onChange={update("verifyEmail")} />
      </div>
    </div>
  );
}

function StepAddress({ form, update }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg text-ink">Address Info</h2>
      <RadioGroup
        label="Residence or Commercial Property?"
        name="propertyType"
        required
        value={form.propertyType}
        onChange={update("propertyType")}
        options={[{ value: "residential", label: "Residential" }, { value: "commercial", label: "Commercial" }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Street" required value={form.street} onChange={update("street")} />
        <Field label="City" required value={form.city} onChange={update("city")} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="State" required maxLength={2} value={form.state} onChange={(e) => update("state")({ target: { value: e.target.value.toUpperCase() } })} />
        <Field label="Zip" required value={form.zipCode} onChange={update("zipCode")} />
      </div>

      <RadioGroup
        label="Mailing information — if different from above"
        name="mailingDifferent"
        required
        value={form.mailingDifferent}
        onChange={update("mailingDifferent")}
        options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
      />

      <h2 className="pt-2 font-display text-lg text-ink">Additional Contact Info</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Mobile Number" value={form.mobilePhone} onChange={update("mobilePhone")} />
        <Field label="Business Phone Number" required value={form.businessPhone} onChange={update("businessPhone")} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Business Fax Number" value={form.businessFax} onChange={update("businessFax")} />
        <Field label="Website" value={form.website} onChange={update("website")} />
      </div>
    </div>
  );
}

function StepDisclaimer({ form, update }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg text-ink">Form Submission Disclaimer</h2>
      <div className="rounded-sm border border-cream-dark bg-cream/60 p-4 text-sm leading-relaxed text-ink/70">
        By submitting this form, you confirm that you've read and agree to our
        Membership Terms & Conditions (including its arbitration clause), our
        Privacy Policy, and our Active Warehouse Rules & Conditions. You may opt
        out of the arbitration clause within 30 days of receiving these terms.
      </div>
      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          checked={form.agreedToDisclaimer}
          onChange={update("agreedToDisclaimer")}
          className="mt-0.5 h-4 w-4 accent-gold-deep"
        />
        I have read the disclaimer <span className="text-rust">*</span>
      </label>
    </div>
  );
}

function Field({ label, type = "text", required, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">
        {label} {required && <span className="text-rust">*</span>}
      </label>
      <input
        type={type}
        required={required}
        {...props}
        className="w-full rounded-sm border border-cream-dark bg-white px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function Select({ label, required, children, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">
        {label} {required && <span className="text-rust">*</span>}
      </label>
      <select
        {...props}
        className="w-full rounded-sm border border-cream-dark bg-white px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
      >
        {children}
      </select>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, options, required }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink/60">
        {label} {required && <span className="text-rust">*</span>}
      </p>
      <div className="flex gap-6">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="h-4 w-4 accent-gold-deep"
              required={required}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}