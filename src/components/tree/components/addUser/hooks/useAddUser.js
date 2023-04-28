import { useState } from "react";

const useAddUser = () => {
  const [openAdd, setOpenAdd] = useState({ status: false, data: null });

  const handleOpenAdd = (tableId, userType) =>
    setOpenAdd({ status: true, tableId, userType });

  const handleCloseAdd = () => setOpenAdd({ status: false, data: null });

  return { openAdd, handleCloseAdd, handleOpenAdd };
};

export default useAddUser;
