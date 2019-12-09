import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from '../components/layout'
import GameCard from '../components/gamecard'
import apiKeys from '../apiKey'
import fetch from 'isomorphic-unfetch'
// import 'typeface-roboto'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  gamesDirectory: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  }
}))

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.'
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.'
  }
]

const Index = (props) => {
  const classes = useStyles()
  console.log(props)
  return (
    <>
      <CssBaseline />
        <Layout>
          <div>
            <h1>Browse</h1>
            <div className={classes.gamesDirectory}>
              {props.games.map(game => (
                <div key={game.game._id}>
                  <GameCard game={game}></GameCard>
                </div>
              ))}
            </div>
          </div>
        </Layout>
    </>
  )
}

Index.getInitialProps = async function () {
  let games = await fetch('https://api.twitch.tv/kraken/games/top?limit=50&client_id=' + apiKeys.twitch,
    {
      method: 'GET',
      headers: {
        'Client-ID': apiKeys.twitch,
        'Accept': 'application/vnd.twitchtv.v5+json'
      },
      mode: 'cors',
      cache: 'default'
    });
  let gamesJson = await games.json();
  console.log(gamesJson)
  return { games: gamesJson.top };
};

export default Index;