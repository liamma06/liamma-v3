export function FadeIn({
  children,
  step = 0,
  className = "",
}: {
  children: React.ReactNode;
  step?: number;
  className?: string;
}) {
  return (
    <div
      className={`fade-in-section ${className}`}
      style={{ animationDelay: `${step * 110}ms` }}
    >
      {children}
    </div>
  );
}
