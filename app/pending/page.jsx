"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import StampBadge from "@/components/StampBadge";

export default function PendingPage() {
  const { user, ready, refresh, isApprovedMember } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/login");
  }, [ready, user, router]);

  useEffect(() => {
    if (isApprovedMember) router.replace("/products");
  }, [isApprovedMember, router]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <StampBadge status={user.status} />
      <h1 className="mt-6 font-display text-3xl text-ink">
        {user.status === "denied" ? "Application Not Approved" : "Your Application Is Under Review"}
      </h1>
      <p className="mt-3 text-sm text-ink/60">
        {user.status === "denied"
          ? "Reach out to our membership team if you'd like to discuss this decision."
          : `Thanks, ${user.contactName}. Our team reviews new ${user.businessName} accounts within 1-2 business days. You'll get full catalog access as soon as you're approved.`}
      </p>
      <button
        onClick={refresh}
        className="mt-8 rounded-sm border border-navy px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-navy hover:bg-navy hover:text-cream transition-colors"
      >
        Check Status
      </button>
      <p className="mt-6 text-xs text-ink/40">
        Presenting a live demo? Sign in as the admin and approve this
        application from the Admin dashboard, then click "Check Status" here.
      </p>
    </div>
  );
}
