import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { CreateOrder } from "@/services/Order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
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

export default function CreateOrderDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const createOrder = useMutation(CreateOrder, {
    onError: () => {},
    onSuccess: (data) => {
      toast.info("Siparişiniz Oluşturuldu!");
      router.push("/");
    },
  });

  const schema = yup
    .object({
      address: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(10, "Lütfen en az 10 karakter giriniz!"),
      description: yup.string().nullable(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log("dataaa", data);
    await createOrder.mutateAsync({
      address: data.address,
      description: data.description || "",
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Tamamla
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Alışverişi Tamamla
        </BootstrapDialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogContent dividers>
            <TextField
              margin="normal"
              multiline
              rows={3}
              required
              fullWidth
              {...register("address")}
              label="Address"
              autoFocus
            />
            <p>{errors.address?.message}</p>
            <TextField
              margin="normal"
              multiline
              rows={2}
              fullWidth
              {...register("description")}
              label="Description"
              type="text"
              id="description"
            />
            <p>{errors.description?.message}</p>
          </DialogContent>
          
          <DialogActions>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={createOrder.isLoading}
              disabled={createOrder.isLoading}
            >
              Sipariş Oluştur
            </LoadingButton>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </div>
  );
}
