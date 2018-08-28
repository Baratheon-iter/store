import React from 'react';
import PropTypes from 'prop-types';
import Chat from './components/CustomerService.jsx'

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
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="title" color="inherit" nowrap='true'>
              ESTORE FOR THINGS THAT ARE Toight.
            </Typography>
            <Button variant="raised" color="inherit" nowrap='true'>
              Logout
            </Button>
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
                recommend buying our toight merchandice.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Checkout
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Be lame
                    </Button>
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
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);