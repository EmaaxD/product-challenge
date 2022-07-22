import { createContext, useReducer, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  PRODUCTS_SET,
  PRODUCTS_ERROR,
  PRODUCT_SELECTED,
  CREATE_PRODUCT,
  SET_FAVORITE_PRO,
  REMOVE_FAVORITE_PRO,
  SET_SHOPPINGCART_PRO,
  REMOVE_SHOPPINGCART_PRO,
  REMOVE_PRODUCT,
  EDIT_PRODUCT,
} from "../types";

import { productReducer, initialState } from "../reducers/productReducer";
import { firestore, storage } from "../../config/firebase";

import { productMock } from "../../utils/productsMock";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    (async function () {
      if (state.products.length === 0) {
        await handleGetProducts();
      }
    })();
  }, []);

  const handleGetProducts = async () => {
    try {
      const docRef = doc(firestore, "products/pWXf48Yr3lJWwtqdpJbD");
      const data = await getDoc(docRef);
      const products = data.data();
      console.log("products", products);

      dispatch({
        type: PRODUCTS_SET,
        payload: products.products,
      });
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

  const handleCreateProduct = async (product) => {
    const docRef = doc(firestore, "products/pWXf48Yr3lJWwtqdpJbD");
    const fileRef = ref(storage, `products/${product.image.name}`);

    await uploadBytes(fileRef, product.image);
    const url = await getDownloadURL(fileRef);

    updateDoc(docRef, {
      products: [...state.products, { ...product, image: url }],
    });

    dispatch({
      type: CREATE_PRODUCT,
      payload: { ...product, image: url },
    });
  };

  const handleEditProduct = async (product) => {
    const docRef = doc(firestore, "products/pWXf48Yr3lJWwtqdpJbD");
    let url = null;

    if (typeof product?.image !== "string") {
      const fileRef = ref(storage, `products/${product.image.name}`);
      await uploadBytes(fileRef, product.image);
      url = await getDownloadURL(fileRef);
    }

    const newProducts = state.products.map((item) =>
      item.id === product.id
        ? { ...item, ...product, image: url ? url : product.image }
        : item
    );

    updateDoc(docRef, {
      products: [...newProducts],
    });

    dispatch({
      type: EDIT_PRODUCT,
      payload: { ...product, image: url ? url : product.image },
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

  const handleAddShoppingCart = (idProduct) => {
    const product = state.products.find((item) => item.id === idProduct);

    const search = state.shoppingProducts.find((item) => item.id === idProduct);

    if (search) {
      const products = state.shoppingProducts.filter(
        (item) => item.id !== idProduct
      );
      dispatch({
        type: REMOVE_SHOPPINGCART_PRO,
        payload: products,
      });
    } else {
      dispatch({
        type: SET_SHOPPINGCART_PRO,
        payload: product,
      });
    }
  };

  const handleRemoveProduct = (idProduct) => {
    const docRef = doc(firestore, "products/pWXf48Yr3lJWwtqdpJbD");

    const searchFav = state.favoriteProducts.find(
      (item) => item.id === idProduct
    );
    const searchShop = state.shoppingProducts.find(
      (item) => item.id === idProduct
    );

    if (searchFav) {
      const products = state.favoriteProducts.filter(
        (item) => item.id !== idProduct
      );

      dispatch({
        type: REMOVE_FAVORITE_PRO,
        payload: products,
      });
    }

    if (searchShop) {
      const products = state.favoriteProducts.filter(
        (item) => item.id !== idProduct
      );

      dispatch({
        type: REMOVE_SHOPPINGCART_PRO,
        payload: products,
      });
    }

    const products = state.products.filter((item) => item.id !== idProduct);

    updateDoc(docRef, {
      products: [...products],
    });

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
        shoppingProducts: state.shoppingProducts,
        handleGetProducts,
        handleSelectedProduct,
        handleCreateProduct,
        handleEditProduct,
        handleAddFavorite,
        handleAddShoppingCart,
        handleRemoveProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
