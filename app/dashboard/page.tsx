"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import ChipTitle from "../components/partials/ChipTitle";
import StatCard from "../components/partials/StatCard";
import { getDashboardStats, DashboardStats } from "../../lib/dashboard";

function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalMateri: 0,
    totalSoal: 0,
  });

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  return (
    <>
      <ChipTitle title="Dashboard" />

      <div className="dashboard-grid">
        <div className="dashboard-row-top">
          <StatCard
            title="Total Siswa"
            count={stats.totalSiswa}
            variant="purple"
            iconType="siswa"
          />
          <StatCard
            title="Total Materi"
            count={stats.totalMateri}
            variant="pink"
            iconType="materi"
          />
        </div>

        <div className="dashboard-row-bottom">
          <StatCard
            title="Total Soal"
            count={stats.totalSoal}
            variant="blue"
            iconType="soal"
          />
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
