import { MouseEvent } from 'react';
import { AccountCircleRounded, Add } from '@mui/icons-material';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Link,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { NavBarAvatarContainer } from '../NavBarAvatar';
import { HeaderSwipeableDrawerContainer } from './HeaderSwipeableDrawer';

interface HeaderProps {
  isLogged: boolean;
  handleLoginBtnClick: () => void;
  handleLogoClick: (e: MouseEvent) => void;
  handleCreateRecipeClick: (e: MouseEvent) => void;
  handleRecipeBuilderClick: (e: MouseEvent) => void;
}

export const Header = ({
  isLogged,
  handleLogoClick,
  handleLoginBtnClick,
  handleCreateRecipeClick,
  handleRecipeBuilderClick,
}: HeaderProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar disableGutters={true}>
          <HeaderSwipeableDrawerContainer
            handleRecipeBuilderClick={handleRecipeBuilderClick}
            handleCreateRecipeClick={handleCreateRecipeClick}
          />
          <Box
            sx={{
              flex: { xs: '0 0 auto', md: '0 1 100%' },
              display: 'flex',
              justifyContent: { md: 'left', xs: 'center' },
            }}
          >
            <Link
              href="#"
              variant="h5"
              color="inherit"
              underline="none"
              onClick={handleLogoClick}
            >
              Funny Cakes
            </Link>
          </Box>
          <Button
            color="inherit"
            variant="text"
            startIcon={<AutoFixHighOutlinedIcon />}
            size="medium"
            sx={{
              ml: 2.5,
              display: { md: 'flex', xs: 'none' },
              flex: '0 0 auto',
            }}
            onClick={handleRecipeBuilderClick}
          >
            Конструктор рецепта
          </Button>
          {isLogged ? (
            <>
              <Button
                color="inherit"
                variant="text"
                startIcon={<Add />}
                size="medium"
                sx={{
                  ml: 2.5,
                  display: { md: 'flex', xs: 'none' },
                  flex: '0 0 auto',
                }}
                onClick={handleCreateRecipeClick}
              >
                Добавить рецепт
              </Button>
              <NavBarAvatarContainer
                sx={{
                  pl: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flex: { xs: '0 1 50%', md: '0 0 auto' },
                }}
              />
            </>
          ) : (
            <Box
              sx={{
                pl: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                flex: { xs: '0 1 50%', md: '0 0 auto' },
              }}
            >
              {matches ? (
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<AccountCircleRounded />}
                  size="medium"
                  onClick={handleLoginBtnClick}
                >
                  Войти
                </Button>
              ) : (
                <IconButton onClick={handleLoginBtnClick} color="inherit">
                  <AccountCircleRounded 
                    sx={{
                      width: { xs: 24, sm: 32 },
                      height: { xs: 24, sm: 32 },
                    }}
                  />
                </IconButton>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
