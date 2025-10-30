import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function NonVeg() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchNonVeg() {
      try {
        const categories = ["Chicken", "Beef", "Seafood", "Pork", "Lamb"];
        const requests = categories.map((c) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`)
        );
        const responses = await Promise.all(requests);
        const allMeals = responses.flatMap((r) => r.data.meals);
        setRecipes(allMeals);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNonVeg();
  }, []);

  return (
    <div className="p-4">
      <h2>🍗 Non-Vegetarian Recipes</h2>
      <div className="row">
        <div className="col-4">
            {recipes.map((meal) => (
          <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
            <div className="border rounded-lg p-2 hover:shadow-lg">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: "150px", height: "120px", borderRadius: "8px", objectFit: "cover" }}
                className="rounded-md"
              />
              <p className="font-semibold mt-2 bg-danger text-white">{meal.strMeal}</p>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

export default NonVeg;
