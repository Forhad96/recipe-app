import { TGetRecipesParams, TRecipesResponse } from '@/types/recipes';
// Base URL for the DummyJSON API
const baseURL = 'https://dummyjson.com/recipes';
const PER_PAGE = 9;

export const getRecipes = async ({
  page,
  search,
  cuisine,
  sort,
}: TGetRecipesParams): Promise<TRecipesResponse> => {
  const skip = (page - 1) * PER_PAGE;
  let sortParams = {};

  if (sort) {
    const [sortBy, order] = sort.split('-');
    if (sortBy && order) {
      sortParams = { sortBy, order };
    }
  }

  const params = new URLSearchParams({
    limit: String(PER_PAGE),
    skip: String(skip),
    ...(search && { q: search }),
    ...(cuisine && { cuisine }),
    ...sortParams,
  });

  const url = search ? `${baseURL}/search?${params}` : `${baseURL}?${params}`;
  const token = process.env.WAF_TOKEN;

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'x-waf-token': token || '' },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch recipes');

  return res.json();
};

export const getRecipeById = async (id: number) => {
  try {
    // Basic validation to prevent unnecessary API calls
    if (!id || isNaN(id)) return null;
    const token = process.env.WAF_TOKEN;
    const res = await fetch(`${baseURL}/${id}`, {
      method: 'GET',
      headers: {
        'x-waf-token': token || '',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // If DummyJSON returns 404, res.ok will be false
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null; // Return null so the component knows something went wrong
  }
};
