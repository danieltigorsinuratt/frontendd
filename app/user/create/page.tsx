"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import ChipTitle from "../../components/partials/ChipTitle";
import { createUser } from "../../../lib/users";

function CreateUserContent() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [asalSekolah, setAsalSekolah] = useState("");
  const [errorNama, setErrorNama] = useState("");
  const [errorKelas, setErrorKelas] = useState("");
  const [errorAsalSekolah, setErrorAsalSekolah] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    nama.trim() !== "" && kelas.trim() !== "" && asalSekolah.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!nama.trim()) {
      setErrorNama("Nama Lengkap wajib diisi.");
      hasError = true;
    } else {
      setErrorNama("");
    }

    if (!kelas.trim()) {
      setErrorKelas("Kelas wajib diisi.");
      hasError = true;
    } else {
      setErrorKelas("");
    }

    if (!asalSekolah.trim()) {
      setErrorAsalSekolah("Asal Sekolah wajib diisi.");
      hasError = true;
    } else {
      setErrorAsalSekolah("");
    }

    if (hasError || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createUser(nama.trim(), kelas.trim(), asalSekolah.trim());
      router.push("/user?message=" + encodeURIComponent("User berhasil ditambahkan"));
    } catch {
      setErrorNama("Gagal menyimpan user ke database.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ChipTitle title="Tambah User" />

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* Field Nama Lengkap */}
          <div className="form-group">
            <label htmlFor="nama" className="form-label">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              className="form-control"
              placeholder="Masukkan Nama Lengkap"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                if (errorNama) setErrorNama("");
              }}
              autoComplete="off"
            />
            {errorNama && <span className="error-feedback">{errorNama}</span>}
          </div>

          {/* Field Kelas */}
          <div className="form-group">
            <label htmlFor="kelas" className="form-label">
              Kelas
            </label>
            <input
              type="text"
              id="kelas"
              name="kelas"
              className="form-control"
              placeholder="Masukkan Kelas"
              value={kelas}
              onChange={(e) => {
                setKelas(e.target.value);
                if (errorKelas) setErrorKelas("");
              }}
              autoComplete="off"
            />
            {errorKelas && <span className="error-feedback">{errorKelas}</span>}
          </div>

          {/* Field Asal Sekolah */}
          <div className="form-group">
            <label htmlFor="asal_sekolah" className="form-label">
              Asal Sekolah
            </label>
            <input
              type="text"
              id="asal_sekolah"
              name="asal_sekolah"
              className="form-control"
              placeholder="Masukkan Asal Sekolah"
              value={asalSekolah}
              onChange={(e) => {
                setAsalSekolah(e.target.value);
                if (errorAsalSekolah) setErrorAsalSekolah("");
              }}
              autoComplete="off"
            />
            {errorAsalSekolah && (
              <span className="error-feedback">{errorAsalSekolah}</span>
            )}
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            id="btn-simpan"
            className={`btn-simpan ${isFormValid && !isSubmitting ? "is-active" : ""}`}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "MENYIMPAN..." : "SIMPAN"}
          </button>
        </form>
      </div>
    </>
  );
}

export default function CreateUserPage() {
  return (
    <AuthGuard>
      <CreateUserContent />
    </AuthGuard>
  );
}
