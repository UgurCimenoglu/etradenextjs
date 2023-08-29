import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import { GetAllRoles } from "@/services/User";
import { Checkbox, FormControlLabel } from "@mui/material";
import CircularProgressIcon from "@/components/CircularProgress";
import { toast } from "react-toastify";
import {
  AssingRoleEndpoint,
  GetRolesToEndpoint,
} from "@/services/AuthorizationEndpoint";

type CustomDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  authorizeMenuId: string | null;
  onOk: () => void;
  currentMenu: { menu: string | null; code: string | null };
};
export default function AddAuthRoleDialog(props: CustomDialogProps) {
  const getAllRoles = useMutation(GetAllRoles, {
    onError: () => {},
    onSuccess: (data) => {},
  });

  const getRolesToEndpoint = useMutation(GetRolesToEndpoint, {
    onError: () => {},
    onSuccess: (data) => {
      console.log("currentroles", data.roles);
      setCurrentUserRoles(data.roles);
    },
  });

  const assingRole = useMutation(AssingRoleEndpoint, {
    onError: () => {
      toast.error("Hata!");
    },
    onSuccess: (data) => {
      toast.success("Roller Atandı!");
      props.setIsOpen(false);
    },
  });

  const [currentUserRoles, setCurrentUserRoles] = React.useState<string[]>([]);

  const handleRoleChange = (e: any) => {
    setCurrentUserRoles((prev) =>
      prev.includes(e.target.value)
        ? [...prev.filter((i) => i !== e.target.value)]
        : [...prev, e.target.value]
    );
  };

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const onAssingRole = async () => {
    await assingRole.mutateAsync({
      roles: currentUserRoles,
      menu: props.currentMenu.menu as string,
      code: props.currentMenu.code as string,
    });
  };

  React.useEffect(() => {
    if (props.isOpen) {
      getRolesToEndpoint.mutateAsync({
        menu: props.currentMenu.menu as string,
        code: props.currentMenu.code as string,
      });
      getAllRoles.mutateAsync({ page: -1, size: -1 });
    }
  }, [props.isOpen]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Delete Product
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <>
            {getAllRoles.status === "loading" ||
            getRolesToEndpoint.status === "loading" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgressIcon sx={{ width: "100%" }} />
              </div>
            ) : getAllRoles.status === "error" ||
              getRolesToEndpoint.status === "error" ? (
              <p>Hata</p>
            ) : (
              getAllRoles.data?.datas.map((role, i) => (
                <div key={i}>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        defaultChecked={currentUserRoles?.includes(role.id)}
                        onChange={(e) => handleRoleChange(e)}
                        value={role.id}
                      />
                    }
                    label={role.name}
                    labelPlacement="end"
                  />
                </div>
              ))
            )}
          </>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            color="secondary"
          >
            İptal
          </Button>
          <Button
            autoFocus
            onClick={onAssingRole}
            variant="contained"
            color="error"
          >
            Rol Ata
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: "500px", // Set your width here
  },
}));

function BootstrapDialogTitle(props: any) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
