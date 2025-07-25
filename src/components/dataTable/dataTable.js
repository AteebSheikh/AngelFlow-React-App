import React from "react";
import MUIDataTable from "mui-datatables";

const DataTable = ({ data, columns, options }) => {
  return (
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
      className="view-project-table"
    />
  );
};

export default DataTable;
