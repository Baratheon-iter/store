//Will need state to render the products on the the main page. 
import { connect } from 'react-redux';
import React, { Component } from 'react';
import SingleProduct from '../components/SingleProduct.jsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as actions from '../actions/actions';
// import { SnackbarProvider } from 'material-ui-snackbar-provider'
// import { withSnackbar } from 'material-ui-snackbar-provider'

const mapStateToProps = store => ({
  cart: store.products.cart
});

const mapDispatchToProps = dispatch => ({
  onAddCartClick: productID => dispatch(actions.addCart(productID))
});

class ProductDisplay extends Component {
  constructor(props) {
    super(props);

    this.addCart = this.addCart.bind(this)
  }
  
  addCart(item){
    function inner(e) {
      // alert('added item');
      this.props.onAddCartClick(item);
    }
    return inner.bind(this);
    
    // console.log('data: ', data);
    // 
  }

  render () {
    let products = [];
    const {classes} = this.props;
    for(let i = 0; i < this.props.products.length; i++) {
      products.push(
        (<Card style = {{marginTop: '25px', marginLeft: 'auto', marginRight: 'auto'}} className={classes.card} key={i}>
          <CardMedia
          
            className={classes.cardMedia}
            image={this.props.products[i].imagePath} // eslint-disable-line max-len
            title={this.props.products[i].title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.products[i].title}
            </Typography>
            <Typography>
              Price: ${this.props.products[i].price}                                         
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" color="secondary">
              View
            </Button>
              <Button variant="outlined" size="small" color="secondary" onClick={this.addCart(this.props.products[i].id)}>
                Add to Cart
              </Button>
          </CardActions>
        </Card>));
    }

    return (
      <Grid style={{marginLeft: 'auto', marginRight: 'auto', width: '100%'}}container spacing={40}>
        {/* //Should display ProductItems.  */}
        {products}
      </Grid>
    );
  }
  
  // componentDidMount () {
  //   // document.getElementById('counter').value = this.props.products.cart.length;
  // }

}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);