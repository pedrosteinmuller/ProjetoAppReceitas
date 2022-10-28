// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import { fetchApiRecipesDetails } from '../services/fetchApi';
// import myContext from '../context/myContext';

// function RecipeDetails() {
//   const [mealsDetails, setMealsDetails] = useState([]);
//   const [drinksDetails, setDrinksDetails] = useState([]);
//   const { pathname } = useLocation();
//   const { drinksData, mealsData } = useContext(myContext);

//   // useEffect(() => {
//   //   console.log(mealsData);
//   //   // console.log(drinksData);
//   //   const fetchApiDetails = async (id) => {
//   //     const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
//   //     const URL = await fetchApiRecipesDetails(id, path);
//   //     console.log(URL);
//   //     setMealsDetails(URL);
//   //   };
//   //   fetchApiDetails();
//   // }, [drinksData.idDrink, mealsData, mealsData.idMeal, mealsDetails, pathname]);

//   return (
//     <div>
//       <h1>teste</h1>
//     </div>
//   );
// }

// export default RecipeDetails;
