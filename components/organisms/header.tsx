"use client";

import { Fragment } from "react";
import Logo from "@/components/atoms/logo";
import Link from "next/link";
import ThemeToggle from "@/components/atoms/toggle";
import NavLink from "@/components/atoms/navlink";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
];

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "color-mix(in srgb, var(--bg-default) 85%, transparent)",
        borderBottom: "1px solid var(--border-default)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        className="mx-auto max-w-7xl flex items-center"
        style={{ height: "52px", padding: "0 var(--space-6)" }}
      >
        {/* logo + label */}
        <Link
          href="/"
          className="flex items-center shrink-0"
          style={{ gap: "var(--space-2)" }}
        >
          <Logo size={42} />
          <span
            className="font-monument tracking-tight"
            style={{ fontSize: "var(--font-size-base)", color: "var(--fg-primary)", fontWeight: 500, textTransform: "capitalize" }}
          >
            elltech
          </span>
        </Link>

        {/* divider */}
        <div
          style={{
            width: "1px",
            height: "16px",
            background: "var(--border-default)",
            margin: "0 var(--space-6)",
            flexShrink: 0,
          }}
        />

        {/* nav links — centered */}
        <nav className="flex items-center justify-center flex-1">
          {links.map((l, i) => (
            <Fragment key={l.href}>
              {i > 0 && (
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--fg-muted)",
                    flexShrink: 0,
                    margin: "0 var(--space-3)",
                    display: "inline-block",
                  }}
                />
              )}
              <NavLink key={l.href} href={l.href} label={l.label} />
            </Fragment>
          ))}
        </nav>

        {/* right actions */}
        <div className="flex items-center shrink-0" style={{ gap: "var(--space-2)" }}>
          <ThemeToggle />

          {/* divider */}
          <div
            style={{
              width: "1px",
              height: "16px",
              background: "var(--border-default)",
              margin: "0 var(--space-1)",
            }}
          />

          <Link
            href="#contact"
            className="font-monument"
            style={{
              fontSize: "var(--font-size-base)",
              fontWeight: 500,
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-sm)",
              background: "var(--accent-secondary)",
              color: "var(--fg-white)",
              transition: "var(--transition-fast)",
              letterSpacing: "0.02em",
              textTransform: "capitalize",
            }}
          >
            contacto
          </Link>

          <button
            aria-label="more options"
            className="flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-sm)",
              color: "var(--fg-muted)",
              transition: "var(--transition-fast)",
              background: "transparent",
              border: "1px solid var(--border-default)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--fg-primary)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <i className="bi bi-three-dots-vertical" style={{ fontSize: "14px" }} />
          </button>
        </div>
      </div>
    </header>
  );
}
