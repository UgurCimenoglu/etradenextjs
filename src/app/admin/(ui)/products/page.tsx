"use client";
import DataTable from "@/components/DataTable";
import { GetAllProductsForAdmin } from "@/services/Products";
import { Button, IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  MUIDataTableColumn,
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
} from "mui-datatables";
import React, { useEffect, useState } from "react";
import moment from "moment";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { List_Product } from "@/contracts/products/list_product";
import CircularProgressIcon from "@/components/CircularProgress";
import dynamic from "next/dynamic";
import AddProductDialog from "@/components/CustomDialog/Product/AddProductDialog";

const AdminProducts = () => {
  //lazy
  const DeleteProductDialog = dynamic(
    () => import("@/components/CustomDialog/Product/DeleteProductDialog")
  );
  const EditProductDialog = dynamic(
    () => import("@/components/CustomDialog/Product/EditProductDialog")
  );
  const AddProductPhotoDialog = dynamic(
    () => import("@/components/CustomDialog/Product/UploadProductImageDialog")
  );

  const { mutate, data, isLoading } = useMutation(GetAllProductsForAdmin, {
    onError: () => {
      alert("Ürünler Listelendirken Hata Meydana Geldi");
    },
    onSuccess: () => {
      console.log("Ürünler Listelendi.");
    },
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addPhotoOpen, setAddPhotoOpen] = useState<boolean>(false);
  const [addProductOpen, setAddProductOpen] = useState<boolean>(false);
  const [updateProductOpen, setUpdateProductOpen] = useState<boolean>(false);
  const [deleteProductOpen, setDeleteProductOpen] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [pageSize] = useState<number>(12);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    mutate({ page: 0, size: pageSize });
    setCurrentPage(0);
  };

  const handleAddPhoto = (id: string) => {
    setCurrentProductId(id);
    setAddPhotoOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setCurrentProductId(id);
    setDeleteProductOpen(true);
  };

  const handleUpdateProduct = (id: string) => {
    setCurrentProductId(id);
    setUpdateProductOpen(true);
  };

  const onTableChangeHandle = (
    action: string,
    tableState: MUIDataTableState
  ) => {
    console.log(tableState);
    switch (action) {
      case "changePage":
        mutate({ page: tableState.page, size: pageSize });
        setCurrentPage(tableState.page);
        break;

      default:
        break;
    }
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
      label: "Photo",
      name: "addphoto",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value: any,
          { rowData }: MUIDataTableMeta<List_Product>
        ) => {
          return (
            <IconButton onClick={() => handleAddPhoto(rowData[0])}>
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
        customBodyRender: (
          value: any,
          { rowData }: MUIDataTableMeta<List_Product>
        ) => {
          return (
            <IconButton onClick={() => handleUpdateProduct(rowData[0])}>
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
          { rowData }: MUIDataTableMeta<List_Product>
        ) => {
          return (
            <IconButton onClick={() => handleDeleteProduct(rowData[0])}>
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
    customToolbar: () => (
      <Button onClick={() => setAddProductOpen(true)} variant="contained">
        Add Product
      </Button>
    ),
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

      {currentProductId && (
        <DeleteProductDialog
          isOpen={deleteProductOpen}
          setIsOpen={setDeleteProductOpen}
          productId={currentProductId}
          onOk={() => {
            getProducts();
          }}
        />
      )}
      {currentProductId && (
        <EditProductDialog
          isOpen={updateProductOpen}
          setIsOpen={setUpdateProductOpen}
          productId={currentProductId}
          onOk={() => {
            getProducts();
          }}
        />
      )}
      <AddProductDialog
        isOpen={addProductOpen}
        setIsOpen={setAddProductOpen}
        onOk={() => getProducts()}
      />
    </>
  );
};

export default AdminProducts;
