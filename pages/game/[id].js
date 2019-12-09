import Layout from '../../components/layout'
import fetch from 'isomorphic-unfetch'
import apiKeys from '../../apiKey'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import StreamCard from '../../components/streamcard'

const useStyles = makeStyles(theme => ({
    streamsDirectory: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
    }
}))

const Game = props => {
    const classes = useStyles()
    return (
        <>
            <CssBaseline />
            <Layout>
                <div>
                    <h1>{props.gameName}</h1>
                    <div className={classes.streamsDirectory}>
                        {props.streams.map(stream => {
                            return (
                                <div key={stream.id}>
                                    <StreamCard stream={stream}></StreamCard>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )
};

Game.getInitialProps = async function (context) {
    console.log(context.query)
    let streams = await fetch('https://api.twitch.tv/helix/streams?game_id=' + context.query.id + '&client_id=' + apiKeys.twitch,
        {
            method: 'GET',
            headers: {
                'Client-ID': apiKeys.twitch,
                'Accept': 'application/vnd.twitchtv.v5+json'
            },
            mode: 'cors',
            cache: 'default'
        });
    let streamsJson = await streams.json();
    console.log(streamsJson)
    return { streams: streamsJson.data, gameName: context.query.gameName };
};

export default Game;
