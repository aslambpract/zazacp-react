import DataFilter from "./dataFilter";
import DataTable from "./dataTable";

const SubscriptionSales = ({ tableData, fetchData, rowStart }) => {
  return (
    <div>
      <DataFilter fetchData={fetchData} />
      <DataTable data={tableData} rowStart={rowStart} />
    </div>
  );
};

export default SubscriptionSales;
