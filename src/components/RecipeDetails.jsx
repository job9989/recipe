import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => setRecipe(res.data.meals[0]))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="container m-5 bg-primary text-white">
        <div className="m-4">
            <table cellSpacing={"13px"} cellPadding={"10px"}>
                <tr>
                 <h2 className="text-3xl font-bold">**{recipe.strMeal}**</h2>
                </tr>
                <tr>
                     <td> <p className="h3"><strong >1. Category:</strong> {recipe.strCategory}</p></td>
                     <td><p className="h3"><strong >2. Cuisine:</strong> {recipe.strArea}</p></td>
                </tr>
                <tr>
                    <td>
                        <h3 className="text-xl font-semibold mt-4">🧂 Ingredients</h3>
                        <ul className="list-disc list-inside">
                            {ingredients.map((item, idx) => (
                            <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </td>
                    <td>
                         <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            style={{ width: "250px", height: "250px", borderRadius: "8px", objectFit: "cover" }}
                            className="rounded-lg my-4 w-96 "
                        />
                    </td>
                </tr>
            </table>
        </div>
     
     

     

      

      <h3 className="text-xl font-semibold mt-4">🍳 Instructions</h3>
      <p className="whitespace-pre-line mt-2">{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
