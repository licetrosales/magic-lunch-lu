import {useEffect, useState} from "react";
import {Recipe} from "../model/Recipe";
import axios from "axios";

function useRecipe(id: string | undefined) {
    const [recipe, setRecipe] = useState<Recipe>()
    useEffect(() => {
        if (id) {
            getRecipeById(id)
        }
    }, [])

    function getRecipeById(id: string) {
        axios.get("api/users/userId/recipes/" + id)
            .then(response => response.data)
            .then(data => {
                setRecipe(data)
            })
            .catch(console.error)
    }

    return {recipe}
}

export default useRecipe;