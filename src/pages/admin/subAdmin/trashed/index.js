import { Card } from "@mui/material";
import React from "react";
import PaginationButtons from "src/components/pagination";
import useSubAdminsPagination from "../hooks/useSubAdminsPagination";
import DataTable from "./datatable";

const Index = ({ data, fetchData }) => {
  const { data: list, last_page, from } = data;
  const { count, onChange, page, rowStart } = useSubAdminsPagination(
    { last_page, from },
    fetchData
  );
  return (
    <>
      <Card sx={{ p: 2 }}>
        <DataTable data={list} rowStart={rowStart}/>
      </Card>
      <PaginationButtons count={count} onChange={onChange} page={page} />
    </>
  );
};

export default Index;
