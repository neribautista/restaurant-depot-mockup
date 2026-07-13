import Link from "next/link";

export default function PageHero({ title, bgImage, crumbs }) {
  return (
    <>
      <section className="relative h-48 md:h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 bg-navy/30" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-8">
          <h1 className="font-display text-4xl md:text-5xl uppercase text-gold-light drop-shadow">
            {title}
          </h1>
        </div>
      </section>

      <nav className="mx-auto max-w-6xl px-6 py-4 text-sm text-ink/60">
        {crumbs.map((crumb, i) => (
          <span key={crumb.label}>
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-navy">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-semibold text-navy">{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && <span className="mx-2 text-ink/30">|</span>}
          </span>
        ))}
      </nav>
    </>
  );
}