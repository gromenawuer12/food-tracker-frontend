import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header>
      <nav class="bg-white shadow dark:bg-gray-800">
        <div class="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <Link class="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6" to="/">
            <div>React Auth</div>
          </Link>

          {!isLoggedIn && (
            <Link class="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6" to="/auth">Login</Link>
          )}
          {isLoggedIn && (
            <Link class="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6" to="/profile">Units</Link>
          )}
          {isLoggedIn && (
            <button class="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6" onClick={logoutHandler}>Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
