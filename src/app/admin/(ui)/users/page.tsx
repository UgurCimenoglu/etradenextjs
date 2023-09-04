"use client";
import CircularProgressIcon from "@/components/CircularProgress";
import SetUserRoleDialog from "@/components/CustomDialog/User/SetUserRoleDialog";
import DataTable from "@/components/DataTable";
import { GetAllUsers } from "@/services/User";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  MUIDataTableColumn,
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
} from "mui-datatables";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const { mutate, data, isLoading } = useMutation(GetAllUsers, {
    onError: () => {
      toast.error("Kullanıcılar Listelendirken Hata Meydana Geldi");
    },
    onSuccess: (data) => {
      console.log("Kullanıcılar Listelendi.");
    },
  });

  const size = 12;
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [openUserRole, setOpenUserRole] = useState<boolean>(false);

  React.useEffect(() => {
    mutate({ page: currentPage, size });
  }, []);

  const onTableChangeHandle = (
    action: string,
    tableState: MUIDataTableState
  ) => {
    console.log(tableState);
    switch (action) {
      case "changePage":
        mutate({ page: tableState.page, size });
        setCurrentPage(tableState.page);
        break;

      default:
        break;
    }
  };

  const handleRoleAssignToUser = (userId: string) => {
    setCurrentUserId(userId);
    setOpenUserRole(true);
  };

  const columns: MUIDataTableColumn[] = [
    {
      label: "Id",
      name: "id",
      options: {
        display: false,
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
      label: "FullName",
      name: "fullName",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Two Factor Enabled",
      name: "twoFactorEnabled",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, { rowData }: MUIDataTableMeta) => {
          return value ? "TRUE" : "FALSE";
        },
      },
    },
    {
      label: "Edit",
      name: "edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, { rowData }: MUIDataTableMeta) => {
          return (
            <Button
              variant="contained"
              onClick={() => handleRoleAssignToUser(rowData[0])}
            >
              Rol Ata
            </Button>
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
        customBodyRender: (value: any, { rowData }: MUIDataTableMeta) => {
          return (
            <Button variant="contained" onClick={() => {}}>
              Sil
            </Button>
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
    rowsPerPage: 1,
    rowsPerPageOptions: [],
    rowHover: true,
    fixedHeader: true,
    tableBodyHeight: "auto",
    selectableRowsHeader: false,
    expandableRows: false,
    expandableRowsOnClick: false,
    pagination: true,
    expandableRowsHeader: false,
    count: data?.totalUsersCount,
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
        data={data?.users ? data.users : []}
        title="Users"
        options={options}
      />
      {currentUserId && (
        <SetUserRoleDialog
          userId={currentUserId}
          isOpen={openUserRole}
          setIsOpen={setOpenUserRole}
          onOk={() => {}}
        />
      )}
    </>
  );
};

export default Users;
