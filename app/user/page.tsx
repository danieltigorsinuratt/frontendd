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
  UserStudent,
  getUsers,
  deleteUser,
} from "../../lib/users";

function UserContent() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<UserStudent[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<UserStudent | null>(null);

  const loadData = async () => {
    const data = await getUsers();
    setUsers(data);
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
    const success = await deleteUser(deleteTarget.id);
    if (success) {
      await loadData();
      setToastMessage(`User "${deleteTarget.nama}" berhasil dihapus.`);
    } else {
      setToastMessage("Gagal menghapus user.");
    }
    setDeleteTarget(null);
  };

  return (
    <>
      <ChipTitle title="Kelola User" />

      <ActionButton href="/user/create" label="TAMBAH USER" />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      <div className="materials-list">
        {isLoaded && users.length > 0 ? (
          users.map((u) => (
            <div key={u.id} className="material-card user-card">
              <div className="user-card-info">
                <div className="user-card-name">{u.nama}</div>
                <div className="user-card-school">
                  {u.kelas} | {u.asal_sekolah}
                </div>
              </div>
              <div className="user-card-actions">
                <Link href={`/user/${u.id}/edit`} className="btn-action-edit">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(u)}
                  className="btn-action-delete"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : isLoaded ? (
          <EmptyState message="Belum ada user/siswa." />
        ) : (
          <EmptyState message="Memuat data user dari database..." />
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Hapus User"
        message={`Apakah Anda yakin ingin menghapus user "${deleteTarget?.nama}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

export default function UserPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<EmptyState message="Memuat kelola user..." />}>
        <UserContent />
      </Suspense>
    </AuthGuard>
  );
}
