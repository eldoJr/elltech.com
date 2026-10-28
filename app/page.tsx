import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Image src="/logo.svg" alt="Elltech" width={20} height={41} />
      <h1 className="text-xl font-semibold tracking-tight">Elltech</h1>
      <p className="text-sm text-gray-500">Design digital systems for scalability.</p>
    </main>
  );
}
