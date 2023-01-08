import {Container} from "@mui/material";
import {Recipe} from "../model/Recipe";
import RecipeCardGalleryView from "./RecipeCardGalleryView";

type RecipeGalleryProps = {
    recipesToMap: Recipe[]
    recipeToRemove: (id?:string) => void
}

export default function RecipeGallery(props: RecipeGalleryProps) {

    const recipeItemComponents = props.recipesToMap.map(recipeShortInfo => {
        return <RecipeCardGalleryView recipeToDisplay={recipeShortInfo} recipeToRemove={props.recipeToRemove} key={recipeShortInfo.id}/>
    })
    return (
        <section>
            <Container>
                {recipeItemComponents}
            </Container>
        </section>
    )
}