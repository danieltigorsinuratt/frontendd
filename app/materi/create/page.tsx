"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import ChipTitle from "../../components/partials/ChipTitle";
import { createMaterial } from "../../../lib/materials";

function CreateMateriContent() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [errorJudul, setErrorJudul] = useState("");
  const [errorDeskripsi, setErrorDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await createMaterial(judul.trim(), deskripsi.trim());
      router.push("/materi?message=" + encodeURIComponent("Materi berhasil ditambahkan"));
    } catch {
      setErrorJudul("Gagal menyimpan materi ke database.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ChipTitle title="Tambah Materi" />

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

export default function CreateMateriPage() {
  return (
    <AuthGuard>
      <CreateMateriContent />
    </AuthGuard>
  );
}
