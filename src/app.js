import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
   // Link,
   // useRouteMatch,
   // useParams
} from "react-router-dom";
import { Provider } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import GameList from './pages/gameList'
import StreamList from './pages/streamList'
import Layout from './components/layout'
import Stream from "./pages/stream";
import Twitch from "./pages/auth/twitch";

const useStyles = makeStyles(theme => ({
   links: {
      '& a': {
         textDecoration: 'none',
         color: 'inherit'
      }
   }
}));

export default function App(props) {
   const classes = useStyles();

   return (
      <Provider store={props.store}>
         <Router>
            <div className={classes.links}>
               <Layout>
                     <Switch>
                        {/* <Route path="/login" component={Login} />
                     <Route path="/signin" component={Signin} /> */}
                        <Route path="/game/:gameId" component={StreamList} />
                        <Route path="/stream/:userId" component={Stream} />
                        <Route path="/auth/twitch" component={Twitch} />
                        <Route exact path="/" component={GameList} />
                        <Route path="/">
                           <Redirect to='/' />
                        </Route>

                     </Switch>
               </Layout>
            </div>
         </Router >
      </Provider>
   );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
   console.log(localStorage)
   // If not connected
   if (false) {

   } else {
      return <Route {...rest} render={(props) => <Component {...props} />} />
   }
}