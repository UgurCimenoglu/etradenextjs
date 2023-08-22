"use client";
import CircularProgressIcon from "@/components/CircularProgress";
import DataTable from "@/components/DataTable";
import { Order } from "@/contracts/orders/order";
import { GetOrders } from "@/services/Order";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import {
  MUIDataTableColumn,
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
} from "mui-datatables";
import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import OrderDetailDialog from "@/components/CustomDialog/Order/OrderDetailDialog";

const Orders = () => {
  const { mutate, data, isLoading } = useMutation(GetOrders, {
    onError: () => {
      alert("Siparişler Listelendirken Hata Meydana Geldi");
    },
    onSuccess: () => {
      console.log("Siparişler Listelendi.");
    },
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false);
  const [pageSize] = useState<number>(12);

  useEffect(() => {
    mutate({ page: currentPage, size: pageSize });
  }, [currentPage]);

  const onTableChangeHandle = (
    action: string,
    tableState: MUIDataTableState
  ) => {
    switch (action) {
      case "changePage":
        mutate({ page: tableState.page, size: pageSize });
        setCurrentPage(tableState.page);
        break;

      default:
        break;
    }
  };

  const onGetOrderDetail = (id: string) => {
    setCurrentOrderId(id);
    setOpenOrderDetail(true);
  };

  const columns: MUIDataTableColumn[] = [
    {
      label: "ID",
      name: "id",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Order Code",
      name: "orderCode",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Username",
      name: "userName",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Total Price",
      name: "totalPrice",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any) => <>₺ {value}</>,
      },
    },
    {
      label: "Created Date",
      name: "createdDate",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any) => {
          return moment(value).format("MMMM Do YYYY, h:mm:ss a");
        },
      },
    },
    {
      label: "Updated Date",
      name: "updatedDate",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any) => {
          if (moment(value).format("YYYY") === "0001") {
            return <span>-</span>;
          } else {
            return moment(value).format("MMMM Do YYYY, h:mm:ss a");
          }
        },
      },
    },
    {
      label: "Completed",
      name: "completed",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any) =>
          value ? <CheckIcon /> : <CloseIcon />,
      },
    },
    {
      label: "Detail",
      name: "detail",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value: any,
          { rowData }: MUIDataTableMeta<Order>
        ) => {
          return (
            <IconButton
              disabled={rowData[6]}
              onClick={() => {
                onGetOrderDetail(rowData[0]);
              }}
            >
              <BorderColorIcon />
            </IconButton>
          );
        },
      },
    },
    {
      label: "Delete",
      name: "delete",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value: any,
          { rowData }: MUIDataTableMeta<Order>
        ) => {
          return (
            <IconButton disabled={rowData[6]} onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
          );
        },
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
    count: data?.totalCount,
    serverSide: true,
    page: currentPage,
    textLabels: {
      body: {
        noMatch: isLoading ? (
          <CircularProgressIcon sx={{ width: "100%" }} />
        ) : (
          "Data Yok"
        ),
      },
    },
    onTableChange(action, tableState: MUIDataTableState) {
      onTableChangeHandle(action, tableState);
    },
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.orders ? data.orders : []}
        title="Orders"
        options={options}
      />
      {currentOrderId && (
        <OrderDetailDialog
          id={currentOrderId}
          isOpen={openOrderDetail}
          setIsOpen={setOpenOrderDetail}
          onOk={() => {}}
        />
      )}
    </>
  );
};

export default Orders;
