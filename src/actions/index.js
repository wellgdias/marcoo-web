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
  SET_CEP_VALUE,
  SET_MODAL_VALUE,
  DELETE_CART_VALUE,
  LOAD_CHECKOUT_LOADING,
  LOAD_CHECKOUT_SUCCESS,
  LOAD_CHECKOUT_ERROR,
  SET_CLIENT_VALUE,
  DELETE_CLIENT_VALUE
} from '../constants';

import api from '../services';

export const loadCatalog = (cep) => async (dispatch) => {
  dispatch({ type: LOAD_CATALOG_LOADING });
  try {    
    const response = await api.get(`/v1/supermarkets/${cep}/products`);
    
    dispatch({
      type: LOAD_CATALOG_SUCCESS,
      data: response.data.data,      
    })
  } catch (error) {    
    dispatch({
      type: LOAD_CATALOG_ERROR,
      error: error?.response?.status || 502,
    })
  } 
};

export const loadCheckout = (cep, cart) => async (dispatch) => {  
  const products = cart.products.map((product) => ({    
    idProduct: product._id,
    amount: product.amount,
  }));   

  dispatch({ type: LOAD_CHECKOUT_LOADING });
  try {
    const response = await api.post(`/v1/supermarkets/${cep}/products/checkout`, { data: products  });  
    
    dispatch({
      type: LOAD_CHECKOUT_SUCCESS,
      data: response.data,      
    })
  } catch (error) {      
    dispatch({
      type: LOAD_CHECKOUT_ERROR,
      error: error?.response?.status || 502,
    })
  } 
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

export const setCepValue = (value) => {
  return {
    type: SET_CEP_VALUE,
    cep: value,
  };
};

export const setModalValue = () => {
  return {
    type: SET_MODAL_VALUE    
  };
};


export const deleteCartValue = () => {
  return {
    type: DELETE_CART_VALUE    
  };
};

export const setClient = (name, email) => {
  return {
    type: SET_CLIENT_VALUE,
    name: name,
    email: email,    
  };
};

export const deleteClientValue = () => {
  return {
    type: DELETE_CLIENT_VALUE,      
  };
};



