import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { Recipe } from '../../types/recipeType';

interface RecipeFeedItemProps {
  recipe: Recipe;
  handleCardClick: () => void;
  selected?: boolean;
}

export const RecipeFeedItem = ({
  recipe,
  handleCardClick,
  selected,
}: RecipeFeedItemProps) => {
  return (
    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
      <Card
        raised={true}
        onClick={handleCardClick}
        sx={
          selected
            ? { boxShadow: '0 0 15px #9575cd' }
            : { boxShadow: '0 0 15px rgba(0, 0, 0, .3)' }
        }
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="220"
            image={recipe.imgUrl}
            title={recipe.title}
          />
          <CardContent>
            <Typography
              sx={{ height: 66, overflow: 'hidden' }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {recipe.title}
            </Typography>
            <Typography
              sx={{ height: 56, overflow: 'hidden' }}
              variant="subtitle1"
            >
              {recipe.description}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              align="right"
            >
              {`${recipe.owner.firstName} ${recipe.owner.lastName}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
