"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RequireApproved({ children }) {
  const { user, isApprovedMember, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login?next=/products");
      return;
    }
    if (user.role === "member" && user.status === "pending") {
      router.replace("/account/pending");
      return;
    }
    if (!isApprovedMember && user.role !== "admin") {
      router.replace("/login?next=/products");
    }
  }, [ready, user, isApprovedMember, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-ink/50">
        Loading…
      </div>
    );
  }

  return children;
}
