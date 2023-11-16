import { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';

import { ROUND_LENGTH } from '../../../app/settings/round-length';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { City } from '../../../entities/city/ui/city';
import { getPlayed } from '../../../entities/city';
import { NewCity } from '../../../features/new-city';


type GameProps = {
  cb: (isWin: boolean) => void
}

export const Game = ({ cb }: GameProps): JSX.Element => {
  const [ isPlayersTurn, setIsPlayersTurn ] = useState(true);
  const playedCities = useAppSelector(getPlayed);

  const time = new Date();
  time.setSeconds(time.getSeconds() + ROUND_LENGTH);
  const {
    seconds,
    minutes,
    start,
    restart,
  } = useTimer({ expiryTimestamp: time , onExpire: () => cb( !isPlayersTurn ) });
  useEffect(() => { start() }, []);

  return (
    <div style={{width: '576px'}}>
      <div className="flex justify-between items-center h-16 px-4 border-b-4 border-gray-100 text-center">
        <span className="text-base">
          {
            isPlayersTurn
              ? 'Сейчас ваша очередь'
              : 'Сейчас очередь сопреника'
          }
        </span>

        <span className='text-xl'>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>

      <div className='overflow-scroll flex flex-col gap-2 h-80 px-4 py-5'>
        {
          playedCities.map((city) => (
            <City city={city} key={city.city} />
          ))
        }
      </div>

      <div className='flex w-full justify-center items-center text-sm text-gray-400'>
        Всего перечислено городов: {playedCities.length}
      </div>

      <div className='p-4'>
        <NewCity
          cb={setIsPlayersTurn}
          restartTimer={restart}
        />
      </div>
    </div>
  )
}
