import { cn } from "@/lib/utils";

interface BentoLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoLayout({
  children,
  className,
  ...props
}: BentoLayoutProps) {
  return (
    <div
      className={cn(
        "border-grayscale-400 rounded-lg border bg-white p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
