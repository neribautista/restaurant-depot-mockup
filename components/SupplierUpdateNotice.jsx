export default function SupplierUpdateNotice() {
    return (
      <section
        className="border-b border-gold/30 bg-gold/10"
        aria-label="Important supplier update"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
              !
            </div>
  
            <div>
              <p className="text-sm font-semibold text-navy">
                Our commitment to low prices remains unchanged.
              </p>
  
              <p className="mt-0.5 text-xs leading-5 text-ink/60 sm:text-sm">
                Learn more about the Sysco transaction and what it means for
                Restaurant Depot customers.
              </p>
            </div>
          </div>
  
          <a
            href="/documents/restaurant-depot-sysco-update.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-10 shrink-0 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep sm:ml-0"
          >
            Read the update →
          </a>
        </div>
      </section>
    );
  }