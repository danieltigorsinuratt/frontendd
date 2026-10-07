"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function NavbarContent() {
  const pathname = usePathname();

  const isMateriActive =
    pathname === "/" ||
    pathname.startsWith("/materi") ||
    pathname.startsWith("/admin/materi");

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-left">
        <div className="navbar-brand-logo">
          <Image
            src="/images/logo-mathventure.png"
            alt="Logo MathVenture"
            width={44}
            height={44}
            priority
          />
        </div>
        <ul className="navbar-menu">
          <li className="navbar-menu-item">
            <Link href="#">Dashboard</Link>
          </li>
          <li className={`navbar-menu-item ${isMateriActive ? "active" : ""}`}>
            <Link href="/">Kelola Materi</Link>
          </li>
          <li className="navbar-menu-item">
            <Link href="#">Kelola Soal</Link>
          </li>
          <li className="navbar-menu-item">
            <Link href="#">Kelola User</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleLogout} style={{ display: "inline" }}>
          <button type="submit" className="btn-keluar">
            Keluar
          </button>
        </form>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <nav className="navbar-wrapper">
          <div className="navbar-left">
            <div className="navbar-brand-logo">
              <Image
                src="/images/logo-mathventure.png"
                alt="Logo MathVenture"
                width={44}
                height={44}
                priority
              />
            </div>
            <ul className="navbar-menu">
              <li className="navbar-menu-item">
                <Link href="#">Dashboard</Link>
              </li>
              <li className="navbar-menu-item active">
                <Link href="/">Kelola Materi</Link>
              </li>
              <li className="navbar-menu-item">
                <Link href="#">Kelola Soal</Link>
              </li>
              <li className="navbar-menu-item">
                <Link href="#">Kelola User</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-right">
            <button type="button" className="btn-keluar">
              Keluar
            </button>
          </div>
        </nav>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
