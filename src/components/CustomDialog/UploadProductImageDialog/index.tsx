import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DeleteImage,
  GetProductImageById,
  UploadImage,
} from "@/services/Products";
import EditProductPhotoCard from "@/components/AdminComponents/EditProductPhotoCard";

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
export default function CustomizedDialogs(props: CustomDialogProps) {
  const productImage = useQuery({
    queryKey: ["ProductImage"],
    queryFn: async () =>
      await GetProductImageById({ id: props.productId as string }),
  });
  const uploadImage = useMutation(UploadImage, {
    onError: () => {},
    onSuccess: (data) => {
      console.log("okey", data);
    },
  });
  const deleteImage = useMutation(DeleteImage, {
    onError: () => {},
    onSuccess: (data) => {
      alert("Görsel Silindi.");
    },
  });

  React.useEffect(() => {
    props.isOpen && productImage.refetch();
  });

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>);
    const formData = new FormData();
    files.map((file, i) => {
      formData.append(file.name, file, file.name);
    });
    uploadImage.mutateAsync({
      formData: formData,
      id: props.productId as string,
    });
  };

  const onImgDelete = async (imageId: string) => {
    deleteImage.mutateAsync({ id: props.productId as string, imageId });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add/Upload Photo
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onFileChange}
            />
          </Button>
          {productImage.data?.map((p, i) => (
            <EditProductPhotoCard
              imgUrl={p.path}
              key={i}
              onDelete={() => onImgDelete(p.id)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
