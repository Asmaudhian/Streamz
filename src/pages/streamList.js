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

var streamsOffset = 0 

const StreamList = props => {
    const classes = useStyles()
    const [streams, setStreams] = useState([])
    console.log(props)
    console.log('_______________________________________')
    console.log(streams)
    useEffect(() => {
        async function fetchData(){
            let initialStreams = await fetch('https://api.twitch.tv/kraken/streams?game=' + 'VALORANT' + '&client_id=' + apiKeys.twitch,
            {
                method: 'GET',
                headers: {
                    'Client-ID': apiKeys.twitch,
                    'Accept': 'application/vnd.twitchtv.v5+json'
                },
                mode: 'cors',
                cache: 'default'
            });
            // let initialStreams = await fetch('http://localhost:3030/streams?gameId=' + props.match.params.gameId + '&offset=0')
            let streamsJson = await initialStreams.json();
            console.log(streamsJson)
            setStreams(streamsJson)
        }
        fetchData()
    }, [])

    return (
        <>
            <CssBaseline />
                <div>
                    {/* <h1>{props.gameName}</h1> */}
                    <div className={classes.streamsDirectory}>
                        {(streams.streams !== undefined) ? streams.streams.map(stream => {
                            console.log(stream)
                            return (
                                <div key={stream.id}>
                                    <StreamCard stream={stream}></StreamCard>
                                    {/* {stream.id} */}
                                </div>
                            )
                        }): <span></span>}
                    </div>
                </div>
        </>
    )
};

export default StreamList;
