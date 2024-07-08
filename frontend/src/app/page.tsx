import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-full w-full flex-col gap-4">      
        <h1 className="text-4xl content-center">Restauranger™</h1>
        <p className="flex-wrap w-[50vw] text-center text-gray-300">The page for finding a restaurant in Stockholm just for you.</p>
    </main>
  );
}
