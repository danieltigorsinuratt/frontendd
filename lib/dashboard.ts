import { apiFetch } from "./api";

export interface DashboardStats {
  totalSiswa: number;
  totalMateri: number;
  totalSoal: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const stats = await apiFetch<DashboardStats>("/dashboard/stats");
    return stats;
  } catch (err) {
    console.error("Gagal mengambil statistik dashboard dari API:", err);
    return {
      totalSiswa: 0,
      totalMateri: 0,
      totalSoal: 0,
    };
  }
}
