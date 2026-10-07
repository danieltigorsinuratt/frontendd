"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { logoutAdmin } from "../../lib/auth";
import ConfirmModal from "./partials/ConfirmModal";

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Jangan render navbar di halaman login
  if (pathname === "/login") {
    return null;
  }

  const isDashboardActive = pathname === "/dashboard";
  const isMateriActive = pathname.startsWith("/materi");
  const isSoalActive = pathname.startsWith("/soal");
  const isUserActive = pathname.startsWith("/user");

  const handleConfirmLogout = () => {
    logoutAdmin();
    setShowLogoutModal(false);
    router.replace("/login");
  };

  return (
    <>
      <nav className="navbar-wrapper">
        <div className="navbar-left">
          <Link href="/dashboard" className="navbar-brand-logo">
            <Image
              src="/images/logo-mathventure.png"
              alt="Logo MathVenture"
              width={44}
              height={44}
              priority
            />
          </Link>
          <ul className="navbar-menu">
            <li className={`navbar-menu-item ${isDashboardActive ? "active" : ""}`}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={`navbar-menu-item ${isMateriActive ? "active" : ""}`}>
              <Link href="/materi">Kelola Materi</Link>
            </li>
            <li className={`navbar-menu-item ${isSoalActive ? "active" : ""}`}>
              <Link href="/soal">Kelola Soal</Link>
            </li>
            <li className={`navbar-menu-item ${isUserActive ? "active" : ""}`}>
              <Link href="/user">Kelola User</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <button
            type="button"
            className="btn-keluar"
            onClick={() => setShowLogoutModal(true)}
          >
            Keluar
          </button>
        </div>
      </nav>

      {/* Modal Konfirmasi Logout */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari Admin Panel MathVenture?"
        confirmLabel="Ya, Keluar"
        cancelLabel="Batal"
        isDanger={true}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}
