import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from '@mui/material';

import { PrintComponent } from './PrintComponent';
import { Recipe } from '../../../types/recipeType';

interface FullRecipePrintProps {
  recipe: Recipe;
}

export const FullRecipePrint = ({ recipe }: FullRecipePrintProps) => {
  const componentRef = useRef(null);
  
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            Напечатать рецепт
          </Button>
        )}
        content={() => componentRef.current}
      />
      {recipe ? <PrintComponent recipe={recipe} ref={componentRef} /> : null}
    </>
  );
};
