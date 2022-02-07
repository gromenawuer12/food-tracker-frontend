import { useState, useRef } from "react";
import Modal from "../UI/Modal";
import Table from "../UI/Table";
import { useData } from "../../hooks/use-data";

const Units = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: units,
    deleteData: deleteUnit,
    addData: addUnits,
  } = useData("units/");

  const shortnameInputRef = useRef();
  const nameInputRef = useRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const deleteUnits = (shortname) => {
    deleteUnit({ shortname: shortname });
  };

  const addHandler = (event) => {
    event.preventDefault();

    const enteredShortname = shortnameInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    addUnits({ shortname: enteredShortname, name: enteredName });
    hideModal();
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
              htmlFor="shortname"
            >
              Shortname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="shortname"
              placeholder="kg"
              ref={shortnameInputRef}
            />
            <label
              className="block text-gray-700 text-sm mt-4 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              placeholder="kilogram"
              ref={nameInputRef}
            />
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
        tableHeaders={["shortname", "name"]}
        addRow={showModal}
        data={units}
        deleteRow={deleteUnits}
      />
    </div>
  );
};

export default Units;
