import { apiFetch } from "./api";

export interface Material {
  id: string;
  judul: string;
  deskripsi: string;
  created_at?: string;
}

export async function getMaterials(): Promise<Material[]> {
  try {
    const list = await apiFetch<Material[]>("/materials");
    return list.map((m) => ({ ...m, id: m.id.toString() }));
  } catch (err) {
    console.error("Gagal memuat materi dari API:", err);
    return [];
  }
}

export async function getMaterialById(id: string): Promise<Material | undefined> {
  try {
    const item = await apiFetch<Material>(`/materials/${id}`);
    return { ...item, id: item.id.toString() };
  } catch (err) {
    console.error(`Gagal memuat detail materi ${id}:`, err);
    return undefined;
  }
}

export async function createMaterial(judul: string, deskripsi: string): Promise<Material> {
  const result = await apiFetch<Material>("/materials", {
    method: "POST",
    body: JSON.stringify({ judul, deskripsi }),
  });
  return { ...result, id: result.id.toString() };
}

export async function updateMaterial(id: string, judul: string, deskripsi: string): Promise<Material | null> {
  try {
    const result = await apiFetch<Material>(`/materials/${id}`, {
      method: "PUT",
      body: JSON.stringify({ judul, deskripsi }),
    });
    return { ...result, id: result.id.toString() };
  } catch (err) {
    console.error(`Gagal mengupdate materi ${id}:`, err);
    return null;
  }
}

export async function deleteMaterial(id: string): Promise<boolean> {
  try {
    await apiFetch(`/materials/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (err) {
    console.error(`Gagal menghapus materi ${id}:`, err);
    return false;
  }
}
