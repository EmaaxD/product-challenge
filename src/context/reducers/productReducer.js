import {
  PRODUCTS_SET,
  PRODUCTS_ERROR,
  PRODUCT_SELECTED,
  CREATE_PRODUCT,
  SET_FAVORITE_PRO,
  REMOVE_FAVORITE_PRO,
  REMOVE_PRODUCT,
  EDIT_PRODUCT,
} from "../types";

export const initialState = {
  loading: true,
  products: [],
  error: null,
  selectedProduct: null,
  favoriteProducts: [],
};

export const productReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case PRODUCTS_SET:
      return {
        ...state,
        loading: false,
        products: actions.payload,
        error: null,
      };

    case PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    case PRODUCT_SELECTED:
      return {
        ...state,
        loading: false,
        selectedProduct: actions.payload,
        error: null,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        products: [actions.payload, ...state.products],
      };

    case SET_FAVORITE_PRO:
      return {
        ...state,
        favoriteProducts: [actions.payload, ...state.favoriteProducts],
      };

    case REMOVE_FAVORITE_PRO:
      return {
        ...state,
        favoriteProducts: actions.payload,
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        products: actions.payload,
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === actions.payload.id ? { ...actions.payload } : item
        ),
      };

    default:
      return state;
  }
};
