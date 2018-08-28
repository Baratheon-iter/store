//Will need state to render the products on the the main page. 
import React from 'react';
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


class ProductDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    let products = [];
    const {classes} = this.props;
    for(let i = 0; i < this.props.products.length; i++) {
      products.push(
        (<Card style = {{margin: '25px'}} className={classes.card} key={i}>
          <CardMedia
            className={classes.cardMedia}
            image={this.props.products[i]['product-image-path']} // eslint-disable-line max-len
            title={this.props.products[i].title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.products[i].title}
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
          </CardActions>
        </Card>));
    }

    console.log(products)

    return (
      <Grid style={{paddingLeft: '80px', marginLeft: 'auto', marginRight: 'auto', width: '100%'}}container spacing={40}>
        {/* //Should display ProductItems.  */}
        {products}
      </Grid>
    );
  }

}



export default ProductDisplay; 