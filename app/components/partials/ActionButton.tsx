import Link from "next/link";

interface ActionButtonProps {
  href: string;
  label: string;
}

export default function ActionButton({ href, label }: ActionButtonProps) {
  return (
    <div className="action-bar">
      <Link href={href} className="btn-tambah">
        {label}
      </Link>
    </div>
  );
}
