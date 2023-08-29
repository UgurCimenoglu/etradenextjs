import { AddToCart } from "@/services/Basket";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  productId: string;
};

const AddToCartButton = (props: Props) => {
  const { mutate, data, error, isError } = useMutation(AddToCart, {
    onSuccess: (data) => {
      toast.success("Sepete Eklendi.", { position: "bottom-right" });
    },
    onError: () => {
      toast.error("Hata Meydana Geldi!");
    },
  });

  const handleAddToCart = () => {
    mutate({
      productId: props.productId,
      quantity: 1,
    });
  };
  return (
    <Button variant="outlined" color="inherit" onClick={handleAddToCart}>
      Sepete Ekle
    </Button>
  );
};

export default AddToCartButton;
