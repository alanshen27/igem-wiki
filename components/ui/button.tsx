import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-milk hover:bg-ink-2 hover:-translate-y-0.5 shadow-lg shadow-ink/20",
        signal:
          "bg-signal text-ink hover:brightness-110 hover:-translate-y-0.5 font-semibold shadow-lg shadow-signal/25",
        pink:
          "bg-pink text-ink hover:brightness-110 hover:-translate-y-0.5 font-semibold shadow-lg shadow-pink/25",
        outline:
          "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-milk",
        ghost: "text-ink hover:bg-ink/5",
        onDark:
          "border border-milk/25 text-milk hover:bg-milk hover:text-ink backdrop-blur-sm",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
