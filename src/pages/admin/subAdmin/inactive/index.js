import { Card } from "@mui/material";
import React from "react";
import PaginationButtons from "src/components/pagination";
import DataTable from "../active/datatable";
import useSubAdminsPagination from "../hooks/useSubAdminsPagination";

const Index = ({ data, fetchData }) => {
  const { data: list, last_page, from } = data;
  const { count, onChange, page, rowStart } = useSubAdminsPagination(
    { last_page, from },
    fetchData
  );

  return (
    <>
      <Card sx={{ p: 2 }}>
        <DataTable data={list} fetchData={fetchData} rowStart={rowStart} />
      </Card>
      <PaginationButtons count={count} onChange={onChange} page={page} />
    </>
  );
};

export default Index;
