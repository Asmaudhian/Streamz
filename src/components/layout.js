import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MainAppBar from './appbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import StreamSmall from './streamsmall'
import apiKeys from '../apiKey'
import {
    useLocation,
    useHistory
} from "react-router-dom";
import store from '../redux/store'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        // flexGrow: 1,
        marginTop: 30,
        padding: theme.spacing(5),
        paddingRight: 0,
        width: '100%'
    },
    toolbar: theme.mixins.toolbar,
}));

const Layout = props => {
    const [following, setFollowing] = useState([])
    const history = useHistory();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'dark', //change to get dark mode
                },
            }),
        [prefersDarkMode],
    );
    const classes = useStyles();
    console.log(store.getState())
    function connectTwitch() {
        // ADD STATE TOKEN TO PREVENT CSRF ATTACKS
        // DO THIS IN BACKEND
        let url = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=' + apiKeys.twitch + '&redirect_uri=http://localhost:3000/auth/twitch&scope=user_read'
        window.location.href = url;
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <MainAppBar />
                {/* </MainAppBar> */}
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))} */}
                        {store.getState().userData.data.map(stream => {
                            return <StreamSmall key={'small' + stream.user_id} stream={stream}></StreamSmall>
                        })}
                    </List>
                    <Divider />
                    <List>
                        {
                            (store.getState().userData.data.length > 0) ? <span></span> : <ListItem button onClick={connectTwitch}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText primary={'Connect with Twitch'} />
                            </ListItem>
                        }

                    </List>
                    <div>
                        {/* <button onClick={props.incrementCounter}>Increment</button>
                        <button onClick={props.decrementCounter}>Decrement</button> */}
                        {/* <h1>{props.userData}</h1> */}
                    </div>
                </Drawer>
                <div className={classes.content}>
                    {/* <div className={classes.toolbar} /> */}
                    {props.children}
                </div>
                <style>{`
                    html,
                    body,
                    body > div:first-child,
                    div#__next,
                    div#__next > div,
                    div#__next > div > div {
                        height: 100%;
                    }
                `}</style>
            </div>
        </ThemeProvider>
    );


}

export default Layout;
