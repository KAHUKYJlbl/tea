export const getLastLetter = (cityName: string) => {
  const isNotCapital = (str: string) => {
    return (str === 'ь' || str === 'ъ');
  };

  if ( isNotCapital( cityName[cityName.length - 1] ) ) {
    return cityName[cityName.length - 2]
  };

  return cityName[cityName.length - 1];
}
