import { useCallback, useState } from 'react';

import { Welcome } from '../../../widgets/welcome';
import { End } from '../../../widgets/end';

const GamePage = (): JSX.Element => {
  const [ isNewGame, setNewGame ] = useState(true);
  const [ isGameEnd, setGameEnd ] = useState(false);
  const [ isWin, setWin ] = useState(false);

  const handleNewGame = useCallback(() => {
    setNewGame(false);
  }, []);

  const handleEndGame = useCallback((isWinner: boolean) => {
    setGameEnd(true);
    setWin(isWinner);
  }, []);

  const handleRestart = useCallback(() => {
    setGameEnd(false);
  }, []);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className="max-w-xl rounded-2xl shadow-md">
        {/* { isNewGame && <Welcome cb={handleNewGame} /> } */}

        {/* { !isNewGame && !isGameEnd && <Game cb={handleEndGame} /> } */}

        { isNewGame && <End cb={handleRestart} win={isWin} /> }
      </div>
    </div>
  )
};

export default GamePage;
