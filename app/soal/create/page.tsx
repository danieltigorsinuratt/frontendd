"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import ChipTitle from "../../components/partials/ChipTitle";
import { createQuestion } from "../../../lib/questions";

function CreateSoalContent() {
  const router = useRouter();
  const [materi, setMateri] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [errorMateri, setErrorMateri] = useState("");
  const [errorPertanyaan, setErrorPertanyaan] = useState("");
  const [errorJawaban, setErrorJawaban] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await createQuestion(materi.trim(), pertanyaan.trim(), jawaban.trim());
      router.push("/soal?message=" + encodeURIComponent("Soal berhasil ditambahkan"));
    } catch {
      setErrorMateri("Gagal menyimpan soal ke database.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ChipTitle title="Tambah Soal" />

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

export default function CreateSoalPage() {
  return (
    <AuthGuard>
      <CreateSoalContent />
    </AuthGuard>
  );
}
