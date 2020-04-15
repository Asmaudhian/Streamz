import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import apiKeys from '../apiKey'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import StreamCard from '../components/streamcard'

const useStyles = makeStyles(theme => ({
    streamsDirectory: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
    }
}))

const StreamList = props => {
    const classes = useStyles()
    const [streams, setStreams] = useState([])

    useEffect(() => {
        async function fetchData(){
            let initialStreams = await fetch('https://api.twitch.tv/helix/streams?game_id=' + props.match.params.gameId + '&client_id=' + apiKeys.twitch,
            {
                method: 'GET',
                headers: {
                    'Client-ID': apiKeys.twitch,
                    'Accept': 'application/vnd.twitchtv.v5+json'
                },
                mode: 'cors',
                cache: 'default'
            });
            let streamsJson = await initialStreams.json();
            console.log(streamsJson)
            setStreams(streams.concat(streamsJson.data))
        }
        fetchData()
    }, [])

    return (
        <>
            <CssBaseline />
                <div>
                    {/* <h1>{props.gameName}</h1> */}
                    <div className={classes.streamsDirectory}>
                        {streams.map(stream => {
                            return (
                                <div key={stream.id}>
                                    <StreamCard stream={stream}></StreamCard>
                                </div>
                            )
                        })}
                    </div>
                </div>
        </>
    )
};

export default StreamList;
