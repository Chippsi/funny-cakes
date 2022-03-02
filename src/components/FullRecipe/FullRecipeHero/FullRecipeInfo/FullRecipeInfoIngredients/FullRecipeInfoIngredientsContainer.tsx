import {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FullRecipeInfoIngredients } from '.';
import { Recipe, RecipeIngredient } from '../../../../../types/recipeType';
import { recipeTypeToUnit } from '../../../../../utils/functions';

interface FullRecipeInfoIngredientsContainerProps {
  recipe: Recipe;
}

export const FullRecipeInfoIngredientsContainer = ({
  recipe,
}: FullRecipeInfoIngredientsContainerProps) => {
  const [calcUnitValue, setCalcUnitValue] = useState<number>(0);
  const [ingredients, setIngredients] = useState<
    RecipeIngredient[] | undefined
  >();
  const calcUnit = recipeTypeToUnit(recipe.type);
  const baseCalcUnitValue = Number(recipe?.unitValue);

  useEffect(() => {
    if (recipe) {
      setCalcUnitValue(Number(recipe.unitValue));
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newCalcUnitValue = Number(e.target.value);

    if (Number.isNaN(newCalcUnitValue)) {
      return;
    }

    if (calcUnit === 'volume') {
      if (newCalcUnitValue > 5000) {
        newCalcUnitValue = 5000;
      }
    } else {
      if (newCalcUnitValue > 50) {
        newCalcUnitValue = 50;
      }
    }

    setCalcUnitValue(newCalcUnitValue);
    calcIngredients(baseCalcUnitValue, newCalcUnitValue);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    let newCalcUnitValue = Number(e.target.value);

    if (Number.isNaN(newCalcUnitValue)) {
      return;
    }

    if (calcUnit === 'volume') {
      if (newCalcUnitValue < 100) {
        newCalcUnitValue = 100;
      }
    } else {
      if (newCalcUnitValue < 1) {
        newCalcUnitValue = 1;
      }
    }

    setCalcUnitValue(newCalcUnitValue);
    calcIngredients(baseCalcUnitValue, newCalcUnitValue);
  };

  const handleSliderChange = (
    event: Event | SyntheticEvent,
    value: number | number[]
  ) => {
    value = Array.isArray(value) ? baseCalcUnitValue : Number(value)
    const newCalcUnitValue = Number(value);
    setCalcUnitValue(value);
    calcIngredients(baseCalcUnitValue, newCalcUnitValue);
  };

  const calcIngredients = useDebouncedCallback(
    (baseUnitValue: number, newUnitValue: number) => {
      
      let factor: number = calcUnit === 'volume' ?
      newUnitValue / baseUnitValue
      :
      Math.pow(newUnitValue, 2) / Math.pow(baseUnitValue, 2);

      setIngredients((prevIngredients) => {
        if (prevIngredients) {
          return recipe?.ingredients.map((ingredient: any) => {
            return {
              ...ingredient,
              count: Number((ingredient.count * factor).toFixed(2)),
            };
          });
        }
      });
    },
    300
  );
    
  return (
    <FullRecipeInfoIngredients
      ingredients={ingredients}
      calcUnitValue={calcUnitValue}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      handleSliderChange={handleSliderChange}
      recipe={recipe as Recipe}
    />
  );
};
