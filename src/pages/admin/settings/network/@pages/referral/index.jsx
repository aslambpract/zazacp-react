import Row from "./components/row";
import Table from "./components/table";
import useReferral from "./hooks/useReferral";

const Referral = () => {
  const { data, handleUpdate, onSubmit } = useReferral();

  return (
    <Table>
      {data.map((item) => (
        <Row handleUpdate={handleUpdate} onSubmit={onSubmit} {...item} />
      ))}
    </Table>
  );
};

export default Referral;
