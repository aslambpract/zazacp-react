import { useEffect } from "react";
import { FLAVOR } from "src/config";
import navConfig from "src/layouts/navConfig";
import axiosInstance from "src/utils/axios";
import { getPlan, setPlan } from "src/utils/plan";

const mode = navConfig[FLAVOR];

const fetchConfig = async () => {
  try {
    const { data } = await axiosInstance.get("api/system-config");
    setPlan(data.data || "BINARY");
  } catch (err) {
    return "BINARY";
  }
};

const useMenu = () => {
  const plan = getPlan();
  useEffect(() => {
    if (!plan) {
      fetchConfig();
    }
  }, []);
  return mode[true ? "admin" : "user"];
};

export default useMenu;
