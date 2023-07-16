import Link from "next/link";
import React from "react";
import { useContext } from "react";
import AppContext from "./AppContext";

function RecipeTileLarge() {
  const { currentRecipe } = useContext(AppContext);

  const handleAddToFavorites = () => {};

  if (currentRecipe === null) {
    return (
      <div>
        <Link href="../page.js">
          <h4>Sorry no recipe found.</h4>
          <p>Please return to the Search Page</p>
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <div className="bg-red-950 rounded flex flex-col items-center justify-start pb-2 mx-10 my-10">
          <div className="flex flex-row">
            <h2 className="my-5 text-lg p-1 bg-red-300 m-2 rounded font-mono text-center">
              {currentRecipe.recipe.label}
            </h2>
          </div>
          <div className="flex items-start justify-center gap-3 mb-5 mx-5">
            <img
              className="rounded"
              src={currentRecipe.recipe.images.LARGE.url}
              alt={currentRecipe.recipe.label}
            />
            <div className=" text-center">
              <h2 className=" bg-red-400 m-2 rounded font-mono p-1 text-center">Ingredients:</h2>
              <ul>
                {currentRecipe.recipe.ingredientLines.map(
                  (ingredient, index) => {
                    return <li className=" bg-red-300 text-black m-2 rounded font-mono p-1 text-center" key={index}>{ingredient}</li>;
                  }
                )}
              </ul>
            </div>
          </div>
          <div className="text-center">
            <p className="my-4 text-black bg-red-400 m-2 rounded font-mono p-1 text-center">
              Health Labels:
            </p>
            <div className=" grid grid-cols-5 pb-5">
              {currentRecipe.recipe.healthLabels.map((label, index) => (
                <p
                  className="bg-red-300 m-2 rounded font-mono p-1 text-center"
                  key={index}
                >
                  {label}
                </p>
              ))}
            </div>
            <Link
              className=" bg-red-300 m-2 rounded font-mono p-1 text-center hover:bg-red-400"
              href={currentRecipe.recipe.url}
            >
              Full Recipe Here
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default RecipeTileLarge;
