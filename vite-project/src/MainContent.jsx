import { useState } from "react"
import ClaudeRecipe from "./components/ClaudeRecipe"
import IngredientsList from "./components/IngredientsList"

function MainContent() {
    
    const [ingredients, setIngredients] = useState(["chicken", "salt", "parsley", "potatoes"])
    const [recipeShown, setRecipeShown] = useState(false)
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function getRecipe() {
        setRecipeShown(prevState => !prevState)
    }

    return (
        <main>
            <form action={addIngredient} className="ingredient-form">
                <input 
                type="text"
                placeholder="ingredient"
                aria-label="add ingredient"
                name="ingredient"
                />
                <button>Add Ingredient</button>
            </form>
            {ingredients.length > 0 ? <IngredientsList
                ingredients={ingredients}
                getRecipe={getRecipe}
            /> : null}
            {recipeShown ? <ClaudeRecipe /> : null}
        </main>
    )
}

export default MainContent