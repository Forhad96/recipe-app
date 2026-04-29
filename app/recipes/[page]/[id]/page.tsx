import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Users, Flame, ChevronLeft, Star } from "lucide-react";
import { getRecipeById } from "@/lib/api/recipes";

type Props = {
  params: Promise<{ page: string; id: string }>;
};

export default async function RecipeDetailPage({ params }: Props) {
  const { page, id } = await params;

  const recipe = await getRecipeById(Number(id));
  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Made Sticky for better UX */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href={`/recipes/${page}`}
            className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Recipes
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Image Section - Adjusted aspect ratio for mobile */}
          <div className="relative aspect-video lg:aspect-4/5 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-50">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-white/95 backdrop-blur shadow-sm rounded-full text-[10px] font-bold text-gray-900 uppercase tracking-wider">
                {recipe.cuisine}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3 text-orange-500">
              <Star className="fill-current w-4 h-4" />
              <span className="font-bold text-xs md:text-sm">
                {recipe.rating} ({recipe.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 md:mb-8 tracking-tight leading-tight">
              {recipe.name}
            </h1>

            {/* Quick Stats - Responsive grid padding */}
            <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 mb-8 md:mb-10">
              <div className="bg-white p-4 md:p-6 text-center">
                <Clock className="mx-auto mb-2 text-orange-500/80" size={18} />
                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Time</p>
                <p className="font-bold text-gray-900 text-sm md:text-base">{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</p>
              </div>
              <div className="bg-white p-4 md:p-6 text-center">
                <Users className="mx-auto mb-2 text-orange-500/80" size={18} />
                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Serves</p>
                <p className="font-bold text-gray-900 text-sm md:text-base">{recipe.servings}</p>
              </div>
              <div className="bg-white p-4 md:p-6 text-center">
                <Flame className="mx-auto mb-2 text-orange-500/80" size={18} />
                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Calories</p>
                <p className="font-bold text-gray-900 text-sm md:text-base">{recipe.caloriesPerServing}</p>
              </div>
            </div>

            <div className="space-y-10 md:space-y-12">
              {/* Ingredients */}
              <section>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                  Ingredients
                  <span className="h-px flex-1 bg-gray-100"></span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recipe.ingredients.map((ing: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <span className="text-sm font-medium leading-tight">{ing}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Instructions */}
              <section>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                  Instructions
                  <span className="h-px flex-1 bg-gray-100"></span>
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {recipe.instructions.map((step: string, i: number) => (
                    <div key={i} className="group flex gap-4 md:gap-6">
                      <span className="shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-2xl bg-orange-50 text-orange-600 text-xs md:text-sm font-bold group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {i + 1}
                      </span>
                      <p className="text-gray-600 leading-relaxed pt-1 text-sm md:text-base">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}