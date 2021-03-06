import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { RecipesFeed } from '../RecipesFeed';
import { Recipe } from '../../types/recipeType';
import { useSelector } from 'react-redux';
import {
  selectRecipeById,
  selectRecipesByType,
  selectRecipesStatus,
} from '../../store/slices/recipes/recipesSelectors';
import { useFirebase } from '../../hooks/useFirebase';
import { RecipeBuilder } from './RecipeBuilder';
import { FullScreenModal } from '../FullScreenModal';
import { FullRecipeContainer } from '../FullRecipe';
import { MultiFullRecipeContainer } from '../MultiFullRecipe/MultiFullRecipeContainer';

interface SelectedType {
  [key: number]: Recipe[];
}

const steps = ['Бисквит', 'Крем', 'Покрытие'];

export const RecipeBuilderContainer = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recipeSelected, setRecipeSelected] = useState(false);
  const [resultRecipes, setResultRecipes] = useState<Recipe[]>([]);
  const [clickedRecipeId, setClickedRecipeId] = useState<string>('');
  const biscuitsRecipes = useSelector(selectRecipesByType('biscuit'));
  const creamRecipes = useSelector(selectRecipesByType('cream'));
  const surfaceRecipes = useSelector(selectRecipesByType('surface'));
  const clickedRecipe = useSelector(selectRecipeById(clickedRecipeId));
  const { getRecipes } = useFirebase();
  const { loadedAll } = useSelector(selectRecipesStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loadedAll) {
      getRecipes();
    }
  }, []);

  const handleNext = () => {
    setRecipeSelected(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOpenModal = (recipe: Recipe) => {
    setClickedRecipeId(recipe.id);
    setIsModalOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSelect = () => {
    const resultRecipeCopy = resultRecipes;
    if (!clickedRecipe) {
      return;
    }
    resultRecipeCopy[activeStep] = clickedRecipe;
    setRecipeSelected(true);
    setResultRecipes(resultRecipeCopy);
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const recipeBuilderProps = {
    steps,
    activeStep,
    resultRecipes,
    recipeSelected,
    handleBack,
    handleNext,
  };

  const selectedType: SelectedType = {
    0: biscuitsRecipes,
    1: creamRecipes,
    2: surfaceRecipes,
    3: [],
  };

  const recipeFeedProps = {
    handleCardClick: handleOpenModal,
    recipes: selectedType[activeStep],
    idCardSelected: resultRecipes[activeStep]?.id,
  };

  return activeStep !== steps.length ? (
    <Container sx={{ pt: 4 }}>
      <FullScreenModal
        isOpen={isModalOpen}
        handleClose={handleClose}
        handleSelect={handleSelect}
      >
        <FullRecipeContainer recipeId={clickedRecipeId} />
      </FullScreenModal>
      <RecipeBuilder {...recipeBuilderProps} />
      <RecipesFeed {...recipeFeedProps} />
    </Container>
  ) : (
    <MultiFullRecipeContainer recipes={resultRecipes} animateDuration={400} />
  );
};
