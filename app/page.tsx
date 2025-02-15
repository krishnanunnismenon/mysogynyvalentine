import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl md:text-6xl font-bold text-center mb-8 relative">
        <span className="text-red-600 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full pb-6">
          RizzEttayi
        </span>
        Created for
        <span className="text-orange-500"> Ettayi&apos;s</span> All over the world
      </h1>

      <div className="grid grid-cols-1  gap-4 max-w-2xl w-full">
        <FeatureButton href="/rizz-me" text="Rizz Me" />
        <FeatureButton href="/rizz-meter" text="Rizz Meter" />
        <FeatureButton href="/rizz-mail" text="Rizz Mail" />
        
      </div>

      <footer className="mt-12 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Totally not for kunuvavaas
      </footer>
    </main>
  )
}

function FeatureButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="block ">
      <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
        {text}
      </button>
    </Link>
  )
}

