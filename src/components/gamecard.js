import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        width: 172,
        marginRight: 20,
        marginBottom: 20,
    },
    media: {
        height: 240,
    },
    gameTitle: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    links: {
        textDecoration: 'none'
    }
});

export default function GameCard(props) {
    const classes = useStyles();
    let game = props.game;
    return (
        // to={{ pathname: "/game/[id]", query: { gameName: game.game.localized_name } }} 
        <Link to={`/game/${game.game._id}`}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={game.game.box.large}
                        title={game.game.localized_name}
                    />
                    <CardContent>
                        <Typography className={classes.gameTitle} gutterBottom variant="subtitle1" component="h2">
                            {game.game.localized_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {game.viewers} viewers
          </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}
