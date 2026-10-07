"use client";

import { useEffect, useState, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";
import ChipTitle from "../../../components/partials/ChipTitle";
import EmptyState from "../../../components/partials/EmptyState";
import { getMaterialById, updateMaterial } from "../../../../lib/materials";

function EditMateriContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [errorJudul, setErrorJudul] = useState("");
  const [errorDeskripsi, setErrorDeskripsi] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getMaterialById(resolvedParams.id).then((item) => {
      if (item) {
        setJudul(item.judul);
        setDeskripsi(item.deskripsi);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [resolvedParams.id]);

  const isFormValid = judul.trim() !== "" && deskripsi.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!judul.trim()) {
      setErrorJudul("Judul materi wajib diisi.");
      hasError = true;
    } else if (judul.length > 150) {
      setErrorJudul("Judul materi tidak boleh lebih dari 150 karakter.");
      hasError = true;
    } else {
      setErrorJudul("");
    }

    if (!deskripsi.trim()) {
      setErrorDeskripsi("Deskripsi materi wajib diisi.");
      hasError = true;
    } else {
      setErrorDeskripsi("");
    }

    if (hasError || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const updated = await updateMaterial(resolvedParams.id, judul.trim(), deskripsi.trim());
      if (updated) {
        router.push("/materi?message=" + encodeURIComponent("Materi berhasil diperbarui"));
      } else {
        setErrorJudul("Gagal memperbarui data materi.");
        setIsSubmitting(false);
      }
    } catch {
      setErrorJudul("Terjadi kesalahan server saat memperbarui.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <EmptyState message="Memuat data materi dari database..." />;
  }

  if (notFound) {
    return (
      <>
        <ChipTitle title="Materi Tidak Ditemukan" />
        <div className="empty-state">
          Materi dengan ID tersebut tidak ditemukan di database.{" "}
          <Link href="/materi" className="btn-action-edit" style={{ marginLeft: 8 }}>
            Kembali ke Daftar
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <ChipTitle title="Edit Materi" />

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="judul" className="form-label">
              Judul Materi
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              className="form-control"
              placeholder="Masukkan Judul Materi"
              value={judul}
              onChange={(e) => {
                setJudul(e.target.value);
                if (errorJudul) setErrorJudul("");
              }}
              autoComplete="off"
            />
            {errorJudul && <span className="error-feedback">{errorJudul}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="deskripsi" className="form-label">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              className="form-control"
              rows={8}
              placeholder="Isi Detail Materi"
              value={deskripsi}
              onChange={(e) => {
                setDeskripsi(e.target.value);
                if (errorDeskripsi) setErrorDeskripsi("");
              }}
            />
            {errorDeskripsi && (
              <span className="error-feedback">{errorDeskripsi}</span>
            )}
          </div>

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

export default function EditMateriPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <AuthGuard>
      <Suspense fallback={<EmptyState message="Memuat form edit..." />}>
        <EditMateriContent params={params} />
      </Suspense>
    </AuthGuard>
  );
}
