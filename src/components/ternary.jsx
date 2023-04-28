const Ternary = ({ when, then, otherwise = null }) => {
  return when ? then : otherwise;
};

export default Ternary;
