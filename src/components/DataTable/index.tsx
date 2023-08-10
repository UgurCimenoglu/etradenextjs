import MUIDataTable, { MUIDataTableProps } from "mui-datatables";

const DataTable = ({ data, title, columns, options }: MUIDataTableProps) => {
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DataTable;
