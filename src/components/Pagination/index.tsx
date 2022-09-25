import React from "react";
import { Pagination } from "@mui/material";

const MyPagination: React.FC<{
  count: number;
  onChange: Function;
  page: number;
}> = ({ count, onChange, page }) => {
  return (
    <Pagination
      count={count}
      color="primary"
      page={page}
      onChange={(event, page) => {
        onChange(page);
      }}
    />
  );
};
export default MyPagination;
