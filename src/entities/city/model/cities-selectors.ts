import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, State } from '../../../app/provider/store';
import { CityType, PlayedCityType } from '../lib/types';

export const getCities = (state: State): CityType[] => state[NameSpace.Cities].cityList;

export const getPlayed = (state: State): PlayedCityType[] => state[NameSpace.Cities].playedCities;

export const getLastPlayed = createSelector(
  getPlayed,
  ( played ) => played[played.length - 1]
);
