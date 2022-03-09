import { Chart } from "react-google-charts";
import { useData } from "../../hooks/use-data";

const Charts = () => {
  const optionsMonth = {
    title: "This month's nutritional values",
    is3D: true,
  };
  const optionsWeek = {
    title: "This week's nutritional values",
    is3D: true,
  };

  const { data: monthMenus } = useData("monthly_menus/");
  const monthMenusEntries = monthMenus.nutritional_value
    ? Object.entries(monthMenus.nutritional_value)
    : [];
  let monthMenusTransformed = monthMenusEntries
    ? monthMenusEntries.map((elem) => {
        return [elem[0], parseInt(elem[1])];
      })
    : [];
  monthMenusTransformed.unshift(["Nutritional Value", "G per Month"]);

  const { data: weekMenus } = useData("weekly_menus/");
  const weekMenusEntries = weekMenus.nutritional_value
    ? Object.entries(weekMenus.nutritional_value)
    : [];
  let weekMenusTransformed = weekMenusEntries
    ? weekMenusEntries.map((elem) => {
        return [elem[0], parseInt(elem[1])];
      })
    : [];
  weekMenusTransformed.unshift(["Nutritional Value", "G per Month"]);

  return (
    <>
      <div className="flex justify-center">
        <Chart
          chartType="PieChart"
          data={monthMenusTransformed}
          options={optionsMonth}
          width={"100%"}
          height={"700px"}
        />
        <Chart
          chartType="PieChart"
          data={weekMenusTransformed}
          options={optionsWeek}
          width={"100%"}
          height={"700px"}
        />
      </div>
    </>
  );
};

export default Charts;
