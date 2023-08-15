import React from "react";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";

import AuthContext from "../storage/auth-context";
import Announcements from "../components/announcements/Announcements.js";
import Events from "../components/events/Events.js";
import Venues from "../components/venues/Venues.js";
import Artists from "../components/artists/Artists.js";
import MhaContents from "../components/mhacontents/mhacontents.js";
import Posters from "../components/posters/Posters.js";
import Error from "../components/commonUI/Error";
import { Loading } from "../components/commonUI/Loading";
import AlertContext from "../storage/alert-context";

const AppSpace = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ManagerPage = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const location = useLocation();

  const { isLoading, logout } = useContext(AuthContext);

  const { hasError } = useContext(AlertContext);

  let content = null;

  if (location.pathname === "/manager/events") {
    content = <Events />;
  }

  if (location.pathname === "/manager/announcements") {
    content = <Announcements />;
  }

  if (location.pathname === "/manager/artists") {
    content = <Artists />;
  }

  if (location.pathname === "/manager/posters") {
    content = <Posters />;
  }

  if (location.pathname === "/manager/mhacontents") {
    content = <MhaContents />;
  }

  if (location.pathname === "/manager/venues") {
    content = <Venues />;
  }

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <AppBar color="secondary" position="fixed">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div">
              Soda Entertainment
            </Typography>
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            p: 5,
            minWidth: "1600px",
            marginX: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={2}>
              <AppSpace />
              <List>
                {[
                  "Events",
                  "Announcements",
                  "Artists",
                  "MhaContents",
                  "Venues",
                ].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <Link
                      to={`/manager/${text.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 3,
                            justifyContent: "center",
                          }}
                        >
                          {index === 0 && <EventIcon />}
                          {index === 1 && <CampaignIcon />}
                          {index === 2 && <PersonIcon />}
                          {index === 3 && <ImageIcon />}
                          {index === 4 && <LocationOnIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item component="main" md={10}>
              <AppSpace />
              {content}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {hasError.open && <Error />}
      {isLoading && <Loading />}
    </>
  );
};

export default ManagerPage;
