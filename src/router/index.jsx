import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ButtonAddProduct } from "../components/UI/Buttons";

import { Home } from "../pages/Home";
import { ProductCreate } from "../pages/ProductCreate";
import { ProductDetails } from "../pages/ProductDetails";
import { ProductEdit } from "../pages/ProductEdit";
import NotFound from "../pages/NotFound";

export const MainRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-create" element={<ProductCreate />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/product-edit/:id" element={<ProductEdit />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ButtonAddProduct />
      </BrowserRouter>
    </>
  );
};
