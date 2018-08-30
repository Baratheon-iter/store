import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

const products = [
  { name: 'Snowpants', desc: 'The toightest snowpants', price: '$18.99' },
  { name: 'T-Shirt', desc: 'Toighter than your average t-shirt', price: '$15.99' },
  { name: 'Blouse', desc: 'This blouse is toight', price: '$35.99' },
  { name: 'Sweater', desc: 'Toight for the cold', price: '$18.99' },
  { name: 'Shipping', desc: 'Toight in rain or wind', price: '18.99' },
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subheading" className={classes.total}>
            $217.90
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default (withStyles(styles), connect(mapStateToProps))(Review);
export default withStyles(styles)(Review);
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Review));
