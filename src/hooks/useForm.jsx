import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { productContext } from "../context/actions/ProductProvider";

import { getRandomId } from "../utils/getRandomId";
import {
  validationArray,
  validationNumber,
  validationString,
} from "../utils/validations";

export const useForm = (initialState, edit) => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState(null);
  const [timer, setTimer] = useState(null);

  const navegation = useNavigate();

  const {
    loading,
    products,
    selectedProduct,
    handleGetProducts,
    handleSelectedProduct,
    handleCreateProduct,
    handleEditProduct,
  } = useContext(productContext);

  const handleChangeInputs = ({ target }) => {
    setForm((c) => ({
      ...c,
      [target.name]: target.value,
    }));
  };

  const handleChangeMultiSelect = ({ target: { name, value } }) => {
    setForm((c) => ({
      ...c,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleChangeCheck = ({ target }) => {
    setForm((c) => ({
      ...c,
      [target.name]: target.checked,
    }));
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      await validationString(form.title);
      await validationString(form.image);
      await validationString(form.category);
      await validationString(form.rate);
      await validationString(form.description);
      await validationNumber(form.price);
      await validationArray(form.colors, "colors");
      await validationArray(form.sizes, "sizes");

      const product = {
        id: getRandomId(),
        title: form.title,
        price: Number(form.price),
        off: form.off ? "25%" : false,
        codeOff: form.off ? "#MONHPY" : false,
        image: form.image,
        colors: form.colors.map((item) => ({ value: item, text: item })),
        description: form.description,
        sizes: form.sizes.map((item) => ({
          value: item,
          text: item.toUpperCase(),
        })),
        rate: form.rate,
        category: form.category,
      };

      handleCreateProduct(product);
      setSuccess("Producto creado correctamente");
      setForm(initialState);

      const timerSuccess = setTimeout(() => {
        setSuccess(null);
        navegation("/");
      }, 2000);
      setTimer(timerSuccess);
    } catch (error) {
      console.log("error form", form);
      setError(error.message);
      const timerSuccess = setTimeout(() => {
        setError(null);
      }, 5000);
      setTimer(timerSuccess);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      await validationString(form.title);
      await validationString(form.image);
      await validationString(form.category);
      await validationString(form.rate);
      await validationString(form.description);
      await validationNumber(form.price);
      await validationArray(form.colors, "colors");
      await validationArray(form.sizes, "sizes");

      const product = {
        ...selectedProduct,
        title: form.title,
        price: Number(form.price),
        off: form.off ? "25%" : false,
        codeOff: form.off ? "#MONHPY" : false,
        image: form.image,
        colors: form.colors.map((item) => ({ value: item, text: item })),
        description: form.description,
        sizes: form.sizes.map((item) => ({
          value: item,
          text: item.toUpperCase(),
        })),
        rate: form.rate,
        category: form.category,
      };

      handleEditProduct(product);

      setSuccess("Producto editado correctamente");

      const timerSuccess = setTimeout(() => {
        setSuccess(null);
        navegation("/");
      }, 2000);
      setTimer(timerSuccess);
    } catch (error) {
      console.log("error form", form);
      setError(error.message);
      const timerSuccess = setTimeout(() => {
        setError(null);
      }, 5000);
      setTimer(timerSuccess);
    }
  };

  useEffect(() => {
    (async function () {
      if (edit) {
        if (selectedProduct && Object.keys(selectedProduct).length > 0) {
          setForm((c) => ({
            ...selectedProduct,
            colors: selectedProduct.colors.map((item) => item.value),
            sizes: selectedProduct.sizes.map((item) => item.value),
            off: selectedProduct.off ? true : false,
          }));
        }
      }
    })();
  }, [selectedProduct]);

  useEffect(() => {
    (async function () {
      if (edit) {
        if (!selectedProduct && products.length > 0) {
          handleSelectedProduct(edit);
        }
      }
    })();
  }, [products]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return {
    error,
    loading,
    form,
    success,
    handleChangeInputs,
    handleChangeMultiSelect,
    handleChangeCheck,
    handleSubmitCreate,
    handleSubmitEdit,
  };
};
