"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Material,
  getStoredMaterials,
  deleteMaterial,
} from "../lib/materials";

function MateriContent() {
  const searchParams = useSearchParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const list = getStoredMaterials();
    setMaterials(list);
    setIsLoaded(true);

    const msg = searchParams.get("message");
    if (msg) {
      setSuccessMessage(msg);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  const handleDelete = (id: string, judul: string) => {
    if (confirm(`Yakin ingin menghapus materi "${judul}"?`)) {
      deleteMaterial(id);
      setMaterials(getStoredMaterials());
      setSuccessMessage("Materi berhasil dihapus");
    }
  };

  return (
    <>
      {/* Chip Judul Halaman */}
      <div className="chip-title-wrapper">
        <div className="chip-title">Kelola Materi</div>
      </div>

      {/* Tombol Tambah Materi di Sisi Kanan */}
      <div className="action-bar">
        <Link href="/materi/create" className="btn-tambah">
          TAMBAH MATERI
        </Link>
      </div>

      {/* Flash Message Sukses */}
      {successMessage && (
        <div className="alert-success">
          {successMessage}
        </div>
      )}

      {/* Daftar Materi */}
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
                  onClick={() => handleDelete(material.id, material.judul)}
                  className="btn-action-delete"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : isLoaded ? (
          <div className="empty-state">Belum ada materi.</div>
        ) : (
          <div className="empty-state">Memuat data materi...</div>
        )}
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="empty-state">Memuat halaman...</div>}>
      <MateriContent />
    </Suspense>
  );
}
