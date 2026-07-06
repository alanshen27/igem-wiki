import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-ink/10 bg-milk/60 p-6 backdrop-blur-sm",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
