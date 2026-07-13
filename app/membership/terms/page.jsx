// app/membership/terms/page.jsx

const SECTIONS = [
    {
      title: "1. Definitions",
      copy: [
        `"You" and "Your" refer to the business or organization listed in the membership application, the person who signed the form, and anyone authorized to use the membership.`,
        `"We," "Us," and "Our" refer to Jetro Holdings, LLC and its divisions and affiliates, including Jetro Cash & Carry, Restaurant Depot, and TheRDStore.com.`,
      ],
    },
    {
      title: "2. Acceptance of Terms",
      copy: [
        "By applying for membership or using an existing membership, you agree to these Terms, our Privacy Policy, website terms of use, and warehouse safety rules.",
        "We may update these terms from time to time. Continued use of your membership means you accept the updated version.",
      ],
    },
    {
      title: "3. Qualifications for Membership",
      copy: [
        "Membership is free and available to qualifying owners or operators of foodservice businesses and nonprofit organizations.",
        "To qualify, you must provide a valid reseller’s permit, tax-exempt certificate, or other required documentation, plus proof that you are authorized to purchase on behalf of the business or organization.",
        "We may deny or revoke membership if the requirements are not met or for any lawful reason.",
      ],
    },
    {
      title: "4. Use of Membership",
      copy: [
        "Your membership may only be used for purchases related to the operation of your business or nonprofit organization.",
        "Membership is not transferable to another person, business, or organization.",
      ],
    },
    {
      title: "5. Responsibility for Account",
      copy: [
        "You are responsible for safeguarding your membership card and account information.",
        "If your card is lost or you suspect misuse, you must notify us immediately.",
      ],
    },
    {
      title: "6. Termination",
      copy: [
        "Either you or we may terminate the membership at any time for convenience or for any lawful reason.",
        "We may also terminate inactive memberships after an extended period of no use.",
      ],
    },
    {
      title: "7. Contact Information",
      copy: [
        "You are responsible for notifying us of any changes to your address, phone number, fax number, or email address.",
        "We may rely on the contact information previously provided until you give written notice of any changes.",
      ],
    },
    {
      title: "8. Limitation of Liability",
      copy: [
        "We are not liable for indirect, special, punitive, incidental, or consequential damages related to your membership.",
        "These limitations apply to all claims and survive the termination of the membership agreement.",
      ],
    },
    {
      title: "9. Binding Arbitration / Class Action Waiver",
      copy: [
        "Any dispute between you and us will be resolved on an individual basis through binding arbitration rather than in court.",
        "You waive the right to bring or participate in a class action, representative action, or consolidated claim.",
        "You may opt out of arbitration within 30 days of receiving these terms by notifying us in writing.",
      ],
    },
    {
      title: "10. Waiver of Trial by Jury",
      copy: [
        "You and we waive the right to a trial by jury for any disputes between you and us.",
      ],
    },
    {
      title: "11. Insurance and Indemnity",
      copy: [
        "To the fullest extent permitted by law, you agree to defend, indemnify, and hold us harmless from claims related to your negligent, reckless, or intentional misconduct connected to your membership.",
        "You may also be required to provide additional insured status under applicable commercial liability insurance policies, subject to policy terms.",
      ],
    },
    {
      title: "12. Product Condition",
      copy: [
        "After purchase, you are responsible for transporting and storing goods safely.",
        "You are responsible for maintaining proper temperature protection for refrigerated and frozen products and complying with applicable transportation and food safety laws.",
      ],
    },
    {
      title: "13. Miscellaneous",
      copy: [
        "If any part of these terms is found invalid or unenforceable, the remaining terms will remain in effect.",
        "These terms, along with your membership application and any amendments, make up the entire agreement between you and us.",
      ],
    },
  ];
  
  export default function MembershipTermsPage() {
    return (
      <main className="bg-white">
        {/* HERO */}
        <section className="bg-navy py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              Membership
            </p>
  
            <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
              Membership Terms & Conditions
            </h1>
  
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Please review these terms carefully before applying for or using a
              Restaurant Depot membership.
            </p>
          </div>
        </section>
  
        {/* NOTICE */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-lg border-l-4 border-gold bg-cream p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              Important Notice
            </p>
  
            <h2 className="mt-3 font-display text-2xl text-navy">
              Arbitration and Class Action Waiver
            </h2>
  
            <p className="mt-4 leading-8 text-ink/75">
              These terms include a binding arbitration clause and waiver of class
              actions and collective relief. This means disputes are generally
              resolved individually through arbitration rather than in court.
            </p>
          </div>
  
          {/* TERMS */}
          <div className="mt-14 space-y-8">
            {SECTIONS.map((section) => (
              <section
                key={section.title}
                className="rounded-lg border border-cream-dark bg-white p-8 shadow-sm"
              >
                <h2 className="font-display text-2xl text-ink">
                  {section.title}
                </h2>
  
                <div className="mt-4 space-y-4">
                  {section.copy.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-ink/70 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    );
  }