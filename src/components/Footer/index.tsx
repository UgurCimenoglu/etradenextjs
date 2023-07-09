import { Box, Container, Paper } from "@mui/material";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";

const Footer = () => {
  console.log("footer render")
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: "100%",
          height: "auto",
          mt: "2rem",
        },
      }}
    >
      <Paper elevation={3} variant="elevation">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",

            margin: "5rem",
          }}
        >
          <div className={styles.footerLink}>
            <ul>
              <li>
                <h5>İŞLEM REHBERİ</h5>
              </li>
              <li>
                <Link href={"#"}>Hakkımızda</Link>
              </li>
              <li>
                <Link href={"#"}>Kariyer</Link>
              </li>
              <li>
                <Link href={"#"}>Mağazalarımız</Link>
              </li>
              <li>
                <Link href={"#"}>Banka Hesapları</Link>
              </li>
              <li>
                <Link href={"#"}>Duyurular</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerLink}>
            <ul>
              <li>
                <h5>MÜŞTERİ HİZMETLERİ</h5>
              </li>
              <li>
                <Link href={"#"}>Giriş Yap</Link>
              </li>
              <li>
                <Link href={"#"}>Kayıt Ol</Link>
              </li>
              <li>
                <Link href={"#"}>Nasıl Sipariş Verebilirim</Link>
              </li>
              <li>
                <Link href={"#"}>Sipariş Takibi</Link>
              </li>
              <li>
                <Link href={"#"}>Ödeme Seçenekleri</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerLink}>
            <ul>
              <li>
                <h5>KATEGORİLER</h5>
              </li>
              <li>
                <Link href={"#"}>İptal ve İade Koşulları</Link>
              </li>
              <li>
                <Link href={"#"}>Garanti Koşulları</Link>
              </li>
              <li>
                <Link href={"#"}>Sıkça Sorulan Sorular</Link>
              </li>
              <li>
                <Link href={"#"}>KVKK Aydınlatma Metni</Link>
              </li>
              <li>
                <Link href={"#"}>Mesafeli Satış Sözleşmesi</Link>
              </li>
              <li>
                <Link href={"#"}>Gizlilik Politikamız</Link>
              </li>
              <li>
                <Link href={"#"}>Satış Sonrası Destek</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerLink}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <ul style={{ padding: "0" }}>
                  <li>
                    <h5>SOSYAL MEDYA</h5>
                  </li>
                </ul>
              </div>
              <div>
                <FacebookIcon
                  className={styles.social}
                  style={{ color: "#4267B2" }}
                />
                <InstagramIcon
                  className={styles.social}
                  style={{ color: "#e33f5f" }}
                />
                <TwitterIcon
                  className={styles.social}
                  style={{ color: "#1DA1F2" }}
                />
                <YouTubeIcon
                  className={styles.social}
                  style={{ color: "#FF0000" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",

            margin: "5rem",
          }}
        >
          <Image src="/card-info.png" alt="img" width={600} height={30} />
        </div>
      </Paper>
    </Box>
  );
};

export default Footer;
