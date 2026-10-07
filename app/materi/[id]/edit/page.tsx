"use client";

import { useEffect, useState, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import { getStoredMaterials, updateMaterial } from "../../../../lib/materials";

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

  useEffect(() => {
    const list = getStoredMaterials();
    const item = list.find((m) => m.id === resolvedParams.id);
    if (item) {
      setJudul(item.judul);
      setDeskripsi(item.deskripsi);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [resolvedParams.id]);

  const isFormValid = judul.trim() !== "" && deskripsi.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
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

    if (hasError) return;

    updateMaterial(resolvedParams.id, judul.trim(), deskripsi.trim());
    router.push("/?message=" + encodeURIComponent("Materi berhasil diperbarui"));
  };

  if (loading) {
    return <div className="empty-state">Memuat data materi...</div>;
  }

  if (notFound) {
    return (
      <>
        <div className="chip-title-wrapper">
          <div className="chip-title">Materi Tidak Ditemukan</div>
        </div>
        <div className="empty-state">
          Materi dengan ID tersebut tidak ditemukan.{" "}
          <button
            onClick={() => router.push("/")}
            className="btn-action-delete"
            style={{ marginLeft: 8 }}
          >
            Kembali ke Daftar
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Chip Judul Halaman */}
      <div className="chip-title-wrapper">
        <div className="chip-title">Edit Materi</div>
      </div>

      {/* Form Edit Materi */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* Field Judul Materi */}
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

          {/* Field Deskripsi */}
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

          {/* Tombol Simpan */}
          <button
            type="submit"
            id="btn-simpan"
            className={`btn-simpan ${isFormValid ? "is-active" : ""}`}
            disabled={!isFormValid}
          >
            SIMPAN
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
    <Suspense fallback={<div className="empty-state">Memuat form edit...</div>}>
      <EditMateriContent params={params} />
    </Suspense>
  );
}
