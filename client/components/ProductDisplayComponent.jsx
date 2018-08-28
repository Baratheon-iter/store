//Will need state to render the products on the the main page. 
import React from 'react'
import SingleProduct from '../components/SingleProduct.jsx'


class ProductDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    let products = [];
    for(let i = 0; i < this.props.products.length; i++) {
      products.push((<SingleProduct key={i} itemName={this.props.products[i].title} url={this.props.products[i]['imagePath']} />));
    }

    return (
      <div className="productdisplay"> 
        {/* //Should display ProductItems.  */}
        <p>Super Cool Products</p>
        {products}
      </div>
    );
  }

}



export default ProductDisplay; 