export const fetchApiIngredients = async (ingredient, themealdb) => {
  const request = await fetch(`https://www.${themealdb}.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await request.json();
  return data?.meals || data?.drinks;
};

export const fetchName = async (name, themealdb) => {
  const request = await fetch(`https://www.${themealdb}.com/api/json/v1/1/search.php?s=${name}`);
  const data = await request.json();
  return data?.meals || data?.drinks;
};

export const fetchFirstLetter = async (first, themealdb) => {
  const request = await fetch(`https://www.${themealdb}.com/api/json/v1/1/search.php?f=${first}`);
  const data = await request.json();
  return data?.meals || data?.drinks;
};

export const apiRecipes = async (themealdb) => {
  const response = await fetch(`https://www.${themealdb}.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  return data?.meals || data?.drinks;
};
