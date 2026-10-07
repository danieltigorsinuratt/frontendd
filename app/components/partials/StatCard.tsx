import React from "react";

export type StatVariant = "purple" | "pink" | "blue";

interface StatCardProps {
  title: string;
  count: number;
  variant: StatVariant;
  iconType: "siswa" | "materi" | "soal";
}

export default function StatCard({ title, count, variant, iconType }: StatCardProps) {
  const renderIcon = () => {
    if (iconType === "siswa") {
      return (
        <div className="stat-icon-wrapper stat-icon-siswa">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="30" fill="#FFE5D9" />
            <path
              d="M32 14C23.163 14 16 21.163 16 30C16 33.6 17.2 36.9 19.2 39.6C19.2 39.6 21 34 32 34C43 34 44.8 39.6 44.8 39.6C46.8 36.9 48 33.6 48 30C48 21.163 40.837 14 32 14Z"
              fill="#4A3E3D"
            />
            <circle cx="32" cy="32" r="13" fill="#FED8B1" />
            <circle cx="28" cy="31" r="2" fill="#333" />
            <circle cx="36" cy="31" r="2" fill="#333" />
            <path d="M30 35C30.8 36 33.2 36 34 35" stroke="#E57373" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 22L23 26" stroke="#FFA726" strokeWidth="3" strokeLinecap="round" />
            <path d="M45 22L41 26" stroke="#FFA726" strokeWidth="3" strokeLinecap="round" />
            <path
              d="M17 56C19 46 25 43 32 43C39 43 45 46 47 56"
              fill="#4FC3F7"
              stroke="#0288D1"
              strokeWidth="2"
            />
          </svg>
        </div>
      );
    }

    if (iconType === "materi") {
      return (
        <div className="stat-icon-wrapper stat-icon-materi">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="30" fill="#EF476F" />
            {/* Book */}
            <rect x="20" y="16" width="26" height="34" rx="4" fill="#FFD166" transform="rotate(-6 20 16)" />
            {/* Spiral binding */}
            <line x1="17" y1="20" x2="21" y2="19" stroke="#073B4C" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="26" x2="22" y2="25" stroke="#073B4C" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="32" x2="23" y2="31" stroke="#073B4C" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="38" x2="24" y2="37" stroke="#073B4C" strokeWidth="2" strokeLinecap="round" />
            <line x1="21" y1="44" x2="25" y2="43" stroke="#073B4C" strokeWidth="2" strokeLinecap="round" />
            {/* MATH text label */}
            <rect x="25" y="24" width="16" height="8" rx="2" fill="#EF476F" transform="rotate(-6 25 24)" />
            <text x="27" y="30" fill="#FFF" fontSize="6" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-6 27 30)">MATH</text>
            {/* Compass / Ruler */}
            <path d="M26 44L44 32" stroke="#118AB2" strokeWidth="3" strokeLinecap="round" />
            <path d="M34 47L40 27" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );
    }

    // Soal (Pencil)
    return (
      <div className="stat-icon-wrapper stat-icon-soal">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <circle cx="32" cy="32" r="30" fill="#70C1B3" />
          <path
            d="M42 20L44 22C45.3 23.3 45.3 25.4 44 26.7L27 43.7L20 45L21.3 38L38.3 21C39.6 19.7 41.7 19.7 43 21L42 20Z"
            fill="#FFE66D"
            stroke="#2E4057"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M36 24L41 29" stroke="#2E4057" strokeWidth="2" />
          <path d="M20 45L24 41" stroke="#2E4057" strokeWidth="2" />
          <path d="M20 45L22 40L25 43L20 45Z" fill="#F25F5C" />
        </svg>
      </div>
    );
  };

  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-card-header">{renderIcon()}</div>
      <div className="stat-card-title">{title}</div>
      <div className="stat-card-count">{count}</div>
    </div>
  );
}
