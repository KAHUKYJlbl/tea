import { useState } from 'react';
import cn from 'classnames';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { ROUND_LENGTH } from '../../../app/settings/round-length';
import { Button } from '../../../shared/ui/button';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { CityType, addPlayed, getCities, getLastPlayed, getPlayed } from '../../../entities/city';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { AITurn } from '../lib/ai-turn';
import { GameLevel } from '../../../app/settings/game-level';
import { getLastLetter } from '../lib/get-last-letter';

type NewCityProps = {
  cb: (playersTurn: boolean) => void;
  restartTimer: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
};

type NewCityForm = {
  city: CityType;
}

export const NewCity = ({ cb, restartTimer, scrollRef }: NewCityProps): JSX.Element => {
  const gameLevel = GameLevel.Hard;
  const dispatch = useAppDispatch();
  const cityList = useAppSelector(getCities);
  const lastPlayed = useAppSelector(getLastPlayed);
  const lastLetter = lastPlayed ? getLastLetter( lastPlayed.city ) : null;
  const playedCities = useAppSelector(getPlayed);
  const { register, handleSubmit, reset, setValue } = useForm<NewCityForm>();
  const [ formDisabled, setFormDisabled ] = useState(false);
  const [ AITimer, setAITimer ] = useState(gameLevel);
  const [ inputPlaceholder, setInputPlaceholder ] = useState('Напишите любой город, например: Где вы живете?');
  const [ inputError, setInputError ] = useState(false);

  const onFormSubmit: SubmitHandler<NewCityForm> = (data) => {
    dispatch(addPlayed({
      city: data.city,
      player: true,
    }));
    reset();
    setInputPlaceholder('Ожидаем ответа соперника...');

    const time = new Date();
    time.setSeconds(time.getSeconds() + ROUND_LENGTH);
    restartTimer(time);
    setFormDisabled(true);
    cb(false);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

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

        setInputPlaceholder(`Знаете город на букву “${getLastLetter( AICity ).toUpperCase()}”?`);

        const time = new Date();
        time.setSeconds(time.getSeconds() + ROUND_LENGTH);
        restartTimer(time);
        setFormDisabled(false);
        cb(true);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        setAITimer((current) => current + gameLevel)
      }, AITimer);
    }
  };

  const onFormSubmitError: SubmitErrorHandler<NewCityForm> = (errors) => {
    setInputError(true);
    setValue('city', '');
    if (errors.city) {
      setInputPlaceholder(errors.city.message || errors.city.type);
    }
  }

  return (
    <div className={cn(
      'w-full bg-gray-100 rounded',
      (inputError && 'border-red-400 border-2 placeholder:text-red-500 placeholder:italic')
    )}>
      <form className='flex p-2' onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
        <fieldset className='flex gap-1 w-full items-center' disabled={formDisabled}>
          <input
            type="text"
            onInput={() => setInputError(false)}
            placeholder={inputPlaceholder}
            autoComplete='off'
            className={cn(
              'w-full bg-transparent outline-none',
              (inputError && 'placeholder:text-red-500')
            )}
            {...register('city', {
              required: 'Необходимо ввести название города',
              validate: {
                'Неверная первая буква': ( value ) => lastLetter ? value[0].toLowerCase() === lastLetter : true,
                'Такого города не существует': ( value ) => cityList.some(( city ) => city.toLowerCase() === value.toLowerCase()),
                'Такой город уже называли': (value) => !playedCities.some(( playedCity ) => playedCity.city.toLowerCase() === value.toLowerCase()),
              }
            })}
          />

          <Button type='icon' cb={() => null}>
            <img src='./images/icons/icon.svg' width='20px' height='20px' />
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
