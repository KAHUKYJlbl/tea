import { memo } from 'react';
import cn from 'classnames'

import { getLastPlayed, getPlayed } from '../../../entities/city';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Button } from '../../../shared/ui/button';

type EndProps = {
  cb: () => void,
  win: boolean,
}

export const End = memo(({ cb, win }: EndProps): JSX.Element => {
  const playedLength = useAppSelector(getPlayed).length;
  const lastCity = useAppSelector(getLastPlayed);

  return (
    <div className='flex flex-col gap-8 p-10 items-center text-center'>
      <p className='text-xl'>
        {
          win
            ? <span>
                Поздравляем тебя с победой!
                <br/>Твой противник не вспомнил нужный город!
              </span>
            : <span>
                К сожалению твое время вышло!
                <br/>Твой противник победил!
              </span>
        }
      </p>

      <p
        className={cn(
          'text-3xl',
          (win ? 'text-green-600' : 'text-red-600')
        )}
      >
        00:00
      </p>

      <p className='text-xl'>
        Всего было перечислено городов: {playedLength}
        <br/>Очень неплохой результат!
      </p>

      <p className='text-xl'>
        Последний город названный победителем
        <br/><span className='text-2xl'>
          {lastCity?.city}
        </span>
      </p>

      <div className='flex justify-center items-center'>
        <Button type='text' cb={cb}>
          Начать новую игру
        </Button>
      </div>
    </div>
  )
});
