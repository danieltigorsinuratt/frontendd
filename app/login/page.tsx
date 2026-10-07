"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isUserAuthenticated, loginAdmin } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUserAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await loginAdmin(email, password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(result.message || "Gagal masuk. Periksa kembali email dan password.");
        setIsLoading(false);
      }
    } catch {
      setErrorMessage("Terjadi kesalahan koneksi ke server backend.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Logo MathVenture */}
        <div className="login-logo-container">
          <div className="login-logo-circle">
            <Image
              src="/images/logo-mathventure.png"
              alt="MathVenture Logo"
              width={76}
              height={76}
              priority
            />
          </div>
        </div>

        {/* Judul Form */}
        <h1 className="login-title">Masuk ke Admin Panel</h1>

        {/* Error Feedback */}
        {errorMessage && <div className="login-error-alert">{errorMessage}</div>}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="login-input"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              autoComplete="email"
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`btn-login ${isFormValid ? "is-active" : ""}`}
          >
            {isLoading ? "MEMPROSES..." : "MASUK"}
          </button>
        </form>
      </div>
    </div>
  );
}
