import {Box, Container, TextField} from "@mui/material";
import {Recipe} from "../../model/Recipe";
import RecipeCardGalleryView from "./RecipeCardGalleryView";
import {ChangeEvent, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {Search} from "@mui/icons-material";

type RecipeGalleryProps = {
    recipesToMap: Recipe[]
    recipeToRemove: (id?: string) => void
    recipeToUpdate: (recipe: Recipe, imageToUpdate?: File, id?: string,) => void
}

export default function RecipeGallery(props: RecipeGalleryProps) {

    const [searchText, setSearchText] = useState<string>("")

    const filteredRecipes: Recipe [] = props.recipesToMap.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchText.toLowerCase())

    )

    const recipeItemComponents = filteredRecipes.map(recipeShortInfo => {
        return <RecipeCardGalleryView recipeToDisplay={recipeShortInfo} recipeToRemove={props.recipeToRemove}
                                      recipeToUpdate={props.recipeToUpdate}
                                      key={recipeShortInfo.id}/>
    })

    function onSearchChange(event:ChangeEvent<HTMLInputElement>){
        setSearchText(event.target.value)
    }

    return (
        <section>

            <Container>

            <Box
                 display="flex"
                 justifyContent="center"
                 alignItems="center">
                <TextField placeholder={"Suche"} value={searchText} onChange={onSearchChange} color={"secondary"}  />
                <SearchIcon color={"secondary"}/>
            </Box>
                {recipeItemComponents}

            </Container>

        </section>
    )
}