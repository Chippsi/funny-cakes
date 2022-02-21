import {
  List,
  ListItem,
  Slider,
  ListItemText,
  TextField,
  Stack,
} from '@mui/material';
import { ChangeEventHandler, SyntheticEvent } from 'react';
import {
  Recipe as RecipeType,
  RecipeIngredient,
} from '../../../../../types/recipeType';
import { unitList } from '../../../../../utils/dictionary';
import { FullRecipePrint } from '../../../FullRecipePrint';

interface FullRecipeInfoIngredientsProps {
  customIngredients?: RecipeIngredient[];
  diameter: number | number[];
  handleInputChange: ChangeEventHandler;
  handleSliderChange: (
    event: Event | SyntheticEvent,
    value: number | number[]
  ) => void;
  recipe: RecipeType;
}

export const FullRecipeInfoIngredients = ({
  diameter,
  customIngredients,
  handleInputChange,
  handleSliderChange,
  recipe,
}: FullRecipeInfoIngredientsProps) => {
  const diametrPrint = typeof diameter === 'number' ? diameter : diameter[0]; //Какой-то костыль для ТС
  return customIngredients ? (
    <Stack alignItems={'center'}>
      <TextField
        value={diameter}
        onChange={handleInputChange}
        label="Диаметр коржа см."
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
        value={diameter}
        onChange={handleSliderChange}
        min={1}
        max={50}
        sx={{ maxWidth: 400 }}
      />
      <List sx={{ width: '100%' }}>
        {customIngredients.map((data, index) => (
          <ListItem key={index} divider sx={{ px: 0 }}>
            <ListItemText primary={data.name} />
            <ListItemText
              primary={data.count + ' ' + unitList[data.unit]}
              sx={{ textAlign: 'end' }}
            />
          </ListItem>
        ))}
      </List>
      <FullRecipePrint
        recipe={{
          ...recipe,
          ingredients: customIngredients,
          diameter: diametrPrint,
        }}
      />
    </Stack>
  ) : null; // выведем лоадер
};
