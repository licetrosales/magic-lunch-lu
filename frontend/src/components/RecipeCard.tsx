import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton, IconButtonProps, styled,
    Typography
} from "@mui/material";
import {useState} from "react";
import {red} from "@mui/material/colors";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {DishTypeCategory, MealType, MenuCategory, Recipe, RecipeCategory} from "../model/Recipe";
import {Ingredient} from "../model/Ingredient";
import {subtitles} from "@cloudinary/url-gen/qualifiers/source";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function ShareIcon() {
    return null;
}

type RecipeCardProps = {
    recipeToDisplay: Recipe
}
export default function RecipeCard(props: RecipeCardProps) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const name = props.recipeToDisplay.name
    const mealType = props.recipeToDisplay.mealType
    const source = props.recipeToDisplay.source
    const image = props.recipeToDisplay.image
    const ingredients = props.recipeToDisplay.ingredients
    const prepTime = props.recipeToDisplay.prepTime
    const preparation = props.recipeToDisplay.preparation
    const portions = props.recipeToDisplay.portions
    const favorite = props.recipeToDisplay.favorite
    const dishTypeCategory = props.recipeToDisplay.dishTypeCategory
    const recipeCategory = props.recipeToDisplay.recipeCategory
    const menuCategory = props.recipeToDisplay.recipeCategory
    const garnish = props.recipeToDisplay.garnish

    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={name}
                subheader={mealType}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://res.cloudinary.com/debod1ejt/image/upload/v1672930652/cld-sample-4.jpg"
                alt="Recipe image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                    {favorite}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        <b>Speise:</b> {mealType}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        <b>Speise:</b> {portions}
                    </Typography>
                    <Typography variant="body2">
                        <b>Quelle</b> : {source}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Zubereitungzeit</b> : {prepTime}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Mahlzeit</b> : {dishTypeCategory}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Rezeptcategorie</b> : {recipeCategory}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Menücategorie</b> : {menuCategory}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Beilage</b> : {garnish}
                    </Typography> <br/>
                    <Typography paragraph>Zutaten</Typography>
                    <Typography paragraph>

                    </Typography>
                    <Typography paragraph>Zubereitung</Typography>
                    <Typography paragraph>
                        {preparation}
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.

                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}