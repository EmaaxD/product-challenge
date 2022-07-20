import { createContext, useReducer, useEffect } from "react";

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
import { productReducer, initialState } from "../reducers/productReducer";

import { productMock } from "../../utils/productsMock";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    (async function () {
      const products = JSON.parse(localStorage.getItem("products"));

      if (products) {
        dispatch({
          type: PRODUCTS_SET,
          payload: products,
        });
      } else {
        if (state.products.length === 0) {
          handleGetProducts();
        }
      }
    })();
  }, []);

  useEffect(() => {
    (function () {
      localStorage.setItem("products", JSON.stringify(state.products));
    })();
  }, [state.products]);

  const handleGetProducts = async () => {
    try {
      setTimeout(() => {
        dispatch({
          type: PRODUCTS_SET,
          payload: productMock,
        });
      }, 3000);
    } catch (error) {
      console.log("error get products", error);
      dispatch({
        type: PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };

  const handleSelectedProduct = (idProduct, custom = {}) => {
    const product = state.products.find((item) => item.id === idProduct);

    dispatch({
      type: PRODUCT_SELECTED,
      payload: { ...product, ...custom },
    });
  };

  const handleCreateProduct = (product) => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: product,
    });
  };

  const handleEditProduct = (product) => {
    dispatch({
      type: EDIT_PRODUCT,
      payload: product,
    });
  };

  const handleAddFavorite = (idProduct) => {
    const product = state.products.find((item) => item.id === idProduct);

    const search = state.favoriteProducts.find((item) => item.id === idProduct);

    if (search) {
      const products = state.favoriteProducts.filter(
        (item) => item.id !== idProduct
      );
      dispatch({
        type: REMOVE_FAVORITE_PRO,
        payload: products,
      });
    } else {
      dispatch({
        type: SET_FAVORITE_PRO,
        payload: product,
      });
    }
  };

  const handleRemoveProduct = (idProduct) => {
    const search = state.favoriteProducts.find((item) => item.id === idProduct);

    if (search) {
      const products = state.favoriteProducts.filter(
        (item) => item.id !== idProduct
      );

      dispatch({
        type: REMOVE_FAVORITE_PRO,
        payload: products,
      });
    }

    const products = state.products.filter((item) => item.id !== idProduct);

    dispatch({
      type: REMOVE_PRODUCT,
      payload: products,
    });
  };

  return (
    <productContext.Provider
      value={{
        loading: state.loading,
        products: state.products,
        error: state.error,
        selectedProduct: state.selectedProduct,
        favoriteProducts: state.favoriteProducts,
        handleGetProducts,
        handleSelectedProduct,
        handleCreateProduct,
        handleEditProduct,
        handleAddFavorite,
        handleRemoveProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
