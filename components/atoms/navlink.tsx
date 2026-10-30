import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: Props) {
  return (
    <Link href={href} className="navlink font-monument">
      {label}
    </Link>
  );
}
