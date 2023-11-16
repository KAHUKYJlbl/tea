import { memo } from 'react';
import { Button } from '../../../shared/ui/button';

type WelcomeProps = {
  cb: () => void
}

export const Welcome = memo(({ cb }: WelcomeProps): JSX.Element => {
  return (
    <>
      <div className="w-full h-16 py-4 border-b-4 border-gray-100 text-center">
        <h1 className="text-base">
          Игра в города на время
        </h1>
      </div>

      <div className="w-full mb-6 p-6 text-sm text-gray-600">
        <h3 className="mb-6">
          Цель: Назвать как можно больше реальных городов.
        </h3>

        <ul className="ml-4 list-disc">
          <li>
            Запрещается повторение городов.
          </li>

          <li>
            Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.
          </li>

          <li>
            Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим
          </li>
        </ul>
      </div>

      <div className='flex justify-center items-center pb-10'>
        <Button type='text' cb={cb}>
          Начать новую игру
        </Button>
      </div>
    </>
  )
});
