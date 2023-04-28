import Row from "./components/row";
import useRankSettings from "./hooks/useRankSettings";
import useUpdateRankSettings from "./hooks/useUpdateRankSettings";

const TableBody = () => {
  const data = useRankSettings();
  const onSubmit = useUpdateRankSettings();

  return (
    <tbody>
      {data.map((item) => (
        <Row {...item} onSubmit={onSubmit} />
      ))}
    </tbody>
  );
};

export default TableBody;
