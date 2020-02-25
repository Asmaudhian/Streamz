import React, { useState } from 'react'
// import useState from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
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
    },
    loadMore: {
        textAlign: 'center',
        marginBottom: 15
    }
}))

var gamesOffsets = 0

const Index = (props) => {
    const [gameList, setGames] = (props.games !== undefined) ? useState(props.games) : useState([])
    const classes = useStyles()

    async function loadMoreGames(){
        gamesOffsets += 100
        let games = await fetch('http://localhost:3030/topgames/' + gamesOffsets)
        let gamesJson = await games.json()
        setGames(gameList.concat(gamesJson.data))
    }

    console.log(props)
    return (
        <>
            <CssBaseline />
            <Layout>
                <div>
                    <h1>Browse</h1>
                    <div className={classes.gamesDirectory}>
                        {gameList.map(game => (
                            <div key={game.game._id}>
                                <GameCard game={game}></GameCard>
                            </div>
                        ))}
                    </div>
                    <div className={classes.loadMore}>
                        <Button onClick={loadMoreGames} variant="contained" color="primary">Load more</Button>
                    </div>
                </div>
            </Layout>
        </>
    )
}

async function refreshGames(){
    console.log('fnkoeaz')
}

Index.getInitialProps = async function () {
    let games = await fetch('http://localhost:3030/topgames/0');
    let gamesJson = await games.json();
    // console.log(gamesJson)
    refreshGames()
    return { games: gamesJson.data };
};

export default Index;