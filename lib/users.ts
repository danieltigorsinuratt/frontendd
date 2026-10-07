import { apiFetch } from "./api";

export interface UserStudent {
  id: string;
  nama: string;
  kelas: string;
  asal_sekolah: string;
  created_at?: string;
}

export async function getUsers(): Promise<UserStudent[]> {
  try {
    const list = await apiFetch<UserStudent[]>("/users");
    return list.map((u) => ({ ...u, id: u.id.toString() }));
  } catch (err) {
    console.error("Gagal memuat user dari API:", err);
    return [];
  }
}

export async function getUserById(id: string): Promise<UserStudent | undefined> {
  try {
    const item = await apiFetch<UserStudent>(`/users/${id}`);
    return { ...item, id: item.id.toString() };
  } catch (err) {
    console.error(`Gagal memuat detail user ${id}:`, err);
    return undefined;
  }
}

export async function createUser(nama: string, kelas: string, asal_sekolah: string): Promise<UserStudent> {
  const result = await apiFetch<UserStudent>("/users", {
    method: "POST",
    body: JSON.stringify({ nama, kelas, asal_sekolah }),
  });
  return { ...result, id: result.id.toString() };
}

export async function updateUser(
  id: string,
  nama: string,
  kelas: string,
  asal_sekolah: string
): Promise<UserStudent | null> {
  try {
    const result = await apiFetch<UserStudent>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ nama, kelas, asal_sekolah }),
    });
    return { ...result, id: result.id.toString() };
  } catch (err) {
    console.error(`Gagal mengupdate user ${id}:`, err);
    return null;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await apiFetch(`/users/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (err) {
    console.error(`Gagal menghapus user ${id}:`, err);
    return false;
  }
}
