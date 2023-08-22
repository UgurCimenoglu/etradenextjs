import { Order_Detail } from "@/contracts/orders/order_detail";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import React from "react";
import CircularProgressIcon from "../CircularProgress";
import DataTable from "../DataTable";

type Props = {
  data: Order_Detail | undefined;
};
const OrderDetail = (props: Props) => {
  const columns: MUIDataTableColumn[] = [
    {
      label: "Name",
      name: "name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Price",
      name: "price",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Quantity",
      name: "quantity",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options: MUIDataTableOptions | undefined = {
    filterType: "textField",
    filter: "false",
    print: "false",
    search: "false",
    download: "false",
    viewColumns: "false",
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 12,
    rowsPerPageOptions: [],
    rowHover: true,
    fixedHeader: true,
    tableBodyHeight: "auto",
    selectableRowsHeader: false,
    expandableRows: false,
    expandableRowsOnClick: false,
    pagination: true,
    expandableRowsHeader: false,
    serverSide: false,
    textLabels: {
      body: {
        noMatch: !props.data ?? <CircularProgressIcon sx={{ width: "100%" }} />,
      },
    },
  };

  if (!props.data) return <p>Hata</p>;
  return (
    <div>
      <p>
        <strong>Sipariş Kodu : </strong>
        {props.data.orderCode}
      </p>

      <p>
        <strong>Adres : </strong>
        {props.data.address}
      </p>

      <p>
        <strong>Sipariş Açıklaması : </strong>
        {props.data.description}
      </p>
      <DataTable
        title="Order"
        columns={columns}
        options={options}
        data={props.data.basketItems}
      />
    </div>
  );
};

export default OrderDetail;
