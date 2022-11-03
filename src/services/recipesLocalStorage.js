const lsInProgressRecipes = () => {
  const getLsInfo = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (getLsInfo === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
  }

  console.log(getLsInfo);

  const getLsIn = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return getLsIn;
};

export default lsInProgressRecipes;
