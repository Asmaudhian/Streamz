import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import MainAppBar from './appbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import StreamSmall from './streamsmall'
import apiKeys from '../apiKey'
import store from '../redux'

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

function connectTwitch() {
    // ADD STATE TOKEN TO PREVENT CSRF ATTACKS
    // DO THIS IN BACKEND
    open('https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=' + apiKeys.twitch + '&redirect_uri=http://localhost:3000/auth/twitch&scope=user_read')
}

export default function Layout(props) {
    const [following, setFollowing] = React.useState([]);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    store.userStore.subscribe(() => {
        console.log('_____________________________________________________________________')
        setFollowing(store.userStore.getState())
    })
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
                        {following.map(stream => {
                            <StreamSmall></StreamSmall>
                        })}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={connectTwitch}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary={'Connect with Twitch'} />
                        </ListItem>
                    </List>
                </Drawer>
                <div className={classes.content}>
                    {/* <div className={classes.toolbar} /> */}
                    {props.children}
                </div>
                <style global jsx>{`
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
