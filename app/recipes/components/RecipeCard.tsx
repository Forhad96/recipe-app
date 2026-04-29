import { TRecipe } from "@/types/recipes";
import Image from "next/image";
import Link from "next/link";
import { Star, Flame } from "lucide-react";

// We pass 'currentPage' as a prop so the link structure is /recipes/[page]/[id]
export default function RecipeCard({ 
  recipe, 
  currentPage = 1 
}: { 
  recipe: TRecipe; 
  currentPage?: number 
}) {
  return (
    <Link 
      href={`/recipes/${currentPage}/${recipe.id}`}
      className="group block relative overflow-hidden rounded-4xl border border-gray-100 bg-white hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Glassmorphism Badge */}
        <div className="absolute top-4 right-4 backdrop-blur-md bg-white/70 border border-white/20 px-3 py-1 rounded-full shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-500">
            {recipe.cuisine}
          </span>
          <div className="flex items-center gap-1 text-gray-400">
             <Star size={12} className="fill-orange-400 text-orange-400" />
             <span className="text-xs font-bold text-gray-700">{recipe.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-4 group-hover:text-orange-600 transition-colors line-clamp-1">
          {recipe.name}
        </h3>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Flame size={14} className="text-orange-500" />
            <span className="text-xs font-medium">{recipe.caloriesPerServing} kcal</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="text-xs font-medium text-gray-500">{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
        </div>
      </div>
    </Link>
  );
}