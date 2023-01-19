import {Container} from "@mui/material";
import {Recipe} from "../../model/Recipe";
import RecipeCardGalleryView from "./RecipeCardGalleryView";

type RecipeGalleryProps = {
    recipesToMap: Recipe[]
    recipeToRemove: (id?: string) => void
    recipeToUpdate: (recipe: Recipe, imageToUpdate?: File, id?: string,) => void
}

export default function RecipeGallery(props: RecipeGalleryProps) {

    const recipeItemComponents = props.recipesToMap.map(recipeShortInfo => {
        return <RecipeCardGalleryView recipeToDisplay={recipeShortInfo} recipeToRemove={props.recipeToRemove}
                                      recipeToUpdate={props.recipeToUpdate}
                                      key={recipeShortInfo.id}/>
    })
    return (
        <section>

            <Container>
                <br/><br/>
                {recipeItemComponents}

            </Container>

        </section>
    )
}