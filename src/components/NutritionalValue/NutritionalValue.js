import { useState, useRef } from "react";
import Modal from "../UI/Modal";
import Table from "../UI/Table";
import {
  useNutritionalValue,
  deleteNutritionalValue,
  addNutritionalValue,
} from "../../hooks/use-nutritional-value";
import { useUnits } from "../../hooks/use-units";

const NutritionalValue = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const nutritionalValue = useNutritionalValue(isUpdated);
  const units = useUnits(true);

  const shortnameInputRef = useRef();
  const nameInputRef = useRef();
  const unitsInputRef = useRef();

  const addNutritionalValues = async (nutritionalValue) => {
    addNutritionalValue(nutritionalValue).then(() => setIsUpdated(!isUpdated));
  };

  const deleteNutritionalValues = async (shortname) => {
    deleteNutritionalValue({ shortname: shortname }).then(() =>
      setIsUpdated(!isUpdated)
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const addHandler = (event) => {
    event.preventDefault();

    const enteredShortname = shortnameInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredUnit = unitsInputRef.current.value;

    addNutritionalValues({
      shortname: enteredShortname,
      name: enteredName,
      unit: enteredUnit,
    });
    hideModal();
  };

  const modal = (isModalVisible) => {
    if (isModalVisible) {
      return (
        <Modal onClose={hideModal}>
          <div className="flex justify-between items-center">
            <h2>
              Enter the name, abbreviation of a nutritional value and select a
              unit
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
              htmlFor="shortname"
            >
              Shortname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="shortname"
              ref={shortnameInputRef}
              placeholder="cal"
            />
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
              placeholder="calories"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="units"
            >
              Units
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="units"
                id="units"
                ref={unitsInputRef}
              >
                {units &&
                  units.map((unit) => {
                    return (
                      <option key={unit.name} value={unit.shortname}>
                        {unit.name}
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
        tableHeaders={["shortname", "name", "unit"]}
        addRow={showModal}
        data={nutritionalValue}
        deleteRow={deleteNutritionalValues}
      />
    </div>
  );
};

export default NutritionalValue;
