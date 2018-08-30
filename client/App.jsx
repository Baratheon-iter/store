import React from 'react';
import PropTypes from 'prop-types';
import Chat from './components/CustomerService.jsx'
// import { BrowserRouter, Route } from 'react-router-dom';

import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MainContainer from './containers/MainContainer.jsx';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';




const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 500
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function App(props) {
  const { classes } = props;

  return (
    <div>
      {/* <SnackbarProvider snackbarProps={{ autoHideDuration: 4000 }}> */}
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" nowrap='true'>
              ESTORE FOR THINGS THAT ARE Toight
            </Typography>
            <div onClick={() => window.location.href= window.location.href.split('/')[0] + "/cart"} style = {{position: 'absolute', right: '10%'}}>
              <Button variant="raised" color="secondary" nowrap='true' >
                Cart
              </Button>
            </div>
            <div onClick={() => window.location.href= window.location.href.split('/')[0] + "/logout"} style = {{position: 'absolute', right: '2%'}}>
              <Button variant="raised" color="secondary" nowrap='true'>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
                Toight
              </Typography>
              <Typography variant="title" align="center" color="textSecondary" paragraph>
                Below are some toight things. We only sell the toightest of the toight. We highly
                recommend buying our toight merchandise.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                  <div onClick={() => window.location.href= window.location.href.split('/')[0] + "/cart"}>
                    <Button variant="contained" color="primary">
                      Checkout
                    </Button>
                  </div>
                  </Grid>
                    <Grid item>
                    <div onClick={() => {window.location.href = "https://amazon.com"}}>
                      <Button variant="outlined" color="primary">
                        Be lame
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          {/* <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit
            <Grid container spacing={40}> */}
              <MainContainer classes={classes}/>
            {/* </Grid>
          </div> */}
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="title" align="center" gutterBottom>
            Toight
          </Typography>
          <Typography variant="subheading" align="center" color="textSecondary" component="p">
            Copyright. We'll sue your ass otherwise.
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
      <Chat />
      {/* </SnackbarProvider> */}
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);