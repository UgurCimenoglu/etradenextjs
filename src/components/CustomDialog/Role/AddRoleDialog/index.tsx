import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddRole } from "@/services/Roles";

type CustomDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
};
export default function AddRoleDialog(props: CustomDialogProps) {
  const addRole = useMutation(AddRole, {
    onError: () => {},
    onSuccess: (data) => {
      reset();
      props.setIsOpen(false);
      props.onOk();
      toast.info("Role Eklendi.");
    },
  });

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(1, "Lütfen en az 1 karakter giriniz!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { name: string }) => {
    await addRole.mutateAsync({
      name: data.name,
    });
  };

  const handleClose = () => {
    props.setIsOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add Role
        </BootstrapDialogTitle>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogContent dividers>
            <TextField
              required
              {...register("name")}
              label="Role Name"
              autoFocus
              fullWidth
            />
            <p>{errors.name?.message}</p>
          </DialogContent>

          <DialogActions>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={addRole.isLoading}
              disabled={addRole.isLoading}
            >
              Ekle
            </LoadingButton>
          </DialogActions>
        </Box>
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
