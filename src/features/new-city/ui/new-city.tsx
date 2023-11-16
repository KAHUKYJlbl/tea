import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { ROUND_LENGTH } from '../../../app/settings/round-length';
import { Button } from '../../../shared/ui/button';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { CityType, addPlayed, getCities, getPlayed } from '../../../entities/city';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { AITurn } from '../lib/ai-turn';
import { GameLevel } from '../../../app/settings/game-level';
import { getLastLetter } from '../lib/get-last-letter';

type NewCityProps = {
  cb: (playersTurn: boolean) => void;
  restartTimer: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
};

type NewCityForm = {
  city: CityType;
}

export const NewCity = ({ cb, restartTimer }: NewCityProps): JSX.Element => {
  const gameLevel = GameLevel.Hard;
  const dispatch = useAppDispatch();
  const cityList = useAppSelector(getCities);
  const playedCities = useAppSelector(getPlayed);
  const { register, handleSubmit, reset } = useForm<NewCityForm>();
  const [ formDisabled, setFormDisabled ] = useState(false);
  const [ AITimer, setAITimer ] = useState(gameLevel);

  const onFormSubmit: SubmitHandler<NewCityForm> = (data) => {
    dispatch(addPlayed({
      city: data.city,
      player: true,
    }));
    reset();

    const time = new Date();
    time.setSeconds(time.getSeconds() + ROUND_LENGTH);
    restartTimer(time);
    setFormDisabled(true);
    cb(false);

    const AICity = AITurn({
      list: cityList,
      played: playedCities,
      letter: getLastLetter(data.city)
    });

    if ( AICity ) {
      setTimeout(() => {
        dispatch(addPlayed({
          city: AICity,
          player: false,
        }));

        const time = new Date();
        time.setSeconds(time.getSeconds() + ROUND_LENGTH);
        restartTimer(time);
        setFormDisabled(false);
        cb(true);
        setAITimer((current) => current + gameLevel)
      }, AITimer);
    }
  };

  const onFormSubmitError: SubmitErrorHandler<NewCityForm> = (errors) => {
    console.log(errors.city);
  }

  return (
    <div className='w-full bg-gray-100 rounded'>
      <form className='flex p-2' onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
        <fieldset className='flex gap-1 w-full items-center' disabled={formDisabled}>
          <input
            type="text"
            className='w-full bg-transparent outline-none'
            {...register('city', {required: true})}
          />

          <Button type='icon' cb={() => null}>
            <img src='./images/icons/icon.svg' width='20px' height='20px' />
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
