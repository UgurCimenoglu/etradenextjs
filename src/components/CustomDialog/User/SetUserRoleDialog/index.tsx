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
import {
  AssingRoleToUser,
  GetAllRoles,
  GetRolesByUserId,
} from "@/services/User";
import { Checkbox, FormControlLabel } from "@mui/material";
import CircularProgressIcon from "@/components/CircularProgress";
import { toast } from "react-toastify";

type CustomDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  onOk: () => void;
};
export default function SetUserRoleDialog(props: CustomDialogProps) {
  const getAllRoles = useMutation(GetAllRoles, {
    onError: () => {},
    onSuccess: (data) => {},
  });

  const getRolesToUser = useMutation(GetRolesByUserId, {
    onError: () => {},
    onSuccess: (data) => {
      setCurrentUserRoles(data.roles);
    },
  });

  const assingRoleToUser = useMutation(AssingRoleToUser, {
    onError: () => {},
    onSuccess: (data) => {
      toast.info("Kullanıcı Rolleri Atandı.");
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
    await assingRoleToUser.mutateAsync({
      roles: currentUserRoles,
      userId: props.userId as string,
    });
  };

  React.useEffect(() => {
    if (props.isOpen) {
      getRolesToUser.mutate({ userId: props.userId as string });
      getAllRoles.mutate({ page: -1, size: -1 });
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
            getRolesToUser.status === "loading" ? (
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
              getRolesToUser.status === "error" ? (
              <p>Hata</p>
            ) : (
              getAllRoles.data?.datas.map((role, i) => (
                <div key={i}>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        defaultChecked={currentUserRoles?.includes(role.name)}
                        onChange={(e) => handleRoleChange(e)}
                        value={role.name}
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
