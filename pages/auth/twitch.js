import Layout from '../../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { withRouter, useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

const useStyles = makeStyles(theme => ({

}))

async function getUserData(params) {
    let userAccess = await fetch('localhost:3030/auth/twitch?code=' + params.code)
    let userAccessJson = await userAccess.json();
    console.log(userAccessJson)
    // console.log(userAccessJson.access_token)

    let user = await fetch('https://api.twitch.tv/helix/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer tokenIci'
        },
        mode: 'cors',
        cache: 'default'
    })
    let userJson = await user.json()
    console.log(userJson)
    let follows = await fetch('https://api.twitch.tv/helix/users/follows?from_id=30179499', {
        method: 'GET',
        headers: {
            // 'Client-ID': '',
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer tokenIci'
        },
        mode: 'cors',
        cache: 'default'
    })
    let followsJson = await follows.json()
    console.log(followsJson)

    let streams = await fetch('https://api.twitch.tv/helix/streams?game_id=' + 21779,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Authorization': 'Bearer tokenIci'
            },
            mode: 'cors',
            cache: 'default'
        });
    let streamsJson = await streams.json();
    console.log(streamsJson)
}

const Twitch = props => {
    const classes = useStyles()
    const { router } = props
    console.log(router)
    getUserData(router.query)
    return (
        <>
            <CssBaseline />
            <Layout>
            </Layout>
        </>
    )
};

Twitch.getInitialProps = async function (context) {
    // return {
    //     stream: {
    //         user_name: context.query.streamer,
    //         title: context.query.title,
    //         viewer_count: context.query.viewers
    //     }
    // };
    return { context: null }
};

export default withRouter(Twitch);
