import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UnitsPage from "./pages/UnitsPage";
import NutritionalValuePage from "./pages/NutritionalValuePage";
import ProductsPage from "./pages/ProductsPage";
import RecipesPage from "./pages/RecipesPage";
import MenusPage from "./pages/MenusPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ChartsPage from "./pages/ChartsPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        {!authCtx.isLoggedIn && (
          <Route path="/" exact>
            <HomePage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/" exact>
            <ChartsPage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/units">
            <UnitsPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/nutritional-value">
            <NutritionalValuePage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/products">
            <ProductsPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/recipes">
            <RecipesPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/menus">
            <MenusPage />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
