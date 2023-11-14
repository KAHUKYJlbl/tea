import { combineReducers } from '@reduxjs/toolkit';

import { citiesSlice } from '../../../../entities/city';

import { NameSpace } from '../lib/name-space';

export const rootReducer = combineReducers({
  [NameSpace.Cities]: citiesSlice.reducer,
});
