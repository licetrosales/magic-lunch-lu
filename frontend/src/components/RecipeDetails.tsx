import {useParams} from "react-router-dom";
import useRecipe from "../hooks/useRecipe";

export default function RecipeDetails() {
    const params = useParams()
    const id: string | undefined = params.id
    const {recipe} = useRecipe(id)

    if (!recipe) {
        return (
            <p>Loading ...</p>
        )
    }
    return (
        <div>
            <p>Haallo</p>
            {!recipe && <p>Loading ...</p>}
            {<div>
                <p>{recipe.name}</p>
                <p>{recipe.id}</p>
            </div>
            }
        </div>
    )
}