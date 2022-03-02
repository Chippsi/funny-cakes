import { user } from './authZTypes';

export interface RecipeIngredient {
  name: string;
  unit: string;
  count: number;
}

export interface RecipeInstruction {
  text: string;
  imgURL?: string;
}

export interface Recipe {
  id: string;
  type: string;
  unitValue: number;
  title: string;
  description: string;
  owner: user;
  date: number;
  duration: number;
  imgUrl: string;
  tags: string[];
  ingredients: RecipeIngredient[];
  recipeText: RecipeInstruction[];
}

export interface SliceRecipesStatus {
  loadedAll: boolean;
  loading: boolean;
  error: string | null;
}

export interface SliceRecipes {
  status: SliceRecipesStatus;
  recipes: Recipe[];
}
