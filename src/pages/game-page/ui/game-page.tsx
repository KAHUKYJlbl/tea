import { useCallback, useState } from 'react';

import { Welcome } from '../../../widgets/welcome';
import { Game } from '../../../widgets/game';
import { End } from '../../../widgets/end';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { clearPlayed } from '../../../entities/city';

const GamePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ isNewGame, setNewGame ] = useState(true);
  const [ isGameEnd, setGameEnd ] = useState(false);
  const [ isWin, setWin ] = useState(false);

  const handleNewGame = useCallback(() => {
    setNewGame(false);
  }, []);

  const handleEndGame = useCallback((isWinner: boolean) => {
    setWin(isWinner);
    setGameEnd(true);
  }, []);

  const handleRestart = useCallback(() => {
    dispatch(clearPlayed());
    setGameEnd(false);
  }, []);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className="max-w-xl rounded-2xl shadow-md">
        {/* Welcome screen */}
        { isNewGame && <Welcome cb={handleNewGame} /> }

        {/* Game screen */}
        { !isNewGame && !isGameEnd && <Game cb={handleEndGame} /> }

        {/* Game results screen */}
        { isGameEnd && <End cb={handleRestart} win={isWin} /> }
      </div>
    </div>
  )
};

export default GamePage;
