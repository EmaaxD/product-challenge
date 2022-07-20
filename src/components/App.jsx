import { ProductProvider } from "../context/actions/ProductProvider";
import { MainRoutes } from "../router";

import "./../assets/styles/App.css";

function App() {
  return (
    <div className="app">
      <ProductProvider>
        <MainRoutes />
      </ProductProvider>
    </div>
  );
}

export default App;
