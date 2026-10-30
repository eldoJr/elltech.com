import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  children: ReactNode;
  style?: CSSProperties;
}

export default function Button({ href, onClick, variant = "primary", children, style }: Props) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    padding: "var(--space-2) var(--space-5)",
    borderRadius: "var(--radius-sm)",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.01em",
    transition: "var(--transition-fast)",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
  };

  const variants: Record<string, CSSProperties> = {
    primary: {
      background: "var(--fg-primary)",
      color: "var(--bg-default)",
      border: "1px solid transparent",
    },
    ghost: {
      background: "transparent",
      color: "var(--fg-primary)",
      border: "1px solid var(--border-default)",
    },
  };

  const combined = { ...base, ...variants[variant], ...style };

  if (href) return <Link href={href} style={combined} className={`btn-${variant}`}>{children}</Link>;
  return <button onClick={onClick} style={combined} className={`btn-${variant}`}>{children}</button>;
}
