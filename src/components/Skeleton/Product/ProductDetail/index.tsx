"use client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Container, Paper, Skeleton, Tab } from "@mui/material";
import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <Container maxWidth="xl">
      <Paper>
        <div
          style={{ display: "flex", marginTop: "2rem", marginBottom: "2rem" }}
        >
          <div style={{ width: "70%" }}>
            <Skeleton variant="rectangular" height={"500px"} />
          </div>
          <div style={{ width: "100%", marginLeft: "2rem" }}>
            <Skeleton variant="text" width={"35%"} height={"50px"} />
            <p>
              <Skeleton variant="text" width={"80%"} />
              <Skeleton variant="text" width={"80%"} />
            </p>
            <p>
              <Skeleton variant="text" width={"10%"} height={"40px"} />
            </p>

            <Skeleton variant="text" width={"15%"} height={"50px"} />
          </div>
        </div>
        <TabContext value={"0"}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <div style={{ display: "flex" }}>
              <Skeleton
                variant="text"
                width={"10%"}
                height={"50px"}
                sx={{ margin: "0 5px" }}
              />
              <Skeleton
                variant="text"
                width={"10%"}
                height={"50px"}
                sx={{ margin: "0 5px" }}
              />
              <Skeleton variant="text" width={"10%"} height={"50px"} />
            </div>
          </Box>
          <TabPanel sx={{ paddingBottom: "25rem" }} value={"0"}>
            <Skeleton variant="text" width={"90%"} />
            <Skeleton variant="text" width={"90%"} />
            <Skeleton variant="text" width={"50%"} />
          </TabPanel>
        </TabContext>
      </Paper>
    </Container>
  );
};

export default ProductDetailSkeleton;
