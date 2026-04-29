export type TRecipe = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  caloriesPerServing: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  rating: number;
};

export type TRecipesResponse = {
  recipes: TRecipe[];
  total: number;
  skip: number;
  limit: number;
};


export type TGetRecipesParams = {
  page: number;
  search?: string;
  cuisine?: string;
  sort?: string;
};