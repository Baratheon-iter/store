import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent.jsx';
import Chat from '../components/CustomerService.jsx';
import ProductDisplay from '../components/ProductDisplayComponent.jsx';
import * as actions from '../actions/actions.js'
import classNames from 'classnames';

const mapStateToProps = store => {
  return {
  products: store.products.stock,
}};

const dispatchStateToProps = dispatch => ({
  loadProducts: (products) => dispatch(actions.loadProducts(products)),
});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div style={{marginLeft: "auto", marginRight: "auto", width: '100%'}}className={classNames(classes.layout, classes.cardGrid)}>       
        <ProductDisplay classes={this.props.classes} products={this.props.products}/> 
      </div>
      );
  }

  componentDidMount () {
    fetch('http://' + window.location.href.split('//')[1].split('/')[0] + '/main')
    .then((data) => data.json())
    .then((data) => {
      this.props.loadProducts(data);
    });
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(MainContainer);