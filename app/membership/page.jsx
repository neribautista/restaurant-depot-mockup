import Link from "next/link";

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-widest2 text-gold-deep">Membership</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Member Benefits</h1>

      <ul className="mt-6 space-y-3 text-sm text-ink/70">
        <li>• Wholesale pricing across every category, no markup surprises</li>
        <li>• Free membership — no minimum purchase required</li>
        <li>• Full catalog search, including plain-language AI search</li>
        <li>• Order tracking and monthly flyer savings</li>
      </ul>

      <Link
        href="/register"
        className="mt-8 inline-block rounded-sm bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-widest2 text-navy hover:bg-gold-light"
      >
        Apply for Membership
      </Link>

      <h2 id="terms" className="mt-14 font-display text-xl text-ink">Membership Terms & Conditions</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">
        Membership is available to verified foodservice, retail, and
        institutional businesses. Restaurant Depot reserves the right to review and
        approve applications. Pricing is for business use only and may not be
        resold outside the ordinary course of a member's business.
      </p>
    </div>
  );
}
