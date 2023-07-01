import { Box, Container, Paper } from "@mui/material";
import React from "react";
import styles from "./page.module.css";
import CampaignProductCards from "./CampaignProductCards";
import CampaignProductCards2 from "./CampaignProductCards/index2";

const CampaignProducts = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "auto",
            mt: "2rem",
            mb: "1rem",
            mx: "0",
          },
        }}
      >
        <Paper
          elevation={4}
          variant="elevation"
          className={styles.campaingTitlePaper}
        >
          <div>
            <h2>Kampanyalı Ürünler</h2>
          </div>
        </Paper>
      </Box>
      <CampaignProductCards2 />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "auto",
            mt: "2rem",
            mb: "1rem",
            mx: "0",
          },
        }}
      >
        <Paper
          elevation={4}
          variant="elevation"
          className={styles.campaingTitlePaper}
        >
          <div>
            <h2>En Çok Tercih Edilen Ürünler</h2>
          </div>
        </Paper>
      </Box>
      <CampaignProductCards2 />
    </Container>
  );
};

export default CampaignProducts;
