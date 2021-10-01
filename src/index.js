import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { UnitContextProvider } from "./store/unit-context";
import { ProductContextProvider } from "./store/product-context";
import { NutritionalValueContextProvider } from "./store/nutritional-value-context";

ReactDOM.render(
  <UnitContextProvider>
    <NutritionalValueContextProvider>
      <ProductContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </ProductContextProvider>
    </NutritionalValueContextProvider>
  </UnitContextProvider>,

  document.getElementById("root")
);
