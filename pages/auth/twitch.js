import Layout from '../../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { withRouter, useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { connect } from 'react-redux';
import { setData, resetData } from '../../redux/actions/userDataActions';

const useStyles = makeStyles(theme => ({

}))

async function getUserData(params, store) {
    let userAccess = await fetch('http://localhost:3030/auth/twitch?code=' + params.code)
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

    return streamsJson.data
    // decrementCounter()
    // store.dispatch(setData('streamsJson.data'))
}

const Twitch = props => {
    const classes = useStyles()
    return (
        <>
            <CssBaseline />
            <Layout>
            </Layout>
        </>
    )
};

Twitch.getInitialProps = async function ({ store, isServer, pathname, query }) {
    let userdata = await getUserData(query, store)
    store.dispatch(setData(userdata))
    return { context: query }
};

const mapStateToProps = state => ({
    userData: state.userData.data,
    counter: state.counter.value
});

const mapDispatchToProps = {
    setData: setData,
    resetData: resetData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Twitch);
