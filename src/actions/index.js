import {
  LOAD_CATALOG_ERROR,
  LOAD_CATALOG_LOADING,
  LOAD_CATALOG_SUCCESS,
  SET_PRODUCT_INFO,
  SET_PRODUCT_CART,
  SET_OPEN_DRAWER,
  SET_VALUE_FILTER,
  SET_AMOUNT_PRODUCT,
  DELETE_PRODUCT_CART,
} from '../constants';

import api from '../services';

export const loadCatalog = (teste) => async (dispatch) => {
  dispatch({ type: LOAD_CATALOG_LOADING });
  try {    
    const response = await api.get('/v1/supermarkets/18095050/products');
    dispatch({
      type: LOAD_CATALOG_SUCCESS,
      data: response.data.data,      
    })
  } catch (error) {
    dispatch({
      type: LOAD_CATALOG_ERROR,
      error: error.message || 'Unexpected Error!!!',
    })
  }
  
  // api.get('/supermarkets/18095050/products').then(
  //   (response) =>    
  //   dispatch({
  //     type: LOAD_CATALOG_SUCCESS,
  //     data: response.data.data,      
  //   }),
  //   (error) =>
  //     dispatch({
  //       type: LOAD_CATALOG_ERROR,
  //       error: error.message || 'Unexpected Error!!!',
  //     })
  // );
};

export const setProductInfo = (id) => {
  return {
    type: SET_PRODUCT_INFO,
    payload: id,
  };
};

export const setProductCart = (id) => {
  return {
    type: SET_PRODUCT_CART,
    _id: id,
  };
};

export const setOpenDrawer = (receiver) => {
  return {
    type: SET_OPEN_DRAWER,
    receiver: receiver,
  };
};

export const setValueFilter = (value) => {
  return {
    type: SET_VALUE_FILTER,
    value: value,
  };
};

export const setAmountProduct = (id, operation) => {
  return {
    type: SET_AMOUNT_PRODUCT,
    _id: id,
    operation: operation,
  };
};

export const deleteProductcart = (id) => {
  return {
    type: DELETE_PRODUCT_CART,
    _id: id,
  };
};
