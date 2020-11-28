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
        width: 300,
        marginRight: 20,
        marginBottom: 20,
    },
    media: {
        height: 180,
    },
    streamTitle: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    viewerCount: {
        position: 'absolute',
        marginTop: '-30px',
        left: '15px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,.6)',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 20
    },
    links: {
        textDecoration: 'none'
    }
});

export default function StreamCard(props) {
    const classes = useStyles();
    let stream = props.stream;
    // let first = stream.thumbnail_url.replace('{width}', '300');
    // let second = first.replace('{height}', '180');
    console.log(stream)
    return (
        // href={{ pathname: "/stream/[id]", query: { streamer: stream.user_name, viewers: stream.viewer_count, title: stream.title } }} 
        <Link to={`/stream/${stream.user_id}`}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={stream.preview.large}
                            title={stream.title}
                        />
                        <div className={classes.viewerCount}>{stream.viewers} viewers</div>
                        <CardContent>
                            <Typography className={classes.streamTitle} gutterBottom variant="subtitle1" component="h2">
                                {stream.channel.status}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {stream.channel.display_name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
        </Link>
    );
}
