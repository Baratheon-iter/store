import * as types from '../constants/actionTypes';

const initialState = {
    cart: [],
    stock: []
}

const products = (state=initialState, action) => {

    let cart;
    let stock;
    let remainder;
    
    switch(action.type) {
        case types.LOAD_PRODUCTS:
            let items = action.payload;
            return {...state, ...{stock: items, cart: state.cart}}
        case types.ADD_CART:
            cart = state.cart;
            stock = state.stock.map(product => {
                if(product.id === action.productID) {
                    const productObj = {
                        id: product.id,
                        quantity: product.quantity - 1,
                        title: product.title,
                        imagePath: product.imagePath,
                        price: product.price
                    }     
                    remainder = productObj.quantity;
                    return productObj;
                } else {
                    return product;
                }
                
                
            });
            const cartObj = {};
            let itemExists = false;
            cart.forEach(itemInCart => {
                if(itemInCart.id === action.productID){
                    itemInCart.count += 1;
                    itemExists = true;
                }
            })
            if(!itemExists){
                cart.push({id: action.productID, count: 1})
            }
            console.log('cart: ', cart);

            console.log('PRODUCT ID: ', action.productID);
            fetch('/api/additem', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: action.productID,
                    count: remainder
                })
            })
                .then((data) => console.log(data))
                .then((data) => {
                    console.log('success');
                });

            return Object.assign(state, {stock, cart})
            
        default:
            return state;
    }
}

export default products;