import Layout from '../../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    chat: {
        width: 340,
        height: 'calc(100% - 64px)',
        position: 'fixed',
        right: 0,
        bottom: 0
    },
    streamLayout: {
        height: '100%',
        width: '100%'
    },
    stream: {
        width: 'calc(100% - 300px)',
        height: '83%',
        marginLeft: -40
    },
    streamTitle: {

    }
}))

const Game = props => {
    const classes = useStyles()
    console.log(props)
    return (
        <>
            <CssBaseline />
            <Layout>
                <div className={classes.streamLayout}>
                    <h1>{props.stream.user_name}</h1>
                    <iframe src={"https://player.twitch.tv/?channel=" + props.stream.user_name + '&muted=false'} className={classes.stream} frameborder="0" allowfullscreen="true" scrolling="no" autoplay="true"></iframe>
                    <iframe src={"https://www.twitch.tv/embed/" + props.stream.user_name + "/chat?darkpopout"} className={classes.chat} frameborder="0" scrolling="no"></iframe>
                    {/* <h2>{props.stream.title}</h2> */}
                    <Typography className={classes.streamTitle} gutterBottom variant="h6" component="h2">
                        {props.stream.title}
                    </Typography>
                    <Typography className={classes.streamTitle} gutterBottom variant="subtitle1" component="h6">
                        {props.stream.viewer_count} viewers
                    </Typography>
                </div>
            </Layout>
        </>
    )
};

Game.getInitialProps = async function (context) {
    console.log(context.query)
    return {
        stream: {
            user_name: context.query.streamer,
            title: context.query.title,
            viewer_count: context.query.viewers
        }
    };
};

export default Game;
