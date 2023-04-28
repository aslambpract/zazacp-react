import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "src/utils/axios";

import { object, string } from "yup";

const Validator = object().shape({
  name: string().required("Company name is required"),
  address: string().required("Address is required"),
  email: string().required("Email is required").email("Enter a valid Email"),
});

const useCompanyDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [detailId, setDetailId] = useState(null);
  const defaultValues = {
    name: "",
    address: "",
    email: "",
    favicon: "",
    side_bar_logo: "",
    logo: "",
    active: 1,
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Validator),
  });

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance("/api/admin/brand-company-details");
      const { status, data: details } = data;
      if (status) {
        const {
          email,
          name,
          address,
          favicon,
          logo,
          active,
          side_bar_logo,
          id,
        } = details;

        setDetailId(id);
        methods.reset({
          email,
          name,
          address,
          favicon,
          logo,
          active,
          side_bar_logo,
        });
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { methods, detailId };
};

export default useCompanyDetails;
