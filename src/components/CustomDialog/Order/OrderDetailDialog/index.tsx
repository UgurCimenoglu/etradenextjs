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
import { CompleteOrder, GetOrderById } from "@/services/Order";
import OrderDetail from "@/components/OrderDetail";
import CircularProgressIcon from "@/components/CircularProgress";
import { toast } from "react-toastify";

type CustomDialogProps = {
  id: string | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
};
export default function OrderDetailDialog(props: CustomDialogProps) {
  const orderDetail = useQuery({
    queryKey: ["OrderDetail"],
    queryFn: async () => await GetOrderById({ id: props.id as string }),
  });

  const completeOrder = useMutation(CompleteOrder, {
    onSuccess: () => {
      toast.info("Siapriş Tamamlandı.");
      props.setIsOpen(false);
      props.onOk();
    },
    onError: () => {
      toast.error("Beklenmeyen Hata!");
    },
  });

  React.useEffect(() => {
    props.isOpen && orderDetail.refetch();
  }, [props.isOpen]);

  const onCompleteOrder = async () => {
    await completeOrder.mutateAsync({ id: props.id as string });
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
          Sipariş Detayı
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {orderDetail.isLoading && (
            <CircularProgressIcon sx={{ width: "100%" }} />
          )}
          {orderDetail.data && <OrderDetail data={orderDetail.data} />}
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
            onClick={onCompleteOrder}
            variant="contained"
            color="error"
          >
            Siparişi Tamamla
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

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
