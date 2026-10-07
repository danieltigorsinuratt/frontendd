"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUserAuthenticated } from "../lib/auth";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (isUserAuthenticated()) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="empty-state" style={{ marginTop: 60 }}>
      Memuat MathVenture...
    </div>
  );
}
