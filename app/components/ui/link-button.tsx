import Link from "next/link";
import { buttonStyles } from "@/app/components/ui/button";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface LinkButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function LinkButton({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonStyles(variant, size, className)}>
      {children}
    </Link>
  );
}
