import * as types from '../constants/actionTypes';

export const fetchUserInfo = () => {
  return dispatch => {
    return fetch('/getUserInfo')
      .then(function(response) {
        return response.text()
          .then(function(text) {
            const userObj = JSON.parse(text);
            dispatch(initializeSocketRoom(`${userObj.id}`));
            dispatch(updateUserName(userObj.name));
        });
      })
  }
}

export const addCart = productID => ({
  type: types.ADD_CART,
  productID: productID
})

export const addMessage = message => ({
  type: types.ADD_MESSAGE,
  payload: message
})

export const updateUserName = user => ({
  type: types.UPDATE_USERNAME,
  payload: user
})

export const initializeSocketRoom = socket => ({
  type: types.INITIALIZE_SOCKET_ROOM,
  payload: socket
})

export const fetchProductsFailure = (error) => ({
  type: types.FETCH_PRODUCTS_ERROR,
  payload: { error }
})

export const loadProducts = (products) => {
  return {
    type: types.LOAD_PRODUCTS,
    payload: products,
  }
}

