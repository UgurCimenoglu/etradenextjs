"use client";
import DataTable from "@/components/DataTable";
import { GetProducts } from "@/services/Products";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  MUIDataTableColumn,
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
} from "mui-datatables";
import React, { lazy, useEffect, useState } from "react";
import moment from "moment";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProductPhotoDialog from "@/components/CustomDialog/UploadProductImageDialog";
import { List_Product } from "@/contracts/products/list_product";

const AdminProducts = () => {
  const { mutate, data, isLoading } = useMutation(GetProducts, {
    onError: () => {
      alert("Ürünler Listelendirken Hata Meydana Geldi");
    },
    onSuccess: () => {
      console.log("Ürünler Listelendi.");
    },
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addPhotoOpen, setAddPhotoOpen] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [pageSize] = useState<number>(12);

  useEffect(() => {
    mutate({ page: 0, size: pageSize });
  }, []);

  const handleeAddPhoto = (id: string) => {
    setCurrentProductId(id);
    setAddPhotoOpen(true);
  };

  const changePageHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    mutate({ page: value - 1, size: pageSize });
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
      label: "Name",
      name: "name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Stock",
      name: "stock",
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
      label: "Add/Update Photo",
      name: "addphoto",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value: any,
          { rowData }: MUIDataTableMeta<List_Product>
        ) => {
          return (
            <IconButton onClick={() => handleeAddPhoto(rowData[0])}>
              <AddAPhotoIcon />
            </IconButton>
          );
        },
      },
    },
    {
      label: "Edit",
      name: "edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any) => {
          return (
            <IconButton>
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
        customBodyRender: (value: any) => {
          return (
            <IconButton>
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
    count: 12,
    serverSide: true,
    page: currentPage - 1,
    textLabels: {
      body: {
        noMatch: "Data Yok",
      },
    },
    onTableChange(action, tableState: MUIDataTableState) {
      //onTableChangeHandle(action, tableState);
    },
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.products ? data.products : []}
        title="Products"
        options={options}
      />
      {currentProductId && (
        <AddProductPhotoDialog
          isOpen={addPhotoOpen}
          setIsOpen={setAddPhotoOpen}
          productId={currentProductId}
          onOk={() => {}}
        />
      )}
    </>
  );
};

export default AdminProducts;
