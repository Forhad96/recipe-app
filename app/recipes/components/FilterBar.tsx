"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowUpDown,} from "lucide-react";
import { useState, useEffect, useTransition, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Get values from URL (single source of truth)
    const searchFromURL = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "";

    // Local state only for input typing
    const [searchTerm, setSearchTerm] = useState(searchFromURL);
    const debouncedSearch = useDebounce(searchTerm, 500);


    // detect if user is actively typing
    const isTyping = searchTerm !== searchFromURL;

    // what input should show
    const displayValue = isTyping ? searchTerm : searchFromURL;
    // Centralized query updater
    const updateQuery = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(updates).forEach(([key, value]) => {
                if (value) params.set(key, value);
                else params.delete(key);
            });

            const newQuery = params.toString();
            const currentQuery = searchParams.toString();

            if (newQuery === currentQuery) return;

            startTransition(() => {
                router.replace(`/recipes/1?${newQuery}`);
            });
        },
        [searchParams, router, startTransition]
    );

    // Debounced search update
    useEffect(() => {
        updateQuery({
            search: debouncedSearch || null,
        });
    }, [debouncedSearch, updateQuery]);

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">

            {/* Search Input */}
            <div className="relative flex-1">
                <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isPending ? "text-orange-500" : "text-gray-400"
                        }`}
                    size={18}
                />
                <input
                    type="text"
                    value={displayValue}
                    placeholder="Search recipes (e.g. Pasta, Pizza)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-gray-200 bg-gray-50 text-black placeholder:text-gray-500 focus:ring-2 focus:ring-orange-500 outline-none transition-all border font-semibold"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>



                {/* Sort Filter */}
                <div className="relative">
                    <select
                        className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border-gray-200 bg-gray-50 text-black font-semibold outline-none focus:ring-2 focus:ring-orange-500 border cursor-pointer"
                        value={sort}
                        onChange={(e) =>
                            updateQuery({
                                sort: e.target.value || null,
                            })
                        }
                    >

                        <option value="">Sort By</option>
                        <option value="name-asc">Name (A–Z)</option>
                        <option value="caloriesPerServing-desc">Calories</option>
                    </select>
                    <ArrowUpDown
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                    />
                </div>

        </div>
    );
}