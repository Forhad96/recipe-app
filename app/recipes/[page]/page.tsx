import { getRecipes } from "@/lib/api/recipes";
import Link from "next/link";
import { notFound } from "next/navigation";
import RecipeCard from "../components/RecipeCard";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { getVisiblePages } from "@/lib/utils";
import FilterBar from "../components/FilterBar";

export default async function RecipesPage({ params , searchParams }: { params: Promise<{ page: string }>, searchParams: Promise<{ search?: string, cuisine?: string, sort?: string }> }) {
  const page = Number((await params).page) || 1;
const { search, cuisine, sort } = await searchParams;
  if (isNaN(page) || page < 1) notFound();

 const { recipes, total } = await getRecipes({ 
    page: page, 
    search, 
    cuisine, 
    sort 
  });
  const totalPages = Math.ceil(total / 9);

  if (page > totalPages && total > 0) notFound();
const visiblePages = getVisiblePages(page, totalPages);


  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Editorial Header */}
      <header className="bg-white border-b border-gray-100 mb-10">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
                <LayoutGrid size={14} />
                <span>Our Collection</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Master the Kitchen
              </h1>
              <p className="text-gray-500 text-lg max-w-md">
                Browse through {total} hand-picked recipes designed for both beginners and pro chefs.
              </p>
            </div>
            <div className="text-sm font-medium text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              Page {page} of {totalPages}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4">

        <FilterBar/>
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recipes.map((recipe, index) => (
            <div 
              key={recipe.id} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>

        {/* Improved Pagination */}
        <nav className="flex items-center justify-center gap-2">
          {page > 1 ? (
            <Link
              href={`/recipes/${page - 1}`}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm"
              aria-label="Previous Page"
            >
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed">
              <ChevronLeft size={20} />
            </div>
          )}

          <div className="flex items-center gap-1.5 px-2">
            {visiblePages.map((p, i) => (
              typeof p === "number" ? (
                <Link
                  key={i}
                  href={`/recipes/${p}`}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                    p === page
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                  }`}
                >
                  {p}
                </Link>
              ) : (
                <span key={i} className="px-2 text-gray-400 font-bold">
                  {p}
                </span>
              )
            ))}
          </div>

          {page < totalPages ? (
            <Link
              href={`/recipes/${page + 1}`}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight size={20} />
            </Link>
          ) : (
            <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed">
              <ChevronRight size={20} />
            </div>
          )}
        </nav>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const { total } = await getRecipes({ page: 1 });
  const totalPages = Math.ceil(total / 9);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}