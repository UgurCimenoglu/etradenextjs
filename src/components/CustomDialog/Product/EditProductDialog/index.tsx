import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetProductById, UpdateProduct } from "@/services/Products";
import * as yup from "yup";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

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

type CustomDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string | null;
  onOk: () => void;
};
export default function EditProductDialog(props: CustomDialogProps) {
  if (!props.productId) throw new Error("Geçersiz Ürün");

  const getProductById = useQuery({
    queryKey: ["ProductDetail"],
    queryFn: async () =>
      await GetProductById({ id: props.productId as string }),
  });
  const updateProduct = useMutation(UpdateProduct, {
    onError: () => {},
    onSuccess: (data) => {
      props.onOk();
      props.setIsOpen(false);
      toast.info("Ürün Güncellendi.")
    },
  });

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(1, "Lütfen en az 1 karakter giriniz!"),

      stock: yup
        .number()
        .positive("Stok miktarı 1'den az olamaz")
        .typeError("Stok miktarı 1'den az olamaz"),

      price: yup
        .number()
        .positive("Ürünün fiyatı 1₺'den az olamaz")
        .typeError("Ürünün fiyatı 1₺'den az olamaz"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
    values: getProductById.data,
  });

  const onSubmit = async (data: {
    name: string;
    stock: number | undefined;
    price: number | undefined;
  }) => {
    await updateProduct.mutateAsync({
      id: props.productId as string,
      name: data.name,
      price: data.price,
      stock: data.stock,
    });
  };

  const handleClose = () => {
    props.setIsOpen(false);
  };

  React.useEffect(() => {
    getProductById.refetch;
  }, []);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Update Product
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
              label="Product Name"
              autoFocus
              fullWidth
            />
            <p>{errors.name?.message}</p>
            <TextField
              required
              {...register("stock")}
              label="Stock"
              type="number"
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
            />
            <p>{errors.stock?.message}</p>
            <TextField
              {...register("price")}
              label="Price"
              type="number"
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
            />
            <p>{errors.price?.message}</p>
          </DialogContent>

          <DialogActions>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={updateProduct.isLoading}
              disabled={updateProduct.isLoading}
            >
              Sipariş Oluştur
            </LoadingButton>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </div>
  );
}
