import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 relative">
        <span className="text-red-600 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
          Alpha Male
        </span>
        A site for <span className="text-black line-through">Mysogynistic</span>
        <span className="text-red-600"> AWESOME</span> people
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        <FeatureButton href="/pickup-lines" text="Cringeworthy Pickup Lines" />
        <FeatureButton href="/gym-selfies" text="Upload Gym Selfies" />
        <FeatureButton href="/protein-shakes" text="Protein Shake Recipes" />
        <FeatureButton href="/date-ideas" text="Alpha Date Ideas" />
        <FeatureButton href="/compliments" text="Backhanded Compliments" />
        <FeatureButton href="/peacocking" text="Peacocking Tips" />
      </div>

      <footer className="mt-12 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Totally Not Toxic Enterprises
      </footer>
    </main>
  )
}

function FeatureButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="block">
      <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
        {text}
      </button>
    </Link>
  )
}

