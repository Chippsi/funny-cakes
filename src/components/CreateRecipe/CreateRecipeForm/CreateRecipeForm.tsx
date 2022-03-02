import React, {
  Dispatch,
  SetStateAction,
  FormEventHandler,
  ChangeEventHandler,
  useRef,
  ChangeEvent,
} from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Grid,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { LoadingButton } from '@mui/lab';

import {
  Recipe,
  RecipeIngredient,
  RecipeInstruction,
} from '../../../types/recipeType';
import { CreateIngredientListContainer } from '../CreateIngredientList';
import { CreateInstructionListContainer } from '../CreateInstructionList';
import { CreateTagsContainer } from '../CreateTags';
import { InputNumberComponent } from '../InputNumber';
import { typeRecipe } from '../../../utils/dictionary';
import { ResponsiveImage } from '../../UI/ResponsiveImage';

interface CreateRecipeFormProps {
  selectedFile: File;
  isEditForm: boolean;
  handleSubmit: FormEventHandler;
  handleUpdate: FormEventHandler;
  handleChange: (
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>;
  ingredientList: RecipeIngredient[];
  setForm: Dispatch<SetStateAction<Recipe>>;
  form: Recipe;
  handleUploadFile: ChangeEventHandler;
  error: string;
  isLoadFile: boolean;
  setIsLoadFile: Dispatch<SetStateAction<boolean>>;
  instructionList: RecipeInstruction[];
  setInstructionList: Dispatch<SetStateAction<RecipeInstruction[]>>;
  isUpdateRecipe: boolean;
}

export const CreateRecipeForm = ({
  selectedFile,
  isEditForm,
  handleSubmit,
  handleChange,
  setIngredientList,
  ingredientList,
  setForm,
  handleUploadFile,
  error,
  isLoadFile,
  form,
  instructionList,
  setInstructionList,
  setIsLoadFile,
  isUpdateRecipe,
  handleUpdate,
}: CreateRecipeFormProps) => {
  const InputStyle = styled('input')({
    display: 'none',
  });
  const ref = useRef();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        name="create-form"
        component="form"
        maxWidth={800}
        sx={{
          pt: 4,
          pb: 10,
        }}
        autoComplete="off"
        onSubmit={isUpdateRecipe ? handleUpdate : handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom component="div">
              {isUpdateRecipe ? 'Редактирование рецепта' : 'Создание рецепта'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 0 }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="select-type">Тип</InputLabel>
              <Select
                labelId="select-type"
                id="select-type"
                name="type"
                label="Тип"
                value={form.type}
                disabled={!isEditForm}
                onChange={handleChange}
              >
                {Object.keys(typeRecipe).map((key) => (
                  <MenuItem key={key} value={key}>
                    {typeRecipe[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              disabled={!isEditForm}
              value={form.title}
              name="title"
              label="Название"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              disabled={!isEditForm}
              value={form.description}
              name="description"
              label="Краткое описание"
              multiline
              onChange={handleChange}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {form.type === 'cream' || form.type === 'surface' ? (
              <TextField
                required
                fullWidth
                disabled={!isEditForm}
                value={form.unitValue === 0 ? '' : form.unitValue}
                name="diameter"
                type="number"
                label="Объем"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      мл. <MonitorWeightOutlinedIcon />
                    </InputAdornment>
                  ),
                  inputProps: {
                    inputcomponent: InputNumberComponent,
                    ref: { ref },
                    min: 100,
                    max: 5000,
                    step: 0.5,
                  },
                }}
              />
            ) : (
              <TextField
                required
                fullWidth
                disabled={!isEditForm}
                name="diameter"
                type="number"
                label="Диаметр"
                value={form.unitValue === 0 ? '' : form.unitValue}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      см. <PieChartOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                  inputProps: {
                    inputcomponent: InputNumberComponent,
                    ref: { ref },
                    min: 5,
                    max: 50,
                    step: 0.5,
                  },
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              disabled={!isEditForm}
              value={form.duration === 0 ? '' : form.duration}
              name="duration"
              type="number"
              label="Общее время"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    мин. <AccessTimeOutlinedIcon />
                  </InputAdornment>
                ),
                inputProps: {
                  inputcomponent: InputNumberComponent,
                  ref: { ref },
                  min: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ mb: -1, mt: 2 }}
            >
              Состав
            </Typography>
          </Grid>
          <CreateIngredientListContainer
            setIngredientList={setIngredientList}
            ingredientList={ingredientList}
            isEditForm={isEditForm}
          />
          <Grid item xs={12}></Grid>
          <Grid item xs={12} sm={6}>
            {form.type === 'full recipe' ? (
              <CreateTagsContainer
                tags={form.tags}
                setForm={setForm}
                isEditForm={isEditForm}
              />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Box
              component={'label'}
              sx={{ cursor: 'pointer' }}
              htmlFor="icon-button-file"
            >
              <InputStyle
                disabled={!isEditForm || isLoadFile}
                accept="image/jpeg"
                id="icon-button-file"
                type="file"
                onChange={handleUploadFile}
              />
              <IconButton
                color="primary"
                disabled={!isEditForm || isLoadFile}
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraOutlinedIcon />
              </IconButton>
              {selectedFile.name !== ''
                ? isLoadFile
                  ? 'Загрузка...'
                  : selectedFile.name
                : 'Загрузить фотографию'}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {form.imgUrl !== '' ? (
              <ResponsiveImage
                src={form.imgUrl}
                alt="Основное фото рецепта"
                aspectRatio="50"
              />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ mb: -1 }}
            >
              Инструкция приготовления
            </Typography>
          </Grid>
          <CreateInstructionListContainer
            {...{
              setInstructionList,
              instructionList,
              isEditForm,
              isLoadFile,
              setIsLoadFile,
            }}
          />
          {error !== '' ? (
            <Grid item xs={12}>
              <Typography color={'red'}>{error}</Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <LoadingButton
              loading={isLoadFile || !isEditForm}
              loadingPosition="start"
              disabled={!isEditForm}
              startIcon={<LibraryAddOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              {isUpdateRecipe ? 'Сохранить изменения' : 'Опубликовать рецепт'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
