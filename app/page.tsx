import Header from "@/components/organisms/header";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Header />
      <h1 className="text-xl font-semibold tracking-tight">Elltech</h1>
      <p className="text-sm text-gray-500">Design digital systems for scalability.</p>
    </main>
  );
}
