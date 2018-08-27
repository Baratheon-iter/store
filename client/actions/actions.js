import * as types from '../constants/actionTypes';

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch("/main")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
}

// export const fetchProductsBegin = () => {
//   type: types.FETCH_PRODUCTS_BEGIN
// }

// export const fetchProductsSuccess = (products) => {
//   type: types.FETCH_PRODUCTS_SUCCESS;
//   payload: { products }
// }

// export const fetchProductsFailure = (error) => {
//   type: types.FETCH_PRODUCTS_ERROR;
//   payload: { error }
// }

export const addMessage = message => ({
  type: types.ADD_MESSAGE,
  payload: message
})

export const updateUserName = user => ({
  type: types.UPDATE_USERNAME,
  payload: user
})
export const fetchProductsFailure = (error) => {
  type: types.FETCH_PRODUCTS_ERROR;
  payload: { error }
}

export const loadProducts = (products) => {
  return {
    type: types.LOAD_PRODUCTS,
    payload: products,
  }
}
