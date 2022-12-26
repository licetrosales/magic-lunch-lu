import {Recipe} from "../model/Recipe";
import RecipeCardGalleryView from "./RecipeCardGalleryView";

type RecipeGalleryProps = {
    recipesToMap: Recipe []
}

export default function RecipeGallery(props: RecipeGalleryProps) {

    const recipeItemComponents = props.recipesToMap.map(recipeShortInfo => {
        return <RecipeCardGalleryView recipeToDisplay={recipeShortInfo} key={recipeShortInfo.id}/>
    })
    return (
        <section>
            {recipeItemComponents}
        </section>
    )
}