import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';

import { CityType } from '../lib/types';
import { CITY_LIST } from './city-list';

type InitialState = {
  cityList: CityType[];
  playedCities: CityType[];
};

const initialState: InitialState = {
  cityList: CITY_LIST,
  playedCities: [],
};

export const citiesSlice = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    addPlayed: (state, action: PayloadAction<CityType>) => {
      state.playedCities = [
        ...state.playedCities,
        action.payload
      ]
    }
  }
});

export const { addPlayed } = citiesSlice.actions;
