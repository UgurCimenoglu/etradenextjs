import { AddToCart } from "@/services/Basket";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  productId: string;
};

const AddToCartButton = (props: Props) => {
  const addToCartRequest = useMutation(AddToCart, {
    onSuccess: () => {
      toast.success("Sepete Eklendi.", { position: "bottom-right" });
    },
    onError: () => {},
  });

  const handleAddToCart = () => {
    var res = addToCartRequest.mutate({
      productId: props.productId,
      quantity: 1,
    });
    console.log("addtocartres", res);
  };
  return (
    <Button variant="outlined" color="inherit" onClick={handleAddToCart}>
      Sepete Ekle
    </Button>
  );
};

export default AddToCartButton;
