import { useState, useRef } from "react";
import { useData } from "../../hooks/use-data";
import Modal from "../UI/Modal";
import Table from "../UI/Table";

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [nutritionalValue, setNutritionalValue] = useState([]);

  const {
    data: products,
    deleteData: deleteProduct,
    addData: addProducts,
  } = useData("products/");

  const { data: nutritionalValueList } = useData("nutritional_value/");

  const descriptionInputRef = useRef();
  const nameInputRef = useRef();
  const supermarketInputRef = useRef();
  const nutritionalValueInputRef = useRef();
  const quantityInputRef = useRef();

  const deleteProducts = (name) => {
    deleteProduct({ name: name });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setNutritionalValue([]);
  };

  const addHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredSupermarket = supermarketInputRef.current.value
      .split("\n")
      .filter((elem) => elem.trim() !== "");
    const enteredNutritionalValue = nutritionalValue;

    addProducts({
      name: enteredName,
      description: enteredDescription,
      supermarket: enteredSupermarket,
      nutritional_value: enteredNutritionalValue,
    });
    hideModal();
  };

  const addNutritionalValue = (event) => {
    event.preventDefault();
    const aux = [...nutritionalValue];
    aux.push(nutritionalValueInputRef.current.value.split(","));
    setNutritionalValue(aux);
  };

  const deleteNv = (index) => {
    const aux = [...nutritionalValue];
    aux.splice(index, 1);
    setNutritionalValue(aux);
  };

  const modal = (isModalVisible) => {
    if (isModalVisible) {
      return (
        <Modal onClose={hideModal}>
          <div className="flex justify-between items-center">
            <h2>
              Enter the name, a description, supermarket where to buy and its
              nutritional values (write quantity and then press +)
            </h2>
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
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              ref={nameInputRef}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
              cols="30"
              id="description"
              ref={descriptionInputRef}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="supermarket"
            >
              Supermarket (Separated by Line Break)
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
              cols="30"
              id="supermarket"
              ref={supermarketInputRef}
            ></textarea>
            <div className="inline-flex mt-4">
              <label
                className="block text-gray-700 text-sm mr-2 font-bold mb-2"
                htmlFor="nutritional-value"
              >
                Nutritional <br />
                Value
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="nutritional-value"
                  id="nutritional-value"
                  ref={nutritionalValueInputRef}
                >
                  {nutritionalValueList &&
                    nutritionalValueList.map((nv) => {
                      return (
                        <option
                          key={nv.name}
                          value={nv.name + "," + nv.unit + "," + quantity}
                        >
                          {nv.name}
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
              <label
                className="block ml-2 text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                className="shadow ml-2 mr-2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="quantity"
                ref={quantityInputRef}
                onChange={() => {
                  setQuantity(quantityInputRef.current.value);
                }}
              />
              <button onClick={addNutritionalValue}>
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
            </div>
            <ul className="">
              {nutritionalValue &&
                nutritionalValue.map((nv, index) => {
                  return (
                    <li
                      className="inline-grid grid-cols-2 bg-blue-100 border border-blue-400 text-blue-700 rounded relative w-max mt-2 mr-1"
                      key={nv.name}
                    >
                      {nv.toString()}
                      <button
                        className="flex ml-5 justify-end"
                        type="button"
                        onClick={() => {
                          deleteNv(index);
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
      <Table
        tableHeaders={[
          "name",
          "description",
          "supermarket",
          "nutritional value",
          "units",
          "quantity",
        ]}
        addRow={showModal}
        data={products}
        deleteRow={deleteProducts}
        products={true}
      />
    </div>
  );
};

export default Products;
