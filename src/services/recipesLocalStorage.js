const lsInProgressRecipes = () => {
  // const getLsInfo = JSON.parse(localStorage.getItem('inProgressRecipes'));

  // if (getLsInfo === null) {
  // localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
  // }

  const getLsIn = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return getLsIn || { drinks: {}, meals: {} };
};

export default lsInProgressRecipes;
