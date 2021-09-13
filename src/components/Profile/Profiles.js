import classes from "./Profiles.module.css";
import { useCallback, useEffect, useState, useRef } from "react";
import Modal from "../UI/Modal";

const UserProfile = () => {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unitIsShown, setUnitIsShown] = useState(false);

  const shortnameInputRef = useRef();
  const nameInputRef = useRef();

  const token = localStorage.getItem("token");

  const fetchUnitsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/units/", {
        headers: { Authorization: "access_token " + token },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      setUnits(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchUnitsHandler();
  }, [fetchUnitsHandler]);

  const deleteRow = useCallback(
    async (shortname) => {
      try {
        const response = await fetch("http://localhost:5000/units/", {
          method: "DELETE",
          headers: {
            Authorization: "access_token " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shortname: shortname }),
        });
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        setError(error.message);
      }

      fetchUnitsHandler();
    },
    [fetchUnitsHandler, token]
  );

  const showModal = () => {
    setUnitIsShown(true);
  };

  const hideModal = () => {
    setUnitIsShown(false);
  };

  const addRow = useCallback(
    async (unit) => {
      try {
        const response = await fetch("http://localhost:5000/units/", {
          method: "POST",
          headers: {
            Authorization: "access_token " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shortname: unit.shortname, name: unit.name }),
        });
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        setError(error.message);
      }

      fetchUnitsHandler();
    },
    [fetchUnitsHandler, token]
  );

  const addHandler = (event) => {
    event.preventDefault();

    const enteredShortname = shortnameInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    addRow({ shortname: enteredShortname, name: enteredName });
    hideModal();
  };

  return (
    <div>
      {unitIsShown && (
        <Modal onClose={hideModal}>
          <h2 className={classes.unitTitle}>
            Enter the name and abbreviation of a unit
          </h2>
          <form onSubmit={addHandler} className={classes.form}>
            <label htmlFor="shortname">Shortname</label>
            <input type="text" id="shortname" ref={shortnameInputRef} />
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            <button className={classes.add}>Add</button>
          </form>
          <button className={classes.closeButton} onClick={hideModal}>
            Close
          </button>
        </Modal>
      )}
      <button
        className={`${classes.addButton} ${classes.add}`}
        onClick={showModal}
      >
        +
      </button>
      <table className={classes.units}>
        <thead>
          <tr>
            <th>Shortname</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => {
            return (
              <tr key={unit.shortname}>
                <td>{unit.shortname}</td>
                <td>{unit.name}</td>
                <td>
                  <button
                    className={classes.deleteButton}
                    onClick={() => deleteRow(unit.shortname)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
