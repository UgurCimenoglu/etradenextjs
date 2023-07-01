// import Image from "next/image";
// import styles from "./page.module.css";
"use client";
import { Alert, Badge, Checkbox, FormControlLabel, FormGroup, List, ListItem, Rating, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function Home() {
  return (
    <div>
      <p>Only Color</p>
      <Button color="success">Selam</Button>
      <Button color="error">Selam</Button>
      <Button color="warning">Selam</Button>
      <Button color="info">Selam</Button>
      <Button color="primary">Selam</Button>
      <Button color="secondary">Selam</Button>
      <p>Contained</p>
      <Button variant="contained" color="success">Selam</Button>
      <Button variant="contained" color="error">Selam</Button>
      <Button variant="contained" color="warning">Selam</Button>
      <Button variant="contained" color="info">Selam</Button>
      <Button variant="contained" color="primary">Selam</Button>
      <Button variant="contained" color="secondary">Selam</Button>
      <p>Outlined</p>
      <Button variant="outlined" color="success">Selam</Button>
      <Button variant="outlined" color="error">Selam</Button>
      <Button variant="outlined" color="warning">Selam</Button>
      <Button variant="outlined" color="info">Selam</Button>
      <Button variant="outlined" color="primary">Selam</Button>
      <Button variant="outlined" color="secondary">Selam</Button>
      <p>Outlined</p>
      <Button variant="text" color="success">Selam</Button>
      <Button variant="text" color="error">Selam</Button>
      <Button variant="text" color="warning">Selam</Button>
      <Button variant="text" color="info">Selam</Button>
      <Button variant="text" color="primary">Selam</Button>
      <Button variant="text" color="secondary">Selam</Button>
      <p>Outlined End</p>
      <List component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel required control={<Checkbox />} label="Required" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
      </FormGroup>
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={1}
        onChange={(event, newValue) => {
          
        }}
      />
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
      <Switch defaultChecked />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Badge badgeContent={4} color="primary">
        dsa
      </Badge>
      <Alert variant="filled" severity="error">This is an error alert — check it out!</Alert>
      <Alert variant="outlined" severity="warning">This is a warning alert — check it out!</Alert>
      <Alert variant="standard" severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
      <br/>
    
    </div>
  );
}
