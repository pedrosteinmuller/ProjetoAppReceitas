const alert = 'Sorry, we haven\'t found any recipes for these filters.';

export const fetchApiIngredients = async (ingredient, themealdb) => {
  try {
    const request = await fetch(`https://www.${themealdb}.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await request.json();
    return data?.meals || data?.drinks;
  } catch (error) {
    return global.alert(alert);
  }
};

export const fetchName = async (name, themealdb) => {
  try {
    const request = await fetch(`https://www.${themealdb}.com/api/json/v1/1/search.php?s=${name}`);
    const data = await request.json();
    return data?.meals || data?.drinks;
  } catch (error) {
    return global.alert(alert);
  }
};

export const fetchFirstLetter = async (first, themealdb) => {
  try {
    const request = await fetch(`https://www.${themealdb}.com/api/json/v1/1/search.php?f=${first}`);
    const data = await request.json();
    return data?.meals || data?.drinks;
  } catch (error) {
    return global.alert(alert);
  }
};
