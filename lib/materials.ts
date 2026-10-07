export interface Material {
  id: string;
  judul: string;
  deskripsi: string;
  created_at: string;
}

const DEFAULT_MATERIALS: Material[] = [
  {
    id: "1",
    judul: "Mengenal Bilangan",
    deskripsi:
      "Bilangan dapat diurutkan dari yang terkecil hingga terbesar dengan membandingkan nilai tempatnya. Bilangan dengan ratusan yang lebih kecil diletakkan lebih dahulu. Jadi, urutan bilangan dari yang terkecil adalah 125, 238, 341, kemudian 456.",
    created_at: new Date().toISOString(),
  },
];

const STORAGE_KEY = "mathventure_materials_v2";

export function getStoredMaterials(): Material[] {
  if (typeof window === "undefined") {
    return DEFAULT_MATERIALS;
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MATERIALS));
      return DEFAULT_MATERIALS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_MATERIALS;
  }
}

export function saveStoredMaterials(materials: Material[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
  }
}

export function getMaterialById(id: string): Material | undefined {
  const list = getStoredMaterials();
  return list.find((m) => m.id === id);
}

export function createMaterial(judul: string, deskripsi: string): Material {
  const list = getStoredMaterials();
  const newMaterial: Material = {
    id: Date.now().toString(),
    judul,
    deskripsi,
    created_at: new Date().toISOString(),
  };
  const updated = [...list, newMaterial];
  saveStoredMaterials(updated);
  return newMaterial;
}

export function updateMaterial(id: string, judul: string, deskripsi: string): Material | null {
  const list = getStoredMaterials();
  const index = list.findIndex((m) => m.id === id);
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    judul,
    deskripsi,
  };
  saveStoredMaterials(list);
  return list[index];
}

export function deleteMaterial(id: string): boolean {
  const list = getStoredMaterials();
  const filtered = list.filter((m) => m.id !== id);
  if (filtered.length === list.length) return false;
  saveStoredMaterials(filtered);
  return true;
}
