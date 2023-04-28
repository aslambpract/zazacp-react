import Map from "src/components/map";
import useAppend from "../hooks/useAppend";
import ComboButton from "./ComboButton";
import ComboProductSection from "./ComboProductSection";

const AppendCombo = () => {
  const { addClick, data, removeClick } = useAppend();
  return (
    <div>
      <Map
        list={data}
        render={(item, i) => (
          <ComboProductSection removeClick={removeClick(i)} value={item} />
        )}
      />

      <ComboButton onClick={addClick} />
    </div>
  );
};

export default AppendCombo;
