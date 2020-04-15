import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import apiKeys from '../apiKey'

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

const Stream = props => {
    const classes = useStyles()
    const [stream, setStream] = useState({})
    console.log(stream)

    useEffect(() => {
        async function fetchData() {
            let streamInfo = await fetch('https://api.twitch.tv/helix/streams?user_id=' + props.match.params.userId + '&client_id=' + apiKeys.twitch,
                {
                    method: 'GET',
                    headers: {
                        'Client-ID': apiKeys.twitch,
                        'Accept': 'application/vnd.twitchtv.v5+json'
                    },
                    mode: 'cors',
                    cache: 'default'
                });
            let streamInfoJson = await streamInfo.json();
            console.log(streamInfoJson)
            let streamInformations = streamInfoJson.data[0]
            setStream(streamInformations)
        }
        fetchData()
    }, [])

    return (
        <>
            <CssBaseline />
            <div className={classes.streamLayout}>
                <h1>{stream.user_name}</h1>
                <iframe src={"https://player.twitch.tv/?channel=" + stream.user_name + '&muted=false'} className={classes.stream} frameBorder="0" allowFullScreen={true} scrolling="no" autoPlay={true}></iframe>
                <iframe src={"https://www.twitch.tv/embed/" + stream.user_name + "/chat?darkpopout"} className={classes.chat} frameBorder="0" scrolling="no"></iframe>
                {/* <h2>{props.stream.title}</h2> */}
                <Typography className={classes.streamTitle} gutterBottom variant="h6" component="h2">
                    {stream.title}
                </Typography>
                <Typography className={classes.streamTitle} gutterBottom variant="subtitle1" component="h6">
                    {stream.viewer_count} viewers
                    </Typography>
            </div>
        </>
    )
};

// Game.getInitialProps = async function (context) {
//     console.log(context.query)
//     return {
//         stream: {
//             user_name: context.query.streamer,
//             title: context.query.title,
//             viewer_count: context.query.viewers
//         }
//     };
// };

export default Stream;
