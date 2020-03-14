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
import { connect } from 'react-redux';
import { decrementCounter, incrementCounter } from '../redux/actions/counterActions';

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
    // console.log(props)
    const [gameListByOffset, setGameListOffset] = (props.games !== undefined) ? useState({ 0: props.games }) : useState({})
    const [gameList, setGames] = (props.games.data !== undefined) ? useState(props.games.data) : useState([])
    const classes = useStyles()

    async function loadMoreGames() {
        gamesOffsets += 100
        let games = await fetch('http://localhost:3030/topgames/' + gamesOffsets)
        let gamesJson = await games.json()
        let temp = { ...gameListByOffset, [gamesOffsets]: gamesJson }
        checkTopGames(temp, gamesOffsets)
        setGameListOffset(temp)
        // setGames(gameList.concat(gamesJson.data))
    }

    function checkTopGames(gameListParam, offset) {
        console.log(gameListParam)
        let offsetArray = Object.keys(gameListParam)
        for (let i = 0; i < gameListParam[offset].data.length; i++) {
            let newGame = gameListParam[offset].data[i]
            for (let oldOffsets of offsetArray) {
                if (parseInt(oldOffsets) !== parseInt(offset)) {
                    for (let j = 0; j < gameListParam[oldOffsets].data.length; j++) {
                        let oldGame = gameListParam[oldOffsets].data[j]
                        if (newGame.game._id === oldGame.game._id) {
                            console.log(newGame.game.name + ' == ' + oldGame.game.name, " MOVED POSITION !")
                            if (gameListParam[offset].timestamp > gameListParam[oldOffsets].timestamp) {
                                console.log(gameListParam[oldOffsets].data[j])
                                gameListParam[oldOffsets].data.splice(j, 1)
                            } else {
                                console.log(gameListParam[offset].data[i])
                                gameListParam[offset].data.splice(i, 1)
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(props)
    return (
        <>
            <CssBaseline />
            <Layout>
                <div>
                    <h1>Browse</h1>
                    <div className={classes.gamesDirectory}>
                        {/* {gameList.map(game => (
                            <div key={game.game._id}>
                                <GameCard game={game}></GameCard>
                            </div>
                        ))} */}
                        {Object.values(gameListByOffset).map((offset) => {
                            return (
                                offset.data.map(game => (
                                    <div key={game.game._id}>
                                        <GameCard game={game}></GameCard>
                                    </div>
                                ))
                            )
                        })
                        }
                    </div>
                    <div className={classes.loadMore}>
                        <Button onClick={loadMoreGames} variant="contained" color="primary">Load more</Button>
                    </div>
                    <div>
                        <button onClick={props.incrementCounter}>Increment</button>
                        <button onClick={props.decrementCounter}>Decrement</button>
                        <h1>{props.counter}</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

async function refreshGames() {
    console.log('fnkoeaz')
}

Index.getInitialProps = async function ({store, isServer, pathname, query}) {
    let games = await fetch('http://localhost:3030/topgames/0');
    let gamesJson = await games.json();
    // console.log(gamesJson)
    console.log(store.getState())
    refreshGames()
    return { games: gamesJson };
};

export default connect()(Index);