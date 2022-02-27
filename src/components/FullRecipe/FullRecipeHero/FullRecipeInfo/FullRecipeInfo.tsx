import { AccessTimeRounded } from '@mui/icons-material';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { Recipe } from '../../../../types/recipeType';
import { getTime } from '../../../../utils/functions';
import { FullRecipeInfoAccordion } from './FullRecipeInfoAccordion';
import { FullRecipeInfoIngredientsContainer } from './FullRecipeInfoIngredients';
import { FullRecipeInfoStatItem } from './FullRecipeInfoStatItem';
import { FullRecipeInfoButtonsContainer } from './FullRecipeInfoButtons';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../store/slices/authZ/authZSelectors';
import { useRouteMatch } from 'react-router-dom';
import { routes } from '../../../../utils/routes';

interface FullRecipeInfoProps {
  recipe: Recipe;
}

export const FullRecipeInfo = ({ recipe }: FullRecipeInfoProps) => {
  const duration = recipe?.duration + ' минут';
  const fullName = recipe?.owner.firstName + ' ' + recipe?.owner.lastName;
  const avatar = recipe?.owner.profile_picture;
  const user = useSelector(userSelector);
  const { path } = useRouteMatch();

  return (
    <Box
      sx={{
        mx: 'auto',
        mt: { xs: -10, sm: -15 },
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 3 },
        width: '95%',
        maxWidth: { xs: '650px' },
        zIndex: 10,
        borderRadius: 3,
        bgcolor: '#fff',
        boxShadow: 10,
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{
          pb: { xs: 1, sm: 2 },
          mx: 'auto',
        }}
      >
        {recipe?.title}
      </Typography>
      <Divider
        sx={{
          width: 130,
          mx: 'auto',
        }}
      />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{
          py: { xs: 1.5, sm: 3 },
        }}
      >
        <FullRecipeInfoStatItem icon={<AccessTimeRounded />} txt={duration} />
      </Stack>
      <FullRecipeInfoAccordion
        description={recipe?.description}
        ingredients={<FullRecipeInfoIngredientsContainer recipe={recipe} />}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pb: { xs: 1, sm: 2 },
        }}
      >
        <Avatar
          alt={fullName + ' Аватар'}
          src={avatar}
          sx={{
            mr: 1,
            boxShadow: 2,
            width: 32,
            height: 32,
          }}
        />
        <Typography variant="body2">{fullName}</Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: 12,
            my: 'auto',
            mx: 1,
          }}
        />
        <Typography variant="body2">{getTime(recipe?.date)}</Typography>
      </Box>
      {user?.id === recipe.owner.id && path !== routes.recipeBuilder ? (
        <>
          <Divider
            flexItem
            sx={{
              my: 1,
            }}
          />
          <FullRecipeInfoButtonsContainer recipe={recipe} />
        </>
      ) : null}
    </Box>
  );
};
