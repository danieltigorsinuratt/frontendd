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
  Material,
  getMaterials,
  deleteMaterial,
} from "../../lib/materials";

function MateriContent() {
  const searchParams = useSearchParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Material | null>(null);

  const loadData = async () => {
    const data = await getMaterials();
    setMaterials(data);
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
    const success = await deleteMaterial(deleteTarget.id);
    if (success) {
      await loadData();
      setToastMessage(`Materi "${deleteTarget.judul}" berhasil dihapus.`);
    } else {
      setToastMessage("Gagal menghapus materi.");
    }
    setDeleteTarget(null);
  };

  return (
    <>
      <ChipTitle title="Kelola Materi" />

      <ActionButton href="/materi/create" label="TAMBAH MATERI" />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      <div className="materials-list">
        {isLoaded && materials.length > 0 ? (
          materials.map((material) => (
            <div key={material.id} className="material-card">
              <div className="material-card-title">{material.judul}</div>
              <div className="material-card-actions">
                <Link
                  href={`/materi/${material.id}/edit`}
                  className="btn-action-edit"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(material)}
                  className="btn-action-delete"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : isLoaded ? (
          <EmptyState message="Belum ada materi." />
        ) : (
          <EmptyState message="Memuat data materi dari database..." />
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Hapus Materi"
        message={`Apakah Anda yakin ingin menghapus materi "${deleteTarget?.judul}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

export default function MateriPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<EmptyState message="Memuat kelola materi..." />}>
        <MateriContent />
      </Suspense>
    </AuthGuard>
  );
}
