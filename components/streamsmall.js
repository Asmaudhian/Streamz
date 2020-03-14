import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

const useStyles = makeStyles({
    streamCard: {
        paddingTop: 0,
        paddingBottom: 0
    },
    profile: {
        width: '100%'
    },
    'MuiListItemText-secondary': {
        color: "red",
        '&:first-letter': {
            color: "red"
        }
    },
    streamlink: {
        textDecoration: 'none',
        color: 'inherit'
    }
    // media: {
    //     height: 180,
    // },
});

export default function StreamSmall(props) {
    const classes = useStyles();
    let stream = props.stream;
    console.log(props)
    return (
        // <Link href="/">
        <Link href={{ pathname: "/stream/[id]", query: { streamer: stream.user_name, viewers: stream.viewer_count, title: stream.title } }} as={`/stream/${stream.user_name}`}>
            <a className={classes.streamlink}>
                <ListItem className={classes.streamCard} button>
                    <ListItemAvatar>
                        <Avatar>
                            <img className={classes.profile} src={stream.profile_image}></img>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={stream.user_name} secondary={'🔴 ' + stream.viewer_count} />
                </ListItem>
            </a>

        </Link>
    );
}
