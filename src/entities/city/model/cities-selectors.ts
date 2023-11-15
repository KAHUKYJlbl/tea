import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, State } from '../../../app/provider/store';
import { CityType } from '../lib/types';

export const getPlayed = (state: State): CityType[] => state[NameSpace.Cities].playedCities;

export const getLastPlayed = createSelector(
  getPlayed,
  ( played ) => played[played.length - 1]
);
