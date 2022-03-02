import {
  List,
  ListItem,
  Slider,
  ListItemText,
  TextField,
  Stack,
} from '@mui/material';
import { ChangeEventHandler, FocusEventHandler, SyntheticEvent } from 'react';
import {
  Recipe as RecipeType,
  RecipeIngredient,
} from '../../../../../types/recipeType';
import { unitList } from '../../../../../utils/dictionary';
import { recipeTypeToUnit } from '../../../../../utils/functions';
import { FullRecipePrint } from '../../../FullRecipePrint';

interface FullRecipeInfoIngredientsProps {
  ingredients?: RecipeIngredient[];
  calcUnitValue: number;
  handleInputChange: ChangeEventHandler;
  handleInputBlur: FocusEventHandler;
  handleSliderChange: (
    event: Event | SyntheticEvent,
    value: number | number[]
  ) => void;
  recipe: RecipeType;
}

export const FullRecipeInfoIngredients = ({
  ingredients,
  calcUnitValue,
  handleInputChange,
  handleInputBlur,
  handleSliderChange,
  recipe,
}: FullRecipeInfoIngredientsProps) => {
  const recipeType = recipeTypeToUnit(recipe.type)

  return ingredients ? (
    <Stack alignItems={'center'}>
      <TextField
        value={calcUnitValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        label={
          recipeType === 'volume'
            ? 'Объем мл.'
            : 'Диаметр коржа см.'
        }
        variant="outlined"
        fullWidth
        sx={{
          '& input': {
            textAlign: 'center',
          },
          maxWidth: 180,
          mb: 1.5,
        }}
      />
      <Slider
        value={calcUnitValue}
        onChange={handleSliderChange}
        min={recipeType === 'volume' ? 100 : 5}
        max={recipeType === 'volume' ? 5000 : 50}
        sx={{ maxWidth: 400 }}
      />
      <List sx={{ width: '100%' }}>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index} divider sx={{ px: 0 }}>
            <ListItemText primary={ingredient.name} />
            <ListItemText
              primary={ingredient.count + ' ' + unitList[ingredient.unit]}
              sx={{
                textAlign: 'end',
                pl: { xs: 2, sm: 3 },
                whiteSpace: 'nowrap',
                flex: '0 0 auto',
              }}
            />
          </ListItem>
        ))}
      </List>
      <FullRecipePrint
        recipe={{
          ...recipe,
          ingredients,
          unitValue: calcUnitValue
        }}
      />
    </Stack>
  ) : null; // выведем лоадер
};
