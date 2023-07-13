import axios from "axios";
import { useEffect, useState } from "react";
import SearchTiles from "../components/SearchTiles";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchValueFromButtonClick, setSearchValueFromButtonClick] =
    useState("");
  const [options, setOptions] = useState({
    "Dairy-Free": false,
    "Gluten-Free": false,
    "Peanut-Free": false,
    'Vegan': false,
    'Vegetarian': false,
  });

  const key = process.env.APP_KEY;
  const id = process.env.APP_ID;
  console.log(key, id);


  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch(event);
    }
  };

  const handleSearch = () => {
    setSearchValueFromButtonClick(searchValue);
  };

  useEffect(() => {
    async function getRecipes() {
      const recipes = await axios(
        `https://api.edamam.com/api/recipes/v2?q=${searchValueFromButtonClick}&app_key=${key}&app_id=${id}&type=any`
      );
      setRecipes(recipes.data.hits);
      console.log(recipes.data.hits)
    }
    getRecipes();
  }, [searchValueFromButtonClick]);

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeLabels = recipe.recipe.healthLabels;
    const {
      "Dairy-Free": dairyFree,
      "Gluten-Free": glutenFree,
      "Peanut-Free": peanutFree,
      Vegan,
      Vegetarian,
    } = options;

    if (!dairyFree && !glutenFree && !peanutFree && !Vegan && !Vegetarian) {
      return true;
    }

    if (
      (dairyFree && !recipeLabels.includes("Dairy-Free")) ||
      (glutenFree && !recipeLabels.includes("Gluten-Free")) ||
      (peanutFree && !recipeLabels.includes("Peanut-Free")) ||
      (Vegan && !recipeLabels.includes("Vegan")) ||
      (Vegetarian && !recipeLabels.includes("Vegetarian"))
    ) {
      return false;
    }
    return true;
  });

  if (recipes.length === 0) {
    return (
      <main className="bg-white">
        <Header />
        <SearchForm
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          setOptions={setOptions}
          options={options}
          handleKeyDown={handleKeyDown}
        />
        <Footer />
      </main>
    );
  } else {
    return (
      <main className="bg-white">
        <Header />
        <SearchForm
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          setOptions={setOptions}
          options={options}
        />
        <div className="grid lg:grid-cols-3 gap-5 p-5 md:grid-cols-2 sm:grid-cols-1">
          {filteredRecipes.map((recipe, index) => (
            <SearchTiles key={index} recipe={recipe} />
          ))}
        </div>
        <Footer />
      </main>
    );
  }
}