import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setRecipes([]);
      return;
    }

    // Fetch when user types
    const fetchRecipes = async () => {
      try {
        // 🔍 Try searching by name first
        const nameResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );

        if (nameResponse.data.meals) {
          setRecipes(nameResponse.data.meals);
        } else {
          // If not found, search by ingredient
          const ingredientResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`
          );
          setRecipes(ingredientResponse.data.meals || []);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className="container mt-5 p-4">
      <div className="card p-4 shadow">
       <div className="card-header bg-success text-white ">
         <h1 className="text-2xl font-bold mb-4">🍽️ Recipe Finder</h1>

        {/* 🔍 Search Bar */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ingredient or recipe name..."
            className="border border-gray-300 rounded p-2 w-72"
          />
        </div>

       </div>
        {/* 🥗 Search Results */}
        {recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((meal) => (
              <div
                key={meal.idMeal}
                className="border p-2 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-semibold mt-2 text-center">
                  {meal.strMeal}
                </h3>
                <Link
                  to={`/recipe/${meal.idMeal}`}
                  className="text-blue-600 text-sm underline block text-center mt-1"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          searchTerm && <p>No recipes found for "{searchTerm}"</p>
        )}

        {/* 🍱 Category Links */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg mb-2">Categories:</h2>
          <div className="flex gap-4">
            <div className="row">
                <div className="col-6 ">
                    <Link to="/Veg" className="text-red-600 h1"style={{textDecoration:"None "}}>
                        🥦 Veg Recipes
                    </Link>
                </div>
                <div className="col-6">
                    <Link to="/Non_veg" className="text-red-600 h1" style={{textDecoration:"None"}}>
                        🍗 Non-Veg Recipes
                    </Link>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;

