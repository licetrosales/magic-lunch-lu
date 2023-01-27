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
import {orange} from "@mui/material/colors";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Recipe} from "../../model/Recipe";
import IngredientCardView from "../Ingredient/IngredientCardView";


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
    const firstLetter = props.recipeToDisplay.name[0];

    const name = props.recipeToDisplay.name
    const mealType = props.recipeToDisplay.mealType
    const source = props.recipeToDisplay.source
    const image = props.recipeToDisplay.image
    const prepTime = props.recipeToDisplay.prepTime
    const preparation = props.recipeToDisplay.preparation
    const favorite = props.recipeToDisplay.favorite
    const dishTypeCategory = props.recipeToDisplay.dishTypeCategory
    const recipeCategory = props.recipeToDisplay.recipeCategory
    const menuCategory = props.recipeToDisplay.menuCategory
    const garnish = props.recipeToDisplay.garnish

    const recipeIngredientes = props.recipeToDisplay.ingredients?.map((ingredientShortInfo) => {
        return <IngredientCardView ingredientToDisplay={ingredientShortInfo}
                                   key={ingredientShortInfo.id}/>
    })

    return (props.recipeToDisplay &&
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: orange[500]}} aria-label="recipe">
                        {firstLetter}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={name}
                subheader={source}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Recipe image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {mealType}<br/>
                    {prepTime}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" disabled={!favorite} color={"secondary"}>
                    <FavoriteIcon/>
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
                    <Typography variant="body2">
                        <b>Tageskategorie</b> : {dishTypeCategory}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Rezeptkategorie</b> : {recipeCategory}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Menükategorie</b> : {menuCategory}
                    </Typography> <br/>
                    <Typography variant="body2">
                        <b>Beilage</b> : {garnish}
                    </Typography> <br/>
                    <Typography paragraph><b>Zutaten</b></Typography>

                    <Typography paragraph>
                        {recipeIngredientes}
                    </Typography>
                    <Typography paragraph><b>Zubereitung</b></Typography>
                    <Typography>
                        {preparation}
                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}