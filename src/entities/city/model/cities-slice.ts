import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';

import { CityType, PlayedCityType } from '../lib/types';
import { CITY_LIST } from './city-list';

type InitialState = {
  cityList: CityType[];
  playedCities: PlayedCityType[];
};

const initialState: InitialState = {
  cityList: CITY_LIST,
  playedCities: [],
};

export const citiesSlice = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    addPlayed: (state, action: PayloadAction<PlayedCityType>) => {
      state.playedCities = [
        ...state.playedCities,
        action.payload
      ]
    },
    clearPlayed: (state) => {
      state.playedCities = [];
    }
  }
});

export const { addPlayed, clearPlayed } = citiesSlice.actions;
