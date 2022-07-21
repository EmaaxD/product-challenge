import { AuthProvider } from "../context/actions/AuthProvider";
import { ProductProvider } from "../context/actions/ProductProvider";
import { MainRoutes } from "../router";

import "./../assets/styles/App.css";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ProductProvider>
          <MainRoutes />
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
