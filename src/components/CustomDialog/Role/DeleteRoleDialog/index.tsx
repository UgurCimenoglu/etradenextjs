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
import { toast } from "react-toastify";
import { DeleteRole } from "@/services/Roles";

type CustomDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roleId: string | null;
  onOk: () => void;
};
export default function DeleteRoleDialog(props: CustomDialogProps) {
  const deleteRole = useMutation(DeleteRole, {
    onError: () => {},
    onSuccess: (data) => {
      toast.info("Role Silindi.");
      props.setIsOpen(false);
      props.onOk();
    },
  });

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const onDelete = async () => {
    deleteRole.mutateAsync({ id: props.roleId as string });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Delete Role
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <p>Rolü silmek istediğinize emin misiniz?</p>
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
            onClick={onDelete}
            variant="contained"
            color="error"
          >
            Delete
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
