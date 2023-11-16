import { CityType, PlayedCityType } from '../../../entities/city';

type AITurnProps = {
  list: CityType[];
  played: PlayedCityType[];
  letter: string;
}

export const AITurn = ({ list, played, letter }: AITurnProps) => {

  return list.find(( city ) => (
    city[0].toLowerCase() === letter.toLowerCase()
    && (played.length === 0
      ? true
      : !played.some(( playedCity ) => (
        playedCity.city.toLowerCase() === city.toLowerCase()
      ))
    )
  ));
};
