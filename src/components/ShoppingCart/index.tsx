"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, IconButton, Typography, styled } from "@mui/material";
import styles from "./page.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import ShoppingCards from "./ShoppingCard";

export default function ShoppingCartToggle() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [totalPrice, setTotalPrice] = React.useState<number | undefined>(0);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const handleOpentoCart = async () => {
    setOpen(true);
  };

  return (
    <div>
      <React.Fragment>
        <IconButton
          size="large"
          onClick={() => handleOpentoCart()}
          aria-haspopup="true"
          color="inherit"
        >
          <ShoppingCartIcon />
        </IconButton>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          anchor="right"
          className={styles.body}
          PaperProps={{
            sx: { minWidth: { sm: "100%", md: "240px" } },
          }}
        >
          <DrawerHeader>
            <IconButton size="medium" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </DrawerHeader>
          <ShoppingCards setTotalPrice={setTotalPrice} />

          {totalPrice && (
            <DrawerHeader
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body1" component="div">
                Toplam :{totalPrice}₺
              </Typography>
              <Link href={"/basket"}>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  Alışverişi Tamamla
                </Button>
              </Link>
            </DrawerHeader>
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
