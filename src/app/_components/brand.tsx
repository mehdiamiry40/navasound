export function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 14v5m5-10v15m5-18v17m5-10v5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Brand() {
  return <><BrandMark /><span>NAVASOUND</span></>;
}
