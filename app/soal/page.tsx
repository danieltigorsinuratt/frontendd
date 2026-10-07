"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthGuard from "../components/AuthGuard";
import ChipTitle from "../components/partials/ChipTitle";
import ActionButton from "../components/partials/ActionButton";
import Toast from "../components/partials/Toast";
import EmptyState from "../components/partials/EmptyState";
import ConfirmModal from "../components/partials/ConfirmModal";
import {
  Question,
  getQuestions,
  deleteQuestion,
} from "../../lib/questions";

function SoalContent() {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null);

  const loadData = async () => {
    const data = await getQuestions();
    setQuestions(data);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadData();

    const msg = searchParams.get("message");
    if (msg) {
      setToastMessage(msg);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const success = await deleteQuestion(deleteTarget.id);
    if (success) {
      await loadData();
      setToastMessage(`Soal "${deleteTarget.pertanyaan}" berhasil dihapus.`);
    } else {
      setToastMessage("Gagal menghapus soal.");
    }
    setDeleteTarget(null);
  };

  return (
    <>
      <ChipTitle title="Kelola Soal" />

      <ActionButton href="/soal/create" label="TAMBAH SOAL" />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      <div className="materials-list">
        {isLoaded && questions.length > 0 ? (
          questions.map((q) => (
            <div key={q.id} className="material-card soal-card">
              <div className="soal-card-info">
                <div className="soal-card-question">{q.pertanyaan}</div>
                <div className="soal-card-materi">{q.materi}</div>
              </div>
              <div className="soal-card-actions">
                <div className="pill-jawaban">{q.jawaban}</div>
                <Link href={`/soal/${q.id}/edit`} className="btn-action-edit">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(q)}
                  className="btn-action-delete"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : isLoaded ? (
          <EmptyState message="Belum ada soal." />
        ) : (
          <EmptyState message="Memuat data soal dari database..." />
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Hapus Soal"
        message={`Apakah Anda yakin ingin menghapus soal "${deleteTarget?.pertanyaan}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

export default function SoalPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<EmptyState message="Memuat kelola soal..." />}>
        <SoalContent />
      </Suspense>
    </AuthGuard>
  );
}
