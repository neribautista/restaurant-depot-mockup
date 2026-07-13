import PageHero from "@/components/PageHero";

const videos = [
  { label: "Fresh Seafood", title: "Seafood from Restaurant Depot", videoId: "yNQ29m5FEBk" },
  { label: "Wine & Spirits Overview", title: "Restaurant Depot Wine & Spirits", videoId: "5ybQSy8YMU0" },
  { label: "Fresh Produce", title: "Restaurant Depot Fresh Produce", videoId: "WSB6NaqediM" },
  { label: "Superior Angus Beef", title: "Restaurant Depot – Superior Angus Beef", videoId: "2kP67hu_PGE" },
  { label: "Keep It Kool", title: "Restaurant Depot Keep it Kool Video", videoId: "miiMpsIqJ38" },
  { label: "Portion Controlled Steaks – Overview", title: "Fresh Portion Steaks Program Trailer", videoId: "CNQH6CfcwLU" },
  { label: "Sabor Nuestro", title: "Restaurant Depot Sabor Nuestro Brand", videoId: "tHO-pdfNeU0" },
  { label: "Bar Code Spirits", title: "Restaurant Depot Barcode Liquor", videoId: "tPkOZdmqBfk" },
  { label: "Val di Giulia Barbaresco", title: "Highlight of Barbaresco Wine", videoId: "_4lRQp1NlWk" },
  { label: "Supremo Italiano Olive Oil", title: "Restaurant Depot's Olive Oil", videoId: "fXqvvhDVZMA" },
  { label: "Portion Controlled Steaks – Tenderloin", title: "Restaurant Depot Fresh Steak Tenderloin", videoId: "9cq46-E-hZs" },
  { label: "Portion Controlled Steaks – Ribeye", title: "Restaurant Depot Fresh Steak Ribeye", videoId: "6ROv4uAw-sU" },
  { label: "Supremo Italiano", title: "Supremo Italiano", videoId: "BSm5f4RqTVA" },
  { label: "Portion Controlled Steaks – NY Strip", title: "Portion Controlled Steaks – NY Strip", videoId: "x2rE1wEexcM" },
];

export default function ProductVideosPage() {
  return (
    <div className="text-ink">
      <PageHero
        title="Product Videos"
        bgImage="/images/header/product-videos.png"
        crumbs={[
          { label: "Restaurant Depot", href: "/" },
          { label: "About", href: "/about" },
          { label: "Product Videos" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-sm font-semibold text-ink/80">
          Restaurant Depot is your #1 resource for top-quality wholesale
          meats, produce and cheese. Learn more about some of our most
          popular items here.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((v) => (
            <div key={v.label} className="overflow-hidden rounded-sm border border-navy/10">
              <div className="aspect-video w-full overflow-hidden bg-navy">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${v.videoId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="bg-navy px-4 py-3 text-sm font-semibold text-white">
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}