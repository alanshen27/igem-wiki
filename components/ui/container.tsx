import { cn } from "@/lib/utils";

/** Standard page gutter + max width. */
export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "wide" | "prose";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        size === "prose" && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
