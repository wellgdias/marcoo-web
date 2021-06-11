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
  LOAD_CHECKOUT_ERROR
} from "../constants";

import { sumCartField } from "../utils";

export const initialState = {
  catalog: {
    products: [],
    loading: false,
    error: "",
    modal: true,
  },
  productDetail: [],
  cart: {
    products: [],
    amount: 0,
    total: 0,
  },
  filterProducts: [],
  drawer: {
    receiver: "",
    open: false,
  },
  cep: "",
  checkout: {
    supermarkets: [],
    loading: false,
    error: "",
    subTotal: 0,
    deliveryFee: 0,
    total: 0,
  },
  productsName: [],
};

export function Reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATALOG_LOADING: {
      return {
        ...state,
        catalog: {
          loading: true, 
          modal: false,                      
        },       
      };
    }
    case LOAD_CATALOG_SUCCESS: {
      return {
        ...state,
        catalog: {
          products: action.data,
          loading: false, 
          modal: false,          
        }
      };
    }
    case LOAD_CATALOG_ERROR: {
      return {
        ...state,
        catalog: {
          loading: false,
          modal: false, 
          error: action.error,
        },
        cep: null,
      };
    }
    case SET_PRODUCT_INFO: {
      const product = state.catalog.products.filter(
        (product) => product._id === action.payload
      );
      return {
        ...state,
        productDetail: product[0],
      };
    }

    case SET_PRODUCT_CART: {
      const productsCart = state.cart.products.map((product) => {
        if (product.info._id === action._id) {
          product.amount += 1;
          product.total =
            parseFloat(product.info.prices[0].price) *
            product.amount;
        }
        return product;
      });

      const hasProduct = state.cart.products.filter((product) => {
        return product.info._id === action._id;
      });

      if (hasProduct.length === 0) {
        const bestPrice = state.productDetail.prices.filter((price) => price.price === state.productDetail.prices[0].price);
        const bestPriceProduct = {
          ...state.productDetail,
          prices: bestPrice
        }

        const product = {
          _id: action._id,
          info: bestPriceProduct,          
          total: parseFloat(
            bestPrice[0].price
          ),
          amount: 1,
        };
        productsCart.push(product);
      }

      const amountCart = sumCartField(productsCart, "amount");
      const totalCart = sumCartField(productsCart, "total");

      return {
        ...state,
        cart: {
          products: productsCart,
          amount: amountCart,
          total: totalCart,
        },
      };
    }

    case SET_OPEN_DRAWER: {
      return {
        ...state,
        drawer: {
          receiver: action.receiver,
          open: !state.drawer.open,
        },
      };
    }

    case SET_VALUE_FILTER: {
      let filteredProducts;
      if (action.value !== "") {
        filteredProducts = state.catalog.products.filter((product) =>
          product.name.toLowerCase().includes(action.value.toLowerCase())
        );
      } else {
        filteredProducts = [];
      }

      return {
        ...state,
        filterProducts: filteredProducts,
      };
    }

    case SET_AMOUNT_PRODUCT: {
      const productsCart = state.cart.products.map((product) => {
        if (product._id === action._id) {
          action.operation === "plus"
            ? (product.amount += 1)
            : (product.amount -= 1);

          product.total =
            parseFloat(product.info.prices[0].price) *
            product.amount;
        }
        return product;
      });

      const amountCart = sumCartField(productsCart, "amount");
      const totalCart = sumCartField(productsCart, "total");

      return {
        ...state,
        cart: {
          products: productsCart,
          amount: amountCart,
          total: totalCart,
        },
      };
    }

    case DELETE_PRODUCT_CART: {
      const productsCart = state.cart.products.filter(
        (product) => product._id !== action._id
      );

      const amountCart = sumCartField(productsCart, "amount");
      const totalCart = sumCartField(productsCart, "total");

      return {
        ...state,
        cart: {
          products: productsCart,
          amount: amountCart,
          total: totalCart,
        },
      };
    }

    case SET_CEP_VALUE: {
      return {
        ...state,
        cep: action.cep,        
      };
    }

    case SET_MODAL_VALUE: {
      return {
        ...state,
        catalog: {
          products: [],
          loading: false,
          error: "",
          modal: true,
        },        
      };
    }

    case DELETE_CART_VALUE: {
      return {
        ...state,
        cart: {
          products: [],
          amount: 0,
          total: 0,
        },      
      };
    }

    case LOAD_CHECKOUT_LOADING: {
      return {
        ...state,
        checkout: {
          loading: true,                        
        },
      };
    }
    case LOAD_CHECKOUT_SUCCESS: {
      const productsName = action.data.supermarkets[0].products
        .map((product) => ({
          name: product.name,
          amount: product.amount
        }));  
      
        const deliveryFee = state.cart.total <= 50 ? 
          5 : (state.cart.total <= 100 ? 10 : (state.cart.total <= 150 ? 15 : 25))

      return {
        ...state,
        checkout: {
          supermarkets: action.data.supermarkets,
          loading: false,  
          subTotal: state.cart.total,
          deliveryFee: deliveryFee,
          total: state.cart.total + deliveryFee,      
        },
        productsName: productsName,
      };
    }
    case LOAD_CHECKOUT_ERROR: {
      return {
        ...state,
        checkout: {
          loading: false,          
          error: action.error,
        },        
      };
    }
    

    default: {
      return state;
    }
  }
}
