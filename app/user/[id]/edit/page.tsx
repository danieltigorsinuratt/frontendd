"use client";

import { useEffect, useState, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";
import ChipTitle from "../../../components/partials/ChipTitle";
import EmptyState from "../../../components/partials/EmptyState";
import { getUserById, updateUser } from "../../../../lib/users";

function EditUserContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [asalSekolah, setAsalSekolah] = useState("");
  const [errorNama, setErrorNama] = useState("");
  const [errorKelas, setErrorKelas] = useState("");
  const [errorAsalSekolah, setErrorAsalSekolah] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getUserById(resolvedParams.id).then((item) => {
      if (item) {
        setNama(item.nama);
        setKelas(item.kelas);
        setAsalSekolah(item.asal_sekolah);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [resolvedParams.id]);

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
      const updated = await updateUser(
        resolvedParams.id,
        nama.trim(),
        kelas.trim(),
        asalSekolah.trim()
      );
      if (updated) {
        router.push("/user?message=" + encodeURIComponent("User berhasil diperbarui"));
      } else {
        setErrorNama("Gagal memperbarui data user.");
        setIsSubmitting(false);
      }
    } catch {
      setErrorNama("Terjadi kesalahan server saat memperbarui.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <EmptyState message="Memuat data user dari database..." />;
  }

  if (notFound) {
    return (
      <>
        <ChipTitle title="User Tidak Ditemukan" />
        <div className="empty-state">
          User dengan ID tersebut tidak ditemukan di database.{" "}
          <Link href="/user" className="btn-action-edit" style={{ marginLeft: 8 }}>
            Kembali ke Daftar
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <ChipTitle title="Edit User" />

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

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <AuthGuard>
      <Suspense fallback={<EmptyState message="Memuat form edit..." />}>
        <EditUserContent params={params} />
      </Suspense>
    </AuthGuard>
  );
}
