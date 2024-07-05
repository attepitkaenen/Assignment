import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-full w-full flex-col">      
        <h1 className="text-4xl content-center">Restaurants™</h1>
        <p className="flex-wrap w-[50vw]">The page for finding a restaurant just for you.</p>
    </main>
  );
}
