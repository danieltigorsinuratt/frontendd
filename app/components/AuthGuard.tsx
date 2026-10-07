"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserAuthenticated } from "../../lib/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isUserAuthenticated()) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (authorized === null) {
    return (
      <div className="empty-state" style={{ marginTop: 40 }}>
        Memeriksa sesi pengguna...
      </div>
    );
  }

  return <>{children}</>;
}
