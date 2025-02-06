import { useState, useRef, useEffect } from "react"
import ClaudeRecipe from "./components/ClaudeRecipe"
import IngredientsList from "./components/IngredientsList"
import getRecipeFromClaudeChef from "./ai"

function MainContent() {
    
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [recipe])
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function getRecipe() {
        const recipeResponseMarkdown = await getRecipeFromClaudeChef(ingredients)
        setRecipe(recipeResponseMarkdown)
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
                ref={recipeSection}
            /> : null}
            {recipe ?
            <ClaudeRecipe recipe = {recipe} /> : null}
        </main>
    )
}

export default MainContent