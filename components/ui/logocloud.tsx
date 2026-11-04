import { cn } from "@/lib/utils";

type Logo = { src: string; alt: string };

type LogoCloudProps = React.ComponentProps<"div"> & { logos: Logo[] };

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn("grid gap-px bg-black/10", className)}
      {...props}
    >
      {logos.map((logo) => (
        <div
          key={logo.alt}
          className="flex items-center justify-center bg-[#E9EDEF] p-5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={logo.alt}
            src={logo.src}
            loading="lazy"
            style={{ width: 40, height: 40, objectFit: "contain", display: "block" }}
          />
        </div>
      ))}
    </div>
  );
}

export default LogoCloud;
