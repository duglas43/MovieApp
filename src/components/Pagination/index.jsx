import React from "react";
import { Pagination } from "@mui/material";
function MyPagination({ count, onChange, page }) {
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
}
export default MyPagination;
