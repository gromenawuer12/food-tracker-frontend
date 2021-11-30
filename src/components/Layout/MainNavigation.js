import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <NavLink
            activeClassName="border-blue-500"
            className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
            to="/"
            exact
          >
            Home
          </NavLink>

          {!isLoggedIn && (
            <NavLink
              activeClassName="border-blue-500"
              className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
              to="/auth"
            >
              Login
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              activeClassName="border-blue-500"
              className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
              to="/units"
            >
              Units
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              activeClassName="border-blue-500"
              className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
              to="/nutritional-value"
            >
              Nutritional Value
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              activeClassName="border-blue-500"
              className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
              to="/products"
            >
              Product
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              activeClassName="border-blue-500"
              className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
              to="/recipes"
            >
              Recipe
            </NavLink>
          )}
          {isLoggedIn && (
            <button
              className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
