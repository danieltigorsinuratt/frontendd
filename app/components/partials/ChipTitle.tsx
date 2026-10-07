interface ChipTitleProps {
  title: string;
}

export default function ChipTitle({ title }: ChipTitleProps) {
  return (
    <div className="chip-title-wrapper">
      <div className="chip-title">{title}</div>
    </div>
  );
}
