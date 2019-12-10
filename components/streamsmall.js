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
    // media: {
    //     height: 180,
    // },
});

export default function StreamSmall(props) {
    const classes = useStyles();
    let stream = props.stream;
    return (
        <Link href="/">
        {/* // <Link href={{ pathname: "/stream/[id]", query: { streamer: stream.user_name, viewers: stream.viewer_count, title: stream.title } }} as={`/stream/${stream.user_name}`}> */}
            <ListItem className={classes.streamCard} button>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
        </Link>
    );
}
