"use client";

import { useEffect, useState, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";
import ChipTitle from "../../../components/partials/ChipTitle";
import EmptyState from "../../../components/partials/EmptyState";
import { getQuestionById, updateQuestion } from "../../../../lib/questions";

function EditSoalContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [materi, setMateri] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [errorMateri, setErrorMateri] = useState("");
  const [errorPertanyaan, setErrorPertanyaan] = useState("");
  const [errorJawaban, setErrorJawaban] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getQuestionById(resolvedParams.id).then((item) => {
      if (item) {
        setMateri(item.materi);
        setPertanyaan(item.pertanyaan);
        setJawaban(item.jawaban);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [resolvedParams.id]);

  const isFormValid =
    materi.trim() !== "" && pertanyaan.trim() !== "" && jawaban.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!materi.trim()) {
      setErrorMateri("Materi wajib diisi.");
      hasError = true;
    } else {
      setErrorMateri("");
    }

    if (!pertanyaan.trim()) {
      setErrorPertanyaan("Pertanyaan wajib diisi.");
      hasError = true;
    } else {
      setErrorPertanyaan("");
    }

    if (!jawaban.trim()) {
      setErrorJawaban("Jawaban wajib diisi.");
      hasError = true;
    } else {
      setErrorJawaban("");
    }

    if (hasError || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const updated = await updateQuestion(
        resolvedParams.id,
        materi.trim(),
        pertanyaan.trim(),
        jawaban.trim()
      );
      if (updated) {
        router.push("/soal?message=" + encodeURIComponent("Soal berhasil diperbarui"));
      } else {
        setErrorMateri("Gagal memperbarui data soal.");
        setIsSubmitting(false);
      }
    } catch {
      setErrorMateri("Terjadi kesalahan server saat memperbarui.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <EmptyState message="Memuat data soal dari database..." />;
  }

  if (notFound) {
    return (
      <>
        <ChipTitle title="Soal Tidak Ditemukan" />
        <div className="empty-state">
          Soal dengan ID tersebut tidak ditemukan di database.{" "}
          <Link href="/soal" className="btn-action-edit" style={{ marginLeft: 8 }}>
            Kembali ke Daftar
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <ChipTitle title="Edit Soal" />

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* Field Materi */}
          <div className="form-group">
            <label htmlFor="materi" className="form-label">
              Materi
            </label>
            <input
              type="text"
              id="materi"
              name="materi"
              className="form-control"
              placeholder="Masukkan Materi"
              value={materi}
              onChange={(e) => {
                setMateri(e.target.value);
                if (errorMateri) setErrorMateri("");
              }}
              autoComplete="off"
            />
            {errorMateri && <span className="error-feedback">{errorMateri}</span>}
          </div>

          {/* Field Pertanyaan */}
          <div className="form-group">
            <label htmlFor="pertanyaan" className="form-label">
              Pertanyaan
            </label>
            <input
              type="text"
              id="pertanyaan"
              name="pertanyaan"
              className="form-control"
              placeholder="Masukkan Pertanyaan"
              value={pertanyaan}
              onChange={(e) => {
                setPertanyaan(e.target.value);
                if (errorPertanyaan) setErrorPertanyaan("");
              }}
              autoComplete="off"
            />
            {errorPertanyaan && (
              <span className="error-feedback">{errorPertanyaan}</span>
            )}
          </div>

          {/* Field Jawaban */}
          <div className="form-group">
            <label htmlFor="jawaban" className="form-label">
              Jawaban
            </label>
            <input
              type="text"
              id="jawaban"
              name="jawaban"
              className="form-control"
              placeholder="Masukkan Jawaban"
              value={jawaban}
              onChange={(e) => {
                setJawaban(e.target.value);
                if (errorJawaban) setErrorJawaban("");
              }}
              autoComplete="off"
            />
            {errorJawaban && <span className="error-feedback">{errorJawaban}</span>}
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

export default function EditSoalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <AuthGuard>
      <Suspense fallback={<EmptyState message="Memuat form edit..." />}>
        <EditSoalContent params={params} />
      </Suspense>
    </AuthGuard>
  );
}
