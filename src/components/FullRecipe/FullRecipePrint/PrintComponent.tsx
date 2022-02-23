import React, { forwardRef } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import style from './FullRecipePrint.module.css';
import { Recipe } from '../../../types/recipeType';
import { unitList } from '../../../utils/dictionary';

interface PrintComponentProps {
  recipe: Recipe;
}

export const PrintComponent = forwardRef(
  ({ recipe }: PrintComponentProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const {
      title,
      description,
      owner,
      duration,
      diameter,
      ingredients,
      recipeText,
    } = recipe;

    return (
      //div, а не Box из-за ref
      <div className={style.print} ref={ref}>
        <Typography variant="h4">{title}</Typography>
        <Typography sx={{mb: 1}}>{`Автор: ${owner.firstName} ${owner.lastName}`}</Typography>
        <Typography sx={{mb: 1}}>{description}</Typography>
        <Typography sx={{mb: 1, fontWeight: 'bold' }}>Время приготовления: {duration} мин.</Typography>
        <Typography sx={{mb: 1, fontWeight: 'bold' }}>Диаметр торта: {diameter} см.</Typography>
        <Typography variant="h5">Состав:</Typography>
        <List>
          {ingredients.map(({ name, unit, count }, index) => {
            return (
              <ListItem
                key={index}
              >{`${name} — ${count} ${unitList[unit]}`}</ListItem>
            );
          })}
        </List>
        <Typography />
        <Typography sx={{mb: 2}} variant="h5">Инструкция приготовления:</Typography>
        <Typography>{recipeText}</Typography>
      </div>
    );
  }
);
