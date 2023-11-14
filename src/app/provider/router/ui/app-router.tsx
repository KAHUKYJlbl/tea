import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { MainPage } from '../../../../pages/main-page';
import { GamePage } from '../../../../pages/game-page';
import { NotFound } from '../../../../pages/not-found';

import { AppRoute } from '../lib/routes';

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Main}
        element={
          <MainPage />
        }
      />
      <Route
        path={AppRoute.Game}
        element={
          <GamePage />
        }
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </>
  )
);
