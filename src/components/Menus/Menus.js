import { useState, useRef, useContext } from "react";
import Modal from "../UI/Modal";
import Table from "../UI/Table";
import { useData } from "../../hooks/use-data";
import AuthContext from "../../store/auth-context";

const Menus = () => {
  const authCtx = useContext(AuthContext);

  const { data: recipesList } = useData("recipes/");
  const { data: usersList } = useData("users/");

  let date = new Date();
  let day = date.getDay();
  let diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const first = new Date(date.setDate(diff));
  let last = new Date(first);
  last.setDate(last.getDate() + 6);
  let firstDayWeek = first.toISOString().split("T")[0];
  let lastDayWeek = last.toISOString().split("T")[0];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userFilter, setUserFilter] = useState(authCtx.user);
  const [firstDayFilter, setFirstDayFilter] = useState(firstDayWeek);
  const [lastDayFilter, setLastDayFilter] = useState(lastDayWeek);
  const [recipes, setRecipes] = useState([]);

  const userInputRef = useRef();
  const recipesInputRef = useRef();
  const dateInputRef = useRef();
  const userFilterInputRef = useRef();
  const firstDateFilterInputRef = useRef();
  const lastDateFilterInputRef = useRef();

  const {
    data: menus,
    deleteData: deleteMenus,
    addData: addMenus,
    setIsUpdated: setIsUpdatedMenus,
  } = useData(
    `menus?user=${
      userFilterInputRef.current ? userFilterInputRef.current.value : userFilter
    }&from=${
      firstDateFilterInputRef.current
        ? firstDateFilterInputRef.current.value
        : firstDayWeek
    }&to=${
      lastDateFilterInputRef.current
        ? lastDateFilterInputRef.current.value
        : lastDayWeek
    }/`
  );

  const menusFilterHandler = (event) => {
    event.preventDefault();
    setUserFilter(userFilterInputRef.current.value ?? null);
    setFirstDayFilter(firstDateFilterInputRef.current.value ?? null);
    setLastDayFilter(lastDateFilterInputRef.current.value ?? null);
    setIsUpdatedMenus(false);
  };

  const deleteMenu = (date) => {
    deleteMenus({ date: date });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setRecipes([]);
  };

  const addHandler = (event) => {
    event.preventDefault();

    const enteredDate = dateInputRef.current.value;
    const enteredUser = userInputRef.current.value;
    const enteredRecipes = recipes;

    addMenus({
      date: enteredDate,
      user: enteredUser,
      recipes: enteredRecipes,
    });

    hideModal();
  };

  const addRecipes = (event) => {
    event.preventDefault();

    const aux = recipesInputRef.current.value;
    setRecipes([...recipes, aux]);
  };

  //delete
  const deleteRecipes = (index) => {
    const aux = [...recipes];
    aux.splice(index, 1);
    setRecipes(aux);
  };

  const modal = (isVisible) => {
    if (isVisible) {
      return (
        <Modal onClose={hideModal}>
          <div className="flex justify-between items-center">
            <h2>Enter the name and abbreviation of a unit</h2>
            <button className="absolute top-0 right-0" onClick={hideModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="grey"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <form className="px-8 pt-6 pb-8 mb-4 mt-4" onSubmit={addHandler}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="date"
              ref={dateInputRef}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              User
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="user"
              ref={userInputRef}
            >
              {usersList &&
                usersList.map((user) => {
                  return (
                    <option key={user.username} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
            </select>
            <label
              className="block text-gray-700 text-sm mr-2 font-bold mb-2"
              htmlFor="nutritional-value"
            >
              Recipes
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="nutritional-value"
                id="nutritional-value"
                ref={recipesInputRef}
              >
                {recipesList &&
                  recipesList.map((recipe) => {
                    return (
                      <option key={recipe.name} value={recipe.name}>
                        {recipe.name}
                      </option>
                    );
                  })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button onClick={addRecipes}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="border-2 border-green-400 rounded h-6 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="green"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <ul className="">
              {recipes &&
                recipes.map((recipe, index) => {
                  return (
                    <li
                      className="inline-grid grid-cols-2 bg-blue-100 border border-blue-400 text-blue-700 rounded relative w-max mt-2 mr-1"
                      key={recipe.name}
                    >
                      {recipe.toString()}
                      <button
                        className="flex ml-5 justify-end"
                        type="button"
                        onClick={() => {
                          deleteRecipes(index);
                        }}
                      >
                        <svg
                          className="flex h-4 w-4 text-black justify-end"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
            </ul>
            <div className="inline-flex float-right mt-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded-full">
                Add
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={hideModal}
              >
                Close
              </button>
            </div>
          </form>
        </Modal>
      );
    }
    return null;
  };

  return (
    <div>
      {modal(isModalVisible)}
      <div className="flex justify-center mt-2">
        <select
          className="border border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={userFilterInputRef}
          value={userFilter}
          onChange={menusFilterHandler}
        >
          {usersList &&
            usersList.map((user) => {
              return (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
        </select>
        <input
          className="border border-black rounded"
          type="date"
          value={firstDayFilter}
          ref={firstDateFilterInputRef}
          onChange={menusFilterHandler}
        ></input>
        <input
          className="border border-black rounded"
          type="date"
          value={lastDayFilter}
          ref={lastDateFilterInputRef}
          onChange={menusFilterHandler}
        ></input>
      </div>
      <Table
        tableHeaders={["date", "user", "recipes", "nutritional value"]}
        addRow={showModal}
        data={menus}
        deleteRow={deleteMenu}
        menus={true}
      />
    </div>
  );
};

export default Menus;
