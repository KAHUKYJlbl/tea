import cn from 'classnames';

import { PlayedCityType } from '../lib/types';

type CityProps = {
  city: PlayedCityType;
};

export const City = ({ city: { city, player } }: CityProps): JSX.Element => {
  return (
    <div
      className={cn(
        'flex w-full',
        (
          player
            ? 'justify-end'
            : 'justify-start'
        ),
      )}
    >
      <div
        className={cn(
          'py-1.5 px-3 rounded-t-xl',
          (
            player
              ? 'bg-violet-500 text-white rounded-bl-xl'
              : 'bg-violet-50 text-gray-700 rounded-br-xl'
          )
        )}
      >
        {city}
      </div>
    </div>
  )
};
