import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import fetch from 'isomorphic-unfetch'
import { setData, resetData } from '../../redux/actions/userDataActions';
import React, { useState, useEffect } from 'react'
import store from '../../redux/store'
import {
    useLocation,
    useHistory 
  } from "react-router-dom";
const useStyles = makeStyles(theme => ({

}))


const Twitch = props => {
    const classes = useStyles()
    const history = useHistory();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();

    useEffect(() => {
        getUserData(query.get('code'), store)
    }, [])

    async function getUserData(code, store) {
        let userAccess = await fetch('http://localhost:3030/auth/twitch?code=' + code)
        let userAccessJson = await userAccess.json();

        console.log(userAccessJson.access_token)

        let user = await fetch('https://api.twitch.tv/helix/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Authorization': 'Bearer ' + userAccessJson.access_token
            },
            mode: 'cors',
            cache: 'default'
        })
        let userJson = await user.json()

        let follows = await fetch('https://api.twitch.tv/helix/users/follows?first=100&from_id=' + userJson.data[0].id, {
            method: 'GET',
            headers: {
                // 'Client-ID': '',
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Authorization': 'Bearer ' + userAccessJson.access_token
            },
            mode: 'cors',
            cache: 'default'
        })
        let followsJson = await follows.json()
        console.log(followsJson)
        let followString = ''
        let followLength = followsJson.data.length
        followsJson.data.map((follow, i) => {
            if (followLength !== i + 1) {
                followString += ('user_id=' + follow.to_id + '&')
            } else {
                followString += ('user_id=' + follow.to_id)
            }
        })

        let streams = await fetch('https://api.twitch.tv/helix/streams?' + followString,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Authorization': 'Bearer ' + userAccessJson.access_token
                },
                mode: 'cors',
                cache: 'default'
            });
        let streamsJson = await streams.json();
        console.log(streamsJson)

        let streamsLength = streamsJson.data.length
        let streamString = ''
        streamsJson.data.map((stream, i) => {
            if (streamsLength !== i + 1) {
                streamString += ('id=' + stream.user_id + '&')
            } else {
                streamString += ('id=' + stream.user_id)
            }
        })

        let streamers = await fetch('https://api.twitch.tv/helix/users?' + streamString, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Authorization': 'Bearer ' + userAccessJson.access_token
            },
            mode: 'cors',
            cache: 'default'
        })
        let streamersJson = await streamers.json()
        console.log(streamersJson)
        streamsJson.data.map((stream, i) => {
            stream.profile_image = streamersJson.data[i].profile_image_url
        })

        // return streamsJson.data
        store.dispatch(setData(streamsJson.data))

        setTimeout(() => {
            history.push('/')
        }, 3000);
        
        // decrementCounter()
        // store.dispatch(setData('streamsJson.data'))
    }

    return (
        <>
            <CssBaseline />
        </>
    )
};

// Twitch.getInitialProps = async function ({ store, isServer, pathname, query }) {
//     let userdata = await getUserData(query, store)

//     return { context: query }
// };


export default Twitch;
