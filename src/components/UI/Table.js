const Table = (props) => {
  const tableHeaders = (tableHeaders) => {
    const ths = tableHeaders.map((th) => {
      return (
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          key={th}
        >
          {th}
        </th>
      );
    });
    return ths;
  };
  const tableBody = (data, tableHeaders) => {
    const tbody = data
      ? data.map((dt) => {
          return (
            <tr key={dt.name}>
              {tableHeaders.map((th) => {
                if (props.products) {
                  if (th === "nutritional value") {
                    return productsFix(dt["nutritional_value"], 0);
                  }
                  if (th === "units") {
                    return productsFix(dt["nutritional_value"], 1);
                  }
                  if (th === "quantity") {
                    return productsFix(dt["nutritional_value"], 2);
                  }
                  if (th === "supermarket") {
                    return productSupermarketFix(dt[th]);
                  }
                }
                if (props.recipes) {
                  if (th === "products") {
                    return productsFix(dt["products"], 0);
                  }
                  if (th === "units") {
                    return productsFix(dt["products"], 1);
                  }
                  if (th === "quantity") {
                    return productsFix(dt["products"], 2);
                  }
                }
                if (props.menus) {
                  if (th === "recipes") {
                    return productSupermarketFix(dt[th]);
                  }
                  if (th === "nutritional value") {
                    const aux = dt["nutritional_value"]
                      ? Object.entries(dt["nutritional_value"])
                      : [];
                    return productSupermarketFix(aux);
                  }
                  if (th === "user") {
                    return (
                      <td
                        key={dt["PK"].substring(6, dt["PK"].length)}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {dt["PK"].substring(5, dt["PK"].length)}
                      </td>
                    );
                  }
                }
                return (
                  <td
                    key={dt[th]}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {dt[th]}
                  </td>
                );
              })}
              <td className="rounded-tr-lg px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {props.menus && !dt["isLocked"] && (
                  <button
                    className=""
                    onClick={() => props.deleteRow(dt[tableHeaders[0]])}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="red"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
                {!props.menus && (
                  <button
                    className=""
                    onClick={() => props.deleteRow(dt[tableHeaders[0]])}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="red"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          );
        })
      : null;
    return tbody;
  };
  const productsFix = (column, index) => {
    return (
      <td
        key={column[index] + index.toString()}
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      >
        {column.map((elem) => {
          return <pre key={elem[index] + Math.random()}>{elem[index]}</pre>;
        })}
      </td>
    );
  };
  const productSupermarketFix = (supermarkets) => {
    return (
      <td
        key={supermarkets}
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      >
        {supermarkets.map((supermarket) => {
          return <pre key={supermarket}>{supermarket}</pre>;
        })}
      </td>
    );
  };

  return (
    <table className="mt-4 p-6 max-w-sm mx-auto bg-white shadow-md">
      <thead className="bg-gray-50">
        <tr>
          {tableHeaders(props.tableHeaders)}
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <button className="" onClick={props.addRow}>
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
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tableBody(props.data, props.tableHeaders)}
      </tbody>
    </table>
  );
};

export default Table;
