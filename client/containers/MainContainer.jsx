import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent.jsx';
import Chat from '../components/CustomerService.jsx';
import ProductDisplay from '../components/ProductDisplayComponent.jsx';
import * as actions from '../actions/actions.js'

const mapStateToProps = store => {
  console.log(store)
  return {
  products: store.products,
}};

const dispatchStateToProps = dispatch => ({
  loadProducts: (products) => dispatch(actions.loadProducts(products)),
});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>       
        <HeaderComponent />
        <ProductDisplay products={this.props.products}/> 
        <Chat />
      </div>
      );
  }

  componentDidMount () {
    fetch('http://localhost:3000/main')
    .then((data) => data.json())
    .then((data) => {
      this.props.loadProducts(data);
    });
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(MainContainer);