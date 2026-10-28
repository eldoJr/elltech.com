import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-50">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.svg" alt="Elltech" width={20} height={41} />
        <span className="font-monument text-sm tracking-tight">elltech</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="#work" className="hover:text-accent transition-colors">work</Link>
        <Link href="#about" className="hover:text-accent transition-colors">about</Link>
        <Link href="#contact" className="text-accent-secondary bg-accent px-3 py-1 hover:opacity-90 transition-opacity">contact</Link>
      </nav>
    </header>
  );
}
