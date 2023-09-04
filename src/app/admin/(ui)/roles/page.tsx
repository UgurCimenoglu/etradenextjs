"use client";
import CircularProgressIcon from "@/components/CircularProgress";
import DataTable from "@/components/DataTable";
import { GetRoles } from "@/services/Roles";
import { Button, IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  MUIDataTableColumn,
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
} from "mui-datatables";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoleDialog from "@/components/CustomDialog/Role/AddRoleDialog";
import DeleteRoleDialog from "@/components/CustomDialog/Role/DeleteRoleDialog";
import { toast } from "react-toastify";

const Roles = () => {
  const { mutate, data, isLoading } = useMutation(GetRoles, {
    onError: () => {
      toast.error("Roller Listelendirken Hata Meydana Geldi");
    },
    onSuccess: () => {
      console.log("Roller Listelendi.");
    },
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(12);

  const [openAddRoleDialog, setOpenAddRoleDialog] = useState<boolean>(false);

  const [openDeleteRoleDialog, setOpenDeleteRoleDialog] =
    useState<boolean>(false);
  const [currentRoleId, setCurrentRoleId] = useState<string | null>(null);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = () => {
    mutate({ page: currentPage, size: pageSize });
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

  const handleDeleteRole = (id: string) => {
    setCurrentRoleId(id);
    setOpenDeleteRoleDialog(true);
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
    // {
    //   label: "Delete",
    //   name: "delete",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value: any, { rowData }: MUIDataTableMeta) => {
    //       return (
    //         <IconButton onClick={() => handleDeleteRole(rowData[0])}>
    //           <DeleteIcon />
    //         </IconButton>
    //       );
    //     },
    //   },
    // },
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
    rowsPerPage: pageSize,
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
      <Button
        onClick={() => {
          setOpenAddRoleDialog(true);
        }}
        variant="contained"
      >
        Add Role
      </Button>
    ),
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.datas || []}
        title="Roles"
        options={options}
      />
      <AddRoleDialog
        isOpen={openAddRoleDialog}
        setIsOpen={setOpenAddRoleDialog}
        onOk={getRoles}
      />
      {currentRoleId && (
        <DeleteRoleDialog
          isOpen={openDeleteRoleDialog}
          setIsOpen={setOpenDeleteRoleDialog}
          onOk={getRoles}
          roleId={currentRoleId}
        />
      )}
    </div>
  );
};

export default Roles;
