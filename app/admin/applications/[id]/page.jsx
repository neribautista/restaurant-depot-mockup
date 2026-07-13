"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUsers } from "@/lib/store";
import StampBadge from "@/components/StampBadge";

export default function ApplicationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user, ready, isAdmin, approve, deny } = useAuth();
  const [app, setApp] = useState(null);

  useEffect(() => {
    if (!ready) return;
    if (!user || !isAdmin) router.replace("/login");
  }, [ready, user, isAdmin, router]);

  useEffect(() => {
    const found = getUsers().find((u) => u.id === id);
    setApp(found || null);
  }, [id, user]);

  if (!isAdmin || !app) return null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <button onClick={() => router.push("/admin")} className="text-xs text-ink/50 hover:text-ink">
        ← Back to applications
      </button>

      <div className="mt-4 flex items-center gap-3">
        <h1 className="font-display text-3xl text-ink">{app.businessName}</h1>
        <StampBadge status={app.status} />
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
        <Detail label="Contact Name" value={app.contactName} />
        <Detail label="Email" value={app.email} />
        <Detail label="Phone" value={app.phone} />
        <Detail label="Business Type" value={app.businessType} />
        <Detail label="Tax / Resale ID" value={app.taxId || "—"} />
        <Detail label="Applied" value={new Date(app.appliedAt).toLocaleString()} />
      </dl>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => { approve(app.id); setApp({ ...app, status: "approved" }); }}
          className="rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-navy hover:bg-gold-light"
        >
          Approve
        </button>
        <button
          onClick={() => { deny(app.id); setApp({ ...app, status: "denied" }); }}
          className="rounded-sm border border-rust px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-rust hover:bg-rust hover:text-cream"
        >
          Deny
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest2 text-ink/40">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}
