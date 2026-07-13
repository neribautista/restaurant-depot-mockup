"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getApplications } from "@/lib/store";
import StampBadge from "@/components/StampBadge";
import Link from "next/link";

export default function AdminPage() {
  const { user, ready, isAdmin, approve, deny } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    if (!ready) return;
    if (!user || !isAdmin) router.replace("/login");
  }, [ready, user, isAdmin, router]);

  useEffect(() => {
    setApplications(getApplications());
  }, [user]);

  const refreshList = () => setApplications(getApplications());

  if (!isAdmin) return null;

  const visible = applications.filter((a) => filter === "all" || a.status === filter);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest2 text-gold-deep">Admin</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Membership Applications</h1>
      <p className="mt-2 text-sm text-ink/60">
        Approve applications to grant catalog access, or deny them.
      </p>

      <div className="mt-6 flex gap-2">
        {["pending", "approved", "denied", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              filter === f ? "border-gold bg-gold text-navy" : "border-cream-dark text-ink/60 hover:border-gold"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 divide-y divide-cream-dark rounded-md bg-white shadow-sm ring-1 ring-black/5">
        {visible.length === 0 && (
          <p className="p-6 text-sm text-ink/50">No applications in this view.</p>
        )}
        {visible.map((app) => (
          <div key={app.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-lg text-ink">{app.businessName}</h3>
                <StampBadge status={app.status} />
              </div>
              <p className="text-sm text-ink/60">
                {app.contactName} · {app.email} · {app.businessType || "—"}
              </p>
              <p className="text-xs text-ink/40">
                Applied {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/applications/${app.id}`}
                className="rounded-sm border border-navy px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy hover:bg-navy hover:text-cream"
              >
                Review
              </Link>
              {app.status !== "approved" && (
                <button
                  onClick={() => { approve(app.id); refreshList(); }}
                  className="rounded-sm bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy hover:bg-gold-light"
                >
                  Approve
                </button>
              )}
              {app.status !== "denied" && (
                <button
                  onClick={() => { deny(app.id); refreshList(); }}
                  className="rounded-sm border border-rust px-4 py-2 text-xs font-semibold uppercase tracking-wide text-rust hover:bg-rust hover:text-cream"
                >
                  Deny
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
